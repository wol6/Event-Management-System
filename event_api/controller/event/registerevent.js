import mongoose, { startSession } from "mongoose"
import RegEvent from "../../schema/registrations .js"
import EventModel from "../../schema/event.js"


export const regAttendee = async (req, res) => {
    //start session
    const session = await mongoose.startSession()
    try {
        // start transaction
        session.startTransaction()

        const eventid = req.body.id
        const userid = req.user.id
        const seatNo = req.body.seatNo || null

        console.log('non seat reg')

        if (!eventid) {
            //rollback
            await session.abortTransaction()
            return res.status(400).json({
                message: "Event ID is required to register."
            })
        }

        //pass session lock doc
        const event = await EventModel.findById(eventid).session(session)

        if (event.booked >= event.capacity) {
            //rollback
            await session.abortTransaction()
            return res.status(400).json({ message: "This event is completely sold out" });
        }

        const filter = { $inc: { booked: 1 } }

        if (seatNo) {
            if (event.bookedArr && event.bookedArr.includes(seatNo)) {
                //rollback
                await session.abortTransaction()
                return res.status(400).json({ message: "This seat is already booked" })
            }
            filter.$addToSet = { bookedArr: seatNo }
        }

        await EventModel.findByIdAndUpdate(eventid, filter, { session })

        await RegEvent.create([{ event: eventid, user: userid, seatNo }], { session })

        //commit
        await session.commitTransaction()

        return res.status(200).json({
            success: true,
            message: "Registered Successfully"
        })
    } catch (err) {
        //rollback
        await session.abortTransaction()
        console.log("rollback", err)
    } finally {
        //closing session link
        session.endSession()
    }
}

export const viewAttendees = async (req, res) => {
    try {
        const eventid = req.query.id

        const attendeeList = await RegEvent.aggregate([{
            $match: {
                event: new mongoose.Types.ObjectId(eventid)
            }
        },
        { $group: { _id: "$event", users: { $addToSet: "$user" } } },

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