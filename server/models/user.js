import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required:  true },
    lastName: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    displayName: { type: String, required:  true },
    urlId: { type: String, required: true },
    recruiter: { type: Boolean, required: false },
    photoUrl: { type: String, required: false },
    about: { type: String, required: false },
    location: { type: String, required: false },
  });
  
  export default mongoose.model("User", userSchema);