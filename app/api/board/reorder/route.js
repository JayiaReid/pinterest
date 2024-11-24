import PinterestDB from "@/lib/database";
import Pin from "@/models/Pin";
import user_board from "@/models/user_board";

export async function PUT(req) {
    await PinterestDB()

    try {
        const body = await req.json()

        const { pins, _id } = body

        let destination = await user_board.findById(_id)

        destination.pins = pins

        let firstPin = destination.pins[0] ? await Pin.findById(destination.pins[0]) : null
        let secondPin = destination.pins[1] ? await Pin.findById(destination.pins[1]) : null
        let thirdPin = destination.pins[2] ? await Pin.findById(destination.pins[2]) : null

        if (firstPin.image !== destination.cover) {
            // means cover declared
            if (firstPin !== null) {
                destination.images[0] = firstPin.image
            } else {
                destination.images[0] = '/blank.jpg'
            }

            if (secondPin !== null) {
                destination.images[1] = secondPin.image
            } else {
                destination.images[1] = '/blank.jpg'
            }
        } else {
            if (firstPin !== null) {
                destination.cover = firstPin.image
            } else {
                destination.cover = '/blank.jpg'
            }

            if (secondPin !== null) {
                destination.images[0] = secondPin.image
            } else {
                destination.images[0] = '/blank.jpg'
            }

            if (thirdPin !== null) {
                destination.images[1] = thirdPin.image
            } else {
                destination.images[1] = '/blank.jpg'
            }
        }

        

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