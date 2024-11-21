import PinterestDB from "@/lib/database";
import Pin from "@/models/Pin";
import Section from "@/models/Section";
import user_board from "@/models/user_board";

export async function PUT(req) {

    await PinterestDB()

    try {
        const body = await req.json()

        const { pin, _id } = body
        console.log(body)

        const thisPin = await Pin.findById(pin)

        let destination = await user_board.findById(_id)

        if (destination) {
            destination.pins.push(pin)

            if (destination.pins.length <= 3) {
                const firstPin = await Pin.findById(destination.pins[0]);
                const secondPin = destination.pins[1] ? await Pin.findById(destination.pins[1]) : null;
                const third = destination.pins[2] ? await Pin.findById(destination.pins[2]) : null

                if (destination.cover == '/blank.jpg') {
                    if (firstPin) {
                        destination.cover = firstPin.image
                    }
                    if (secondPin) {
                        destination.images[0] = secondPin.image
                    }
                    if (third) {
                        destination.images[1] = third.image
                    }
                } else {

                    if (firstPin) {
                        if (destination.cover != firstPin.image) {
                            destination.images[0] = firstPin.image
                            if (secondPin) {
                                destination.images[1] = secondPin.image
                            }
                        } else {
                            if (secondPin) {
                                destination.images[0] = secondPin.image
                            }
                            if (third) {
                                destination.images[1] = third.image
                            }
                        }
                    }
                }

            }
        } else if (!destination) {
            destination = await Section.findById(_id)
            destination.pins.push(pin)

            if (destination.pins.length <= 3) {
                const firstPin = await Pin.findById(destination.pins[0])
                const secondPin = destination.pins[1] ? await Pin.findById(destination.pins[1]) : null
                const third = destination.pins[2] ? await Pin.findById(destination.pins[2]) : null

                if (firstPin) {
                    destination.images[0] = firstPin.image
                }

                if (secondPin) {
                    destination.images[1] = secondPin.image
                }

                if (third) {
                    destination.images[2] = third.image
                }
            }
        }

        destination.save()

        thisPin.saves.push(destination.user)
        thisPin.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Pin saved successfully'
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

