import mongoose from "mongoose"
import RegEvent from "../../schema/registerevent.js"


export const regAttendee = async (req, res) => {
    try {
        const eventdid = req.body.id
        const userid = req.user.id
        console.log('antendee')
        if (!eventdid) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required to register."
            })
        }

        await RegEvent.create({ event: eventdid, user: userid })

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