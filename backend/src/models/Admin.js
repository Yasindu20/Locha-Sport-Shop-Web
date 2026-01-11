import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 character long']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minLength: [6, 'Password must be at least 7 characters long'],
        select: false //Don't return password by defalut
    },
    FullName: {
        type: String,
        required: [true, 'Full name is Required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        default: 'admin'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

adminSchema.pre('save', async function() {
    // 1. If password isn't modified, just exit the function
    if (!this.isModified('password')) {
        return; 
    }

    // If this fails, Mongoose will automatically catch the error
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

adminSchema.methods.updateLastLogin = async function () {
    this.lastLogin = new Date();
    await this.save();
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;