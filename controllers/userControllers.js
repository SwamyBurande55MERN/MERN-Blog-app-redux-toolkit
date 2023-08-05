import { UserModel } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
      try {
            const getAllUsers = await UserModel.find();
            return res.status(200).json({
                  success: true,
                  allUsers: getAllUsers
            });
      } catch (err) {
            console.log(`error : ${err}`);
            return res.status(500).json({
                  success: false,
                  error: err
            });
      }
}

// export const registerUser = async (req, res) => {
//       try {
//             const { username, password, email } = req.body;
//             if (!username) {
//                   return res.status(403).json({ error: "username is required" })
//             }
//             if (!password) {
//                   return res.status(403).json({ error: "password is required" })
//             }
//             if (!email) {
//                   return res.status(403).json({ error: "email is required" })
//             }

//             //check existing user
//             const existingUser = await UserModel.findOne({ email: email });
//             if (existingUser) {
//                   return res.status(403).json({
//                         error: "user already registered, please login",
//                         success: false
//                   });
//             }

//             //hash password
//             const hashPassword = await bcrypt.hash(password, 8);
//             //save new userauth
//             const newUser = new UserModel({
//                   username,
//                   password: hashPassword,
//                   email
//             });
//             const saveNewUser = await newUser.save();

//             return res.status(201).json({
//                   success: true,
//                   message: `user registered successfully`,
//                   user: saveNewUser
//             });
//       } catch (err) {
//             console.log(`error : ${err}`);
//             return res.status(500).send({
//                   message: `error in register controller`,
//                   success: false,
//                   error: err
//             });
//       }
// }

export const registerUser = async (req, res) => {
      try {
            const { username, password, email } = req.body;
            if (!username) {
                  return res.status(403).json({ error: "username is required", success: false });
            }
            if (!password) {
                  return res.status(403).json({ error: "password is required", success: false });
            }
            if (!email) {
                  return res.status(403).json({ error: "email is required", success: false });
            }

            //check existing user
            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser) {
                  return res.status(403).json({
                        error: "user already registered, please login",
                        success: false
                  });
            }

            //hash password
            const hashPassword = await bcrypt.hash(password, 8);
            //save new userauth
            const newUser = new UserModel({
                  username,
                  password: hashPassword,
                  email
            });
            const saveNewUser = await newUser.save();

            return res.status(201).json({
                  success: true,
                  message: `user registered successfully`,
                  user: saveNewUser
            });
      } catch (err) {
            console.log(`error : ${err}`);
            return res.status(500).json({
                  message: `error in register controller`,
                  success: false,
                  error: err
            });
      }
};


export const loginUser = async (req, res) => {
      try {
            const { email, password } = req.body;
            if (!email) {
                  return res.status(403).json({ error: "email is required" })
            }
            if (!password) {
                  return res.status(403).json({ error: "password is required" })
            }

            const existingUser = await UserModel.findOne({ email: email });
            if (!existingUser) {
                  return res.status(400).json({ error: "email not registered, please register", success: false });
            }

            //check user password
            const checkPassword = await bcrypt.compare(password, existingUser.password);
            if (!checkPassword) {
                  return res.status(400).json({ success: false, error: `Invalid credentials` })
            }

            return res.status(200).json({ success: true, message: `user login successfull.`, loggedUser: existingUser })

      } catch (err) {
            console.log(`error : ${err}`);
            return res.status(500).json({ success: false, error: err });
      }
}