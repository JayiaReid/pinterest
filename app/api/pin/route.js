import PinterestDB from "@/lib/database";
import Pin from "@/models/Pin";
import user_profile from "@/models/user_profile";
import Like from "@/models/Like";
import Comment from "@/models/Comment";


export async function POST(req, res){
    await PinterestDB()

    try {
        const body = await req.json()
        const {email, image, title, description, keywords, link} = body
        console.log(body)

        const user = await user_profile.findOne({email})

        const newPin = new Pin({
            user: user._id,
            image,
            title,
            description, 
            keywords,
            link,
        })

        const savedPin = await newPin.save()
        
        return new Response(JSON.stringify({ success: true, message: savedPin }), {
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

export async function GET(req){
    await PinterestDB()

    try {
        const pins = await Pin.find()
        .populate('user')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
            path: 'user',
            select: 'firstName lastName',
            }
        })
        return new Response(JSON.stringify({ success: true, data: pins }), {
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

export async function DELETE(req){
    await PinterestDB()

    try {
        const body = await req.json()

        const {_id} = body

        await Pin.findOneAndDelete({_id})

        await Pin.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Pin deleted successfully.'
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