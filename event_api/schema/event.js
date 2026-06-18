import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
       required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, 
      default: "", 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
       required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel