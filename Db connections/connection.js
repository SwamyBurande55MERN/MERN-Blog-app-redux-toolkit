import mongoose from "mongoose";


export const mongodbConnection = async () => {
      try {
            mongoose.connect(process.env.connectionURL, {
                  useNewUrlParser: true
            });
            console.log(`connected to : db`);
      } catch (err) {
            console.log(`connection terminated`, err);
      }
}