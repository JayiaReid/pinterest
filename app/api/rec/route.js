import PinterestDB from "@/lib/database";
import user_board from "@/models/user_board";
import Pin from "@/models/Pin";
import user_profile from "@/models/user_profile";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    await PinterestDB();

    try {
        const userBoards = await user_board
            .find({ user: userId })
            .populate({
                path: "pins",
                select: "keywords",
            });
        
        if(!userBoards){
            const recommendedPins = await Pin.find()
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
            return new Response(
                JSON.stringify({
                    success: true,
                    data: { recommendedPins },
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const boardKeywords = userBoards
            .flatMap(board => board.pins.map(pin => pin.keywords))
            .flat();

        const user = await user_profile.findById(userId).populate({
            path: "following",
            select: "_id",
        });

        const followingIds = user.following.map(followedUser => followedUser._id);

        const recommendedPins = await Pin.find({
            $or: [
                { keywords: { $in: boardKeywords } }, 
                { user: { $in: followingIds } }, 
            ],
        })
            .populate({
                path: "user",
                select: "-email", 
            })
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
                data: { recommendedPins },
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
