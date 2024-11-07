import PinterestDB from "@/lib/database";
import Like from "@/models/Like";
import Pin from "@/models/Pin";

export async function POST(req) {

    await PinterestDB()

    try {
        const body = await req.json()
        const { user, pin } = body
        console.log(body)

        const newLike = new Like({
            user,
            pin
        })

        const savedLike = await newLike.save()

        const thisPin = await Pin.findById(pin)

        thisPin.likes.push(savedLike._id)

        await thisPin.save()

        return new Response(JSON.stringify({ success: true, message: savedLike }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })


    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function DELETE(req) {

    await PinterestDB()

    try {
        const body = await req.json()

        const { pin, user } = body

        const thisLike = await Like.findOne({ pin, user })

        const thisPin = await Pin.findById(pin)
        
        thisPin.likes = thisPin.likes.filter(like => like.toString() !==thisLike. _id)

        await thisPin.save()

        await Like.findOneAndDelete({ pin, user })

        return new Response(JSON.stringify({
            success: true,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}