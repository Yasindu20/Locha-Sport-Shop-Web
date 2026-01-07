import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREET);

        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return res.status(401).json({
                message: 'Invalid Token. Admin not found.'
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                message: 'Your account has been deactivated.'
            });
        }

        req.admin = admin;
        next()
    } catch (error) {
        console.error('Auth middleware error: ', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired. Please login again.'
            });
        }

        res.status(500).json({
            message: "Authentication error."
        })
    }
};

export const requireSuperAdmin = (req, res, next) => {
    if (req.admin.role !== 'super-admin') {
        return res.status(403).json({
            message: 'Access Denied. Super Admin previleges required.'
        });
    }
    next();
};

export const generateToken = (adminId) => {
    return jwt.sign(
        { id: adminId },
        process.env.JWT_SECREET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};
