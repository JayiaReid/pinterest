import PinterestDB from "@/lib/database";
import user_board from "@/models/user_board";
import Pin from "@/models/Pin";
import user_profile from "@/models/user_profile";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const title = searchParams.get("title")

    await PinterestDB()

    try {
        const user = await user_profile.findOne({ email })

        const board = await user_board
            .findOne({ user: user._id, title })
            .populate({
                path: "pins", 
                select: "keywords",
            })

        const pinKeywords = board.pins.map(pin => pin.keywords).flat()

        const pins = await Pin.find({
            keywords: { $in: pinKeywords },
        })
            .populate("user")
            .populate("likes")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "firstName lastName",
                },
            });

        return new Response(
            JSON.stringify({
                success: true,
                data: { board, pins },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
