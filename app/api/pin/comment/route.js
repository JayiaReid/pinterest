import PinterestDB from "@/lib/database";
import Comment from "@/models/Comment";
import Pin from "@/models/Pin";

export async function POST(req) {

    await PinterestDB()

    try {
        const body = await req.json()
        const { user, pin, content } = body

        const newComment = new Comment({
            user,
            pin,
            content
        })

        const savedComment = await newComment.save()

        const thisPin = await Pin.findById(pin)

        thisPin.comments.push(savedComment._id)

        await thisPin.save()

        return new Response(JSON.stringify({ success: true, message: savedComment }), {
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

        const thisComment = await Comment.findOne({ pin, user })

        const thisPin = await Pin.findById(pin)
        
        thisPin.comments = thisPin.comments.filter(comment => comment.toString() !==thisComment. _id)

        await thisPin.save()

        await Comment.findOneAndDelete({ pin, user })

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