import PinterestDB from "@/lib/database"
import Section from "@/models/Section"
import user_board from "@/models/user_board"
import user_profile from "@/models/user_profile"

export async function POST(req, res) {
    await PinterestDB()

    try {
        const body = await req.json()
        console.log(body)

        const existingSection = await Section.findOne({ 
            board: body.board, 
            title: body.title 
        })

        if (existingSection) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'A section with this title already exists for this user.' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const newSection = new Section({
            title: body.title,
            board: body.board,
            user: body.user
        })

        const savedSection = await newSection.save()

        const board = await user_board.findById(savedSection.board)
        if (board) {
            board.sections.push(savedSection._id)
            await board.save()
        }

        return new Response(JSON.stringify({ success: true, message: savedSection }), {
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
    // const email = searchParams.get('email')
    const title = searchParams.get('title')
    const board = searchParams.get('board')

    await PinterestDB()

    try {
        // const user = await user_profile.findOne({email})

        const section = await Section.findOne({ 
            board, 
            title 
        })

        if (!section) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'No section found with this title for the user.' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify({ success: true, data: section }), {
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
    const { title, images, _id } = body
    // console.log(body)

    if (!title) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = await Section.updateOne(
      { _id },
      {
        $set: {
          title,
          images
        }
      }
    )

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Section not found or no changes made' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, message: 'Section updated successfully' }), {
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

        const {_id, board} = body

        await Section.findOneAndDelete({_id})

        const thisBoard = await user_board.findOne({_id: board})

        thisBoard.sections = thisBoard.sections.filter(section => section.toString() !== _id)

        await thisBoard.save()

        return new Response(JSON.stringify({
            success: true,
            message: 'Section deleted successfully.'
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