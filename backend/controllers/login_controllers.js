const User = require("../model/user");
const { isEmail } = require("validator");
const Patient = require("../model/patient");
// const bcrypt = require("bcrypt");

const saltRounds = 10;
// saltRounds is the number of times the password is hashed to make it more secure and difficult to crack by brute force attacks

const validateSignupData = async (req, res) => {
  const { name, email, password } = req.body;

  if (name.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Name" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please Enter password" });
    return false;
  } else if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length is 6 characters" });
    return false;
  }

  // check if email exists in DB!
  const existingUser = await User.findOne({ email: email }).exec();
  if (existingUser) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  return true;
};

exports.signup_post = async (req, res) => {
  console.log("Signup Post-====", req.body);
  const { name, email, password, role } = req.body;

  // Validate Inputs
  // const isValid = await validateSignupData(req, res);

  try {
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    console.log("user", user);

    return res.json({
      message: "Account Created Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};



// login controller
// exports.login_post = async (req, res) => {
//   const { email, password } = req.body;

//   // check if email exists in DB!
//   const dbUser = await User.findOne({ email: email }).exec();
//   console.log("dbUser", dbUser);
//   const patient = await Patient.findOne({ userId: dbUser._id }).exec();
//   if (dbUser) {
//     if (password === dbUser.password) {
//       res.json({
//         message: "Login Successful  ",
//         user: {
//           _id: dbUser._id,
//           name: dbUser.name,
//           email: dbUser.email,
//           patient_id: patient._id,
//         },
//       });
//     } else {
//       res.status(400).json({ message: "Username or Password incorrect" });
//     }
//   } else {
//     console.log("error");
//     res.status(400).json({ message: "Username or Password incorrect" });
//   }
// };

exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    const dbUser = await User.findOne({ email }).exec();
    console.log("dbUser", dbUser);

    if (!dbUser) {
      return res.status(400).json({ message: "Username or Password incorrect" });
    }

    if (password !== dbUser.password) {
      return res.status(400).json({ message: "Username or Password incorrect" });
    }

    // fetch patient only if user exists
    const patient = await Patient.findOne({ userId: dbUser._id }).exec();

    return res.json({
      message: "Login Successful",
      user: {
        _id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        patient_id: patient ? patient._id : null,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




exports.getallUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
    console.log(users);
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }
  if (!users) {
    return next(
      new HttpError("Could not find a user for the provided id.", 404)
    );
  }
  res.json({ users: users });
};


