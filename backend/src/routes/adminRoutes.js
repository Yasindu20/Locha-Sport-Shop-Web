import express from 'express';
import Admin from '../models/Admin.js';
import { authenticateAdmin, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authenticateAdmin, requireSuperAdmin, async (req, res) => {
    try {
        const { username, email, password, fullName, role } = req.body;

        // check if admin already exists
        const existingAdmin = Admin.findOne({
            $or: [{ email }, { username }]
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: 'Admin with this email or password already exists'
            });
        }

        // Create a new admin
        const admin = new Admin({
            username,
            email,
            password,
            fullName,
            role: role || 'admin'
        });

        await admin.save();

        // Return admin without password
        const adminResponse = admin.toObject();
        delete adminResponse.password;

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: adminResponse
        });
    } catch (error) {
        console.error('Register error: ', error);
        res.status(500).json({
            message: error.message || 'Error registering admin'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password ){
            return res.status(400).json({
                message: 'Please provide the email and password'
            });
        }

        // Find the Admin with Password field
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json({
                message: 'Invalid Username or Password'
            });
        }

        // check is admin is active or not
        if (!admin.isActive) {
            return res.status(403).json({
                message: 'Your Account has been deactivated'
            });
        }

        const isMatchUsername = await admin.compareUsername(username);

        if (!isMatchUsername) {
            return res.status(401).json({
                message: 'Username is incorrect'
            });
        }

        // Compare passwords
        const isMatchPassword = await admin.comparePassword(password);

        if (!isMatchPassword) {
            return res.status(401).json({
                message: 'Password is incorrect'
            });
        }

        // Update last login
        await admin.updateLastLogin();

        // Generate token
        const token = generateToken(admin._id);

        const adminResponse = admin.toObject();
        delete adminResponse.password;

        res.json({
            message: 'Login successful',
            token,
            admin: adminResponse
        });
    } catch (error) {
        console.error('Login error', error);
        res.status(500).json({
            message: 'Error during login'
        });
    }
});

//Get current admin Profile
router.get('/me', authenticateAdmin, async (req, res) => {
    try {
        res.json({
            admin: req.admin
        });
    } catch (error) {
        console.error('Get profile error: ', error);
        res.status(500).json({
            message: 'Error fetching profile'
        });
    }
});

// Update admin Profile
router.put('/profile', authenticateAdmin, async (req, res) => {
    try {
        const { fullName, email, username } = req.body

        const admin = await Admin.findOne(req.admin._id);

        if (fullName) admin.fullName = fullName;
        if (email) admin.email = email;
        if (username) admin.username = username;

        await admin.save();

        res.status(201).json({
            message: 'Profile updated successfully',
            admin
        });
    } catch (error) {
        console.error('Update profile error', error);
        res.status(500).json({
            message: error.message || 'Error updating profile'
        });
    }
});

//Change admin password
router.put('/change-password', authenticateAdmin, async (req, res) => {
    try{
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Please provide current and new Password'
            });
        }

        // Get admin with password
        const admin = await Admin.findById(req.body._id).select('+password');

        const isMatch = await admin.comparePassword(currentPassword);

        if(!isMatch) {
            return res.status(401).json({
                message: 'Current password is incorrect'
            });
        }

        admin.password = newPassword;
        await admin.save();

        res.status(201).json({
            message: 'Password changed successfullu'
        });
    } catch (error){
        console.error('Change password error: ',error);
        res.status(500).json({
            message: error.message || 'Error changing password'
        })
    }
});

// Get all admins
router.get('/all', authenticateAdmin, async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.json({ admins });
    } catch (error) {
        console.error('Get all admins error: ',error);
        res.status(500).json({
            message: error.message || 'Error fetching admins'
        });
    }
});

export default router;