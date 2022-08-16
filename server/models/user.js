import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    displayName: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recruiter: { type: Boolean, required: true },
    photoUrl: { type: String, required: false },
    about: { type: String, required: false },
    id: { type: String },
  });
  
  export default mongoose.model("User", userSchema);