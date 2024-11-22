import PinterestDB from "@/lib/database";
import Pin from "@/models/Pin";
import Save from "@/models/Save";
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

export async function DELETE(req) {

    await PinterestDB()

    try {
        const body = await req.json()
        const { pin, _id } = body

        const thisPin = await Pin.findById(pin)

        if (!thisPin) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Pin not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const destination = await user_board.findById(_id)

        if (destination) {

            let firstPin = destination.pins[0] ? await Pin.findById(destination.pins[0]) : null
            const cover_declared = destination.cover !== firstPin.image

            destination.pins = destination.pins.filter(p => p.toString() !== thisPin._id)

            firstPin = destination.pins[0] ? await Pin.findById(destination.pins[0]) : null
            const secondPin = destination.pins[1] ? await Pin.findById(destination.pins[1]) : null
            const thirdPin = destination.pins[2] ? await Pin.findById(destination.pins[2]) : null

            if (cover_declared) {
                if (firstPin) {
                    destination.images[0] = firstPin.image
                } else {
                    destination.images[0] = '/blank.jpg'
                }
                if (secondPin) {
                    destination.images[1] = secondPin.image
                } else {
                    destination.images[1] = '/blank.jpg'
                }

            } else {
                if (firstPin) {
                    destination.cover = firstPin.image
                } else {
                    destination.cover = '/blank.jpg'
                }
                if (secondPin) {
                    destination.images[0] = secondPin.image
                } else {
                    destination.images[0] = '/blank.jpg'
                }
                if (thirdPin) {
                    destination.images[1] = thirdPin.image
                } else {
                    destination.images[1] = '/blank.jpg'
                }
            }

            destination.save()
            thisPin.saves = thisPin.saves.filter(save => save !== destination._id)
        } else {
            const dest = await Section.findById(_id)
            
            if (dest) {
                dest.pins = dest.pins.filter(p => p.toString() !== thisPin._id)

                const firstPin = dest.pins[0] ? await Pin.findById(dest.pins[0]) : null
                const secondPin =dest.pins[1] ? await Pin.findById(dest.pins[1]) : null
                const thirdPin = dest.pins[2] ? await Pin.findById(dest.pins[2]) : null

                if (firstPin) {
                    dest.images[0] = firstPin.image
                } else {
                    dest.images[0] = '/blank.jpg'
                }

                if (secondPin) {
                    dest.images[1] = secondPin.image
                } else {
                    dest.images[1] = '/blank.jpg'
                }

                if (thirdPin) {
                    dest.images[2] = thirdPin.image
                } else {
                    dest.images[2] = '/blank.jpg'
                }
            } else {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Destination not found'
                }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            dest.save()
            thisPin.saves = thisPin.saves.filter(save => save !== dest._id)
        }

        
        await thisPin.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Pin removed successfully'
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
