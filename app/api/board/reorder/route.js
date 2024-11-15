import PinterestDB from "@/lib/database";
import user_board from "@/models/user_board";

export async function PUT(req){
    await PinterestDB()

    try {
        const body = await req.json()

        const {pins, _id} = body

        let destination = await user_board.findById(_id) 

        destination.pins = pins 

        destination.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Reorganized successfully'
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