import crypto from "crypto";
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// export const registerUser = async (req, res) => {
//     const { name, companyName, email, phone } = req.body;

//     if (!name || !companyName || !email || !phone) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
  
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }
  
//     try {
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already registered' });
//       }
  
//       const newUser = await User.create({ name, companyName, email, phone });
  
//       // Mail to user
//       await sendEmail(
//         email,
//         'Registration Received',
//         `<p>Dear ${name},<br/>Thank you for registering. Your request is under review. You will receive an email once approved.</p>`
//       );
  
//       // Mail to Admin
//       console.log('Sending mail to admin:', process.env.ADMIN_EMAIL);
//       await sendEmail(
//         process.env.ADMIN_EMAIL,
//         'New User Registration Approval Required',
//         `<p>A new user has registered:<br/>Name: ${name}<br/>Company: ${companyName}<br/>Email: ${email}<br/>Phone: ${phone}<br/><br/>
//           <a href="http://localhost:5000/admin/approve/${newUser._id}">Click here to approve</a></p>`
//       );
  
//       return res.status(201).json({ message: 'Registration successful. Awaiting admin approval.' });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };

export const registerUser = async (req, res) => {
  const { name, companyName, email, phone } = req.body;

  // Validation
  if (!name || !companyName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already registered' });
      }

      // Create new user
      const newUser = await User.create({ name, companyName, email, phone });

      // Send quick API response (Emails will be sent in background)
      res.status(201).json({ message: 'Registration successful. Awaiting admin approval.' });

      // Prepare email HTML templates
      const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #4CAF50; color: white; padding: 15px; font-size: 18px; font-weight: bold;">
                  Registration Received
              </div>
              <div style="padding: 20px;">
                  <p>Dear <strong>${name}</strong>,</p>
                  <p>Thank you for registering with us. Your request is currently under review. You will receive an email once your account has been approved.</p>
                  <p>If you have any questions, feel free to contact our support team.</p>
                  <p style="margin-top: 30px;">Best regards,<br><strong>The Support Team</strong></p>
              </div>
              <div style="background-color: #f1f1f1; padding: 10px; font-size: 12px; color: #555; text-align: center;">
                  &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
              </div>
          </div>
      </div>
      `;

      const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #FF9800; color: white; padding: 15px; font-size: 18px; font-weight: bold;">
                  New User Approval Needed
              </div>
              <div style="padding: 20px;">
                  <p>Hello Admin,</p>
                  <p>A new user has registered and requires approval:</p>
                  <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 6px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 6px; border: 1px solid #ddd;">${name}</td></tr>
                      <tr><td style="padding: 6px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 6px; border: 1px solid #ddd;">${companyName}</td></tr>
                      <tr><td style="padding: 6px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 6px; border: 1px solid #ddd;">${email}</td></tr>
                      <tr><td style="padding: 6px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 6px; border: 1px solid #ddd;">${phone}</td></tr>
                  </table>
                  <!--
                  <p style="margin-top: 20px;">
                      <a href="http://localhost:5000/admin/approve/${newUser._id}" 
                         style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
                          Approve User
                      </a>
                  </p>
                  -->
              </div>
              <div style="background-color: #f1f1f1; padding: 10px; font-size: 12px; color: #555; text-align: center;">
                  &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
              </div>
          </div>
      </div>
      `;

      // Send emails in background (no await for speed)
      sendEmail(email, 'Registration Received', userEmailHtml).catch(err => console.error('User email error:', err));
      sendEmail(process.env.ADMIN_EMAIL, 'New User Registration Approval Required', adminEmailHtml).catch(err => console.error('Admin email error:', err));

  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isApproved)
      return res.status(403).json({ message: "User not approved by admin" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();    

    // Optionally, save refreshToken in DB for logout support

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const approvalUserAndSendLink = async (req, res) => {
//   const { userId } = req.params;

//   console.log(userId);

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.isApproved) return res.status(400).json({ message: "Already User approved" });

//     user.isApproved = true;

//     const token = crypto.randomBytes(32).toString("hex");

//     user.resetToken = token;
//     user.tokenExpires = Date.now() + 1000 * 60 * 60;

//     await user.save();

//     const link = `http://localhost:3000/set-password?token=${token}&id=${user._id}`;
//     await sendEmail(
//       user.email,
//       "Your account has been approved - Set your password",
//       `<p>Dear ${user.name},</p>
//        <p>Your account has been approved.</p>
//        <p>Please click the button below to set your password:</p>
//        <a href="${link}" style="
//          display: inline-block;
//          padding: 10px 20px;
//          background-color: #4CAF50;
//          color: white;
//          text-decoration: none;
//          border-radius: 5px;
//          font-weight: bold;
//        ">
//          Set Password
//        </a>
//        <p>If the button doesn't work, copy and paste this link into your browser:</p>
//        <p>${link}</p>`
//     );
    

//     return res.status(200).json({ message: "User approved and email sent" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };


export const approvalUserAndSendLink = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isApproved) return res.status(400).json({ message: "Already User approved" });

    user.isApproved = true;

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour

    await user.save();

    const link = `${process.env.CLIENT_URL}/set-password?token=${token}&id=${user._id}`;
    await sendEmail(
      user.email,
      "Your account has been approved - Set your password",
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #4CAF50;">Account Approved</h2>
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>We are excited to inform you that your account has been approved.</p>
          <p>To activate your account, please click the button below and set your password:</p>
          <p>
            <a href="${link}" style="
              display: inline-block;
              padding: 12px 25px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              font-size: 14px;
            ">
              Set Password
            </a>
          </p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `
    );

    return res.status(200).json({ message: "User approved and email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const setPassword = async (req, res) => {
  const { userId, token, newPassword, confirmPassword } = req.body;

  try {
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Both password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(userId);
    if (!user || user.resetToken !== token || Date.now() > user.tokenExpires) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.tokenExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password created successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate token
//     const token = crypto.randomBytes(32).toString("hex");

//     user.resetToken = token;
//     user.tokenExpires = Date.now() + 1000 * 60 * 15; // 15 minutes 
//     await user.save();

//     const link = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

//     // Send email
//     await sendEmail(
//       user.email,
//       "Password Reset Request",
//       `<p>Hello ${user.name || "user"},</p>
//       <p>Click the link below to reset your password:</p>
//       <a href="${link}">Reset Password</a>
//       <p>This link will expire in 15 minutes.</p>`
//     );

//     res.status(200).json({ message: "Reset link sent to email" });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpires = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    // Use env for base URL
    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;

    // Email HTML Template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Password Reset Request</h2>
        <p>Hello ${user.name || "User"},</p>
        <p>We received a request to reset your password. Please click the button below to reset it:</p>
        <a href="${link}" style="
          display: inline-block;
          padding: 12px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        ">Reset Password</a>
        <p style="margin-top: 15px;">This link will expire in <strong>15 minutes</strong>.</p>
        <p>If you didn’t request a password reset, you can ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">If the button above doesn’t work, copy and paste this link into your browser:</p>
        <p style="font-size: 12px; color: #777;">${link}</p>
      </div>
    `;

    await sendEmail(
      user.email,
      "Password Reset Request",
      emailHTML
    );

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { userId, token, newPassword, confirmPassword } = req.body;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(userId);

    if (
      !user ||
      user.resetToken !== token ||
      Date.now() > user.tokenExpires
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword; 
    user.resetToken = undefined;
    user.tokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Optional: remove refresh token from DB
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken -resetToken -tokenExpires');
    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSingleApprovedUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId, isApproved: true }).select(
      '-password -refreshToken -resetToken -tokenExpires'
    );

    if (!user) {
      return res.status(404).json({ message: 'Approved user not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get Single Approved User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  


