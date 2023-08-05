import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
      username: {
            type: String,
            required: [true, `Username is required`]
      },
      email: {
            type: String,
            required: [true, `email is required`]
      },
      password: {
            type: String,
            required: [true, `password is required`]
      },
      blogs: [
            {
                  type: mongoose.Types.ObjectId,
                  ref: "BLOGS"
            }
      ]

}, { timeStamps: true });

export const UserModel = new mongoose.model("USERS", userSchema);
