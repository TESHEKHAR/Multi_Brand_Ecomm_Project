import crypto from "crypto";
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
// export const registerUser = async (req, res) => {
//   const { name, companyName, email, phone } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already registered" });

//     const newUser = await User.create({ name, companyName, email, phone });

//     // Mail to user
//     await sendEmail(
//       email,
//       "Registration Received",
//       `<p>Dear ${name},<br/>Thank you for registering. Your request is under review. You will receive an email once approved.</p>`
//     );

//     // Mail to Admin
//     console.log("Sending mail to user email:", email);
//     await sendEmail(
//       process.env.ADMIN_EMAIL, 
//       "New User Registration Approval Required",
//       `<p>A new user has registered:<br/>Name: ${name}<br/>Company: ${companyName}<br/>Email: ${email}<br/>Phone: ${phone}<br/><br/>
//       <a href="http://localhost:5000/admin/approve/${newUser._id}">Click here to approve</a></p>`
//     );
//     return res.status(201).json({ message: "Registration successful. Awaiting admin approval." });

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const registerUser = async (req, res) => {
    const { name, companyName, email, phone } = req.body;

    if (!name || !companyName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      const newUser = await User.create({ name, companyName, email, phone });
  
      // Mail to user
      await sendEmail(
        email,
        'Registration Received',
        `<p>Dear ${name},<br/>Thank you for registering. Your request is under review. You will receive an email once approved.</p>`
      );
  
      // Mail to Admin
      console.log('Sending mail to admin:', process.env.ADMIN_EMAIL);
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'New User Registration Approval Required',
        `<p>A new user has registered:<br/>Name: ${name}<br/>Company: ${companyName}<br/>Email: ${email}<br/>Phone: ${phone}<br/><br/>
          <a href="http://localhost:5000/admin/approve/${newUser._id}">Click here to approve</a></p>`
      );
  
      return res.status(201).json({ message: 'Registration successful. Awaiting admin approval.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };


// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (!user.isApproved)
//             return res.status(403).json({ message: "User not approved by admin" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch)
//             return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign(
//             {
//                 userId: user._id,
//                 role: user.role,
//                 email: user.email,
//             },
//             process.env.JWT_SECRET,
//             { expiresIn : "id" }
//         );
//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//               id: user._id,
//               name: user.name,
//               email: user.email,
//               role: user.role,
//             },
//           });

//     } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" }); 
//     }
//   }
  

// export const approveUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.isApproved) return res.status(400).json({ message: "Already approved" });

//     user.isApproved = true;
//     await user.save();

//     // Generate a temporary token or link for password creation (e.g., JWT or token)
//     const token = crypto.randomBytes(32).toString("hex");
//     const passwordSetupLink = `http://localhost:5000/set-password?token=${token}&id=${user._id}`;

//     // Mail to user for password creation
//     await sendEmail(
//       user.email,
//       "Account Approved - Set Your Password",
//       `<p>Your account has been approved. Click below to set your password:<br/><a href="${passwordSetupLink}">Set Password</a></p>`
//     );

//     return res.status(200).json({ message: "User approved and email sent" });

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

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
      { expiresIn: "15m" }
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

export const approvalUserAndSendLink = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isApproved) return res.status(400).json({ message: "Already User approved" });

    user.isApproved = true;

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpires = Date.now() + 1000 * 60 * 60;

    await user.save();

    const link = `http://localhost:3000/set-password?token=${token}&id=${user._id}`;

    await sendEmail(
      user.email,
      "Your account has approved - Set your password",
      `<p>Dear ${user.name},<br/>Your account has been approved.<br/>
      Please click the link below to set your password:</br>
      <a href="${link}">Set Password</a></p>`
    );

    return res.status(200).json({ message: "User approved and email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// export const setPassword = async (req, res) => {
//   const { userId, token, newPassword } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (
//       !user ||
//       user.resetToken !== token || Date.now() > user.tokenExpires
//     ) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.tokenExpires = undefined;

//     await user.save();

//     return res.status(200).json({ message: "Password created successfully!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }

// export const setPassword = async (req, res) => {
//   const { userId, token, newPassword } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user || user.resetToken !== token || Date.now() > user.tokenExpires) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     user.password = newPassword; // Let pre-save hook hash it
//     user.resetToken = undefined;
//     user.tokenExpires = undefined;

//     await user.save();

//     return res.status(200).json({ message: "Password created successfully!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


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


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpires = Date.now() + 1000 * 60 * 15; // 15 minutes 
    await user.save();

    const link = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

    // Send email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `<p>Hello ${user.name || "user"},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>`
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

  


