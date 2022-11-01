import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      //unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      // required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    //agent is string due to localstorage in browser requiring string
    agent: {
      type: String,
      default: "false",
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
    savedProperties: {
      type: Array,
    },
    agentPhoto: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);