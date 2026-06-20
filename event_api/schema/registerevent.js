import mongoose from "mongoose";

const regEventSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events", 
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required:true
    },
    seatNo: {
      type: Number
    },
  },
  {
    timestamps: true, 
  }
);

regEventSchema.index({ event: 1, user: 1 }, { unique: true });

const RegEvent = mongoose.model("RegEvent", regEventSchema);

export default RegEvent;
