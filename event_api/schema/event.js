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
      type: String,
      required: true,
    },
    time: {
      type: String,
       required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
     booked: {
      type: Number,
      required: true,
      default: 0
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