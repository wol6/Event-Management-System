import express from "express"
import { logout, signIn, signUp } from "../controller/login/login.js"
import { verifyToken } from "../middleware/auth.js"
import { createEvent, deleteEvent, updateEvent } from "../controller/event/event.js"
import { eventList } from "../controller/event/list.js"
import { regAttendee, viewAttendees } from "../controller/event/registerevent.js"

const route = express.Router()

route.post('/signup', signUp)
route.post('/signin', signIn)
route.post('/logout', logout)


route.post('/add-event', verifyToken, createEvent)
route.put('/update-event/:id', verifyToken, updateEvent)
route.get('/show-event', verifyToken, eventList)
route.delete('/delete-event/:id', verifyToken, deleteEvent)

route.post('/reserve-seat', verifyToken, regAttendee)
route.get('/get-attendee', verifyToken, viewAttendees)

export default route