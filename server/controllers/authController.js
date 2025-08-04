const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


  /////////////////////////////////// Register User   ////////////////////////////////// 

exports.register = async (req, res) => {
  try {
   const { name, email, password, number, age } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      number,
      age,
      image: imageUrl,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10min' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

  /////////////////////////////////// // Login User   ////////////////////////////////// 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10min' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get Profile
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

/////////////////////////////////// / Update Profile       ////////////////////////////////// 
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    //  Destructure all values from req.body
    const { name, email, number, age } = req.body;

    // Prepare updated data
    let updatedData = { name, email, number, age };

    
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      updatedData.image = imageUrl;
    }

    // Update user and exclude password from response
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};


////////////////////////////////////   Send Reset link    ////////////////////////////////// 
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    ///////////////////////////////////  Send Email using nodemailer   ////////////////////////////////// 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
await transporter.sendMail({
  from: `"MyApp" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: 'Reset your password',
  html: `
    <p>Hello ${user.name},</p>
    <p>Click the button below to reset your password:</p>
    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you did not request this, you can ignore this email.</p>
    <p style="font-size: 12px; color: gray;">
  This link will open in a new tab for security purposes.
</p>

  `,
});

    // await transporter.sendMail({
    //   from: `"MyApp" <${process.env.EMAIL_USER}>`,
    //   to: user.email,
    //   subject: 'Reset your password',
    //   html: `
    //     <p>Hello ${user.name},</p>
    //     <p>Click the link below to reset your password:</p>
    //     <a href="${resetLink}">${resetLink}</a>
    //     <p>This link will expire in 5 minutes.</p>
    //   `,
    // });

    res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

  ///////////////////////////////////  reset paswrd  ////////////////////////////////// 
 
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
