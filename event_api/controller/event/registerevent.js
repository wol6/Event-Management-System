import mongoose from "mongoose"
import RegEvent from "../../schema/registerevent.js"
import EventModel from "../../schema/event.js"


export const regAttendee = async (req, res) => {
    try {
        const eventid = req.body.id
        const userid = req.user.id
        console.log('antendee')
        if (!eventid) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required to register."
            })
        }

        const event = await EventModel.findById(eventid).lean()

        if (event.booked >= event.capacity) {
            return res.status(400).json({ message: "This event is completely sold out" });
        }
        await EventModel.findByIdAndUpdate(eventid, { $inc: { booked: 1 } });

        await RegEvent.create({ event: eventid, user: userid })

        return res.status(200).json({
            success: true,
            message: "Registered Successfully"
        })
    } catch (err) {
        console.log(err)
    }
}

export const viewAttendees = async (req, res) => {
    try {
        const eventid = req.query.id

        const attendeeList = await RegEvent.aggregate([{
            $match: {
                event: new mongoose.Types.ObjectId(eventid)
            }
        }, { $group: { _id: "$event", users: { $addToSet: "$user" } } },
        { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "userDetails" } }])

        return res.status(200).json({
            success: true,
            message: "List Fetched Succeddfully",
            attendeeList
        })
    } catch (err) {
        console.log(err)
    }
}