import PinterestDB from "@/lib/database"
import user_board from "@/models/user_board"
import user_profile from "@/models/user_profile"
import Section from "@/models/Section"
import Pin from "@/models/Pin"

export async function POST(req, res) {
    await PinterestDB()

    try {
        const body = await req.json()
        console.log(body)

        const existingBoard = await user_board.findOne({ 
            user: body.user, 
            title: body.title 
        })

        if (existingBoard) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'A board with this title already exists for this user.' ,
                // data: existingBoard
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const newBoard = new user_board({
            title: body.title,
            private: body.private,
            user: body.user
        })

        const savedBoard = await newBoard.save()

        const user = await user_profile.findById(savedBoard.user)
        if (user) {
            user.boards.push(savedBoard._id)
            await user.save()
        }

        return new Response(JSON.stringify({ success: true, message: savedBoard }), {
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

export async function GET(req) {
    // Get one board by user and title
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const title = searchParams.get('title')

    await PinterestDB()

    try {
        const user = await user_profile.findOne({username})

        const board = await user_board.findOne({ 
            user: user._id, 
            title: title 
        }).populate('pins')
        .populate({
            path: 'sections',
            populate: {
            path: 'pins'
            }
        })

        if (!board) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'No board found with this title for the user.' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify({ success: true, data: board }), {
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
    const { title, cover, description, secret, _id, images } = body
    // console.log(body)

    if (!title || !cover) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = await user_board.updateOne(
      { _id },
      {
        $set: {
          title,
          cover,
          description,
          private: secret,
          images
        },
      }
    )

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: 'User not found or no changes made' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, message: 'Board updated successfully' }), {
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

        const {_id, user} = body

        await user_board.findOneAndDelete({_id})

        const userProfile = await user_profile.findOne({_id: user})
s
        userProfile.boards = userProfile.boards.filter(board => board.toString() !== _id)

        await userProfile.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Board deleted successfully.'
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