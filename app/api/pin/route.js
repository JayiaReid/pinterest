import PinterestDB from "@/lib/database";
import Pin from "@/models/Pin";
import user_profile from "@/models/user_profile";
import Like from "@/models/Like";
import Comment from "@/models/Comment";
import user_board from "@/models/user_board";
import Section from "@/models/Section";


export async function POST(req, res){
    await PinterestDB()

    try {
        const body = await req.json()
        const {email, image, title, description, keywords, link} = body

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

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    let pins = null
    try {
        if(!email){
            pins = await Pin.find()
        .populate({
            path:"user",
            select : "-email"
        })
        .populate({
            path: 'comments',
            populate: {
            path: 'user',
            select: 'firstName lastName',
            }
        })
        }else{
            const user = await user_profile.findOne({email})

            pins = await Pin.find({user: user._id})
            .populate({
                path:"user",
                select : "-email"
            })
            .populate({
                path: 'comments',
                populate: {
                path: 'user',
                select: 'firstName lastName',
                }
            })
        }
        
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

export async function PUT(req){
    await PinterestDB()

    try {
        const body = await req.json()

        const {_id, title, description, keywords, link} = body

        const updates = {
            title, description, keywords, link
        }

        const pin = await Pin.findByIdAndUpdate(_id, updates, {new : true})

        pin.save()

        return new Response(JSON.stringify({ success: true, message: 'pin updated sucessfully' }), {
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

        await user_board.updateMany(
            { pins: _id }, 
            { $pull: { pins: _id } }
        )
        await Section.updateMany(
            { pins: _id }, 
            { $pull: { pins: _id } }
        )

        await Comment.deleteMany({ pin: _id });
        await Like.deleteMany({ pin: _id });

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