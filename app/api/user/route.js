import PinterestDB from '@/lib/database'
import user_profile from '@/models/user_profile'
import user_board from '@/models/user_board'
import Section from '@/models/Section'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  try {
    await PinterestDB()
    const user = await user_profile.findOne({ email }).populate({
      path: 'boards',
      populate: {
      path: 'sections'
      }
  }).populate({
    path: "boards",
    populate:{
      path: 'pins'
    }
  })
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User profile not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data: user }), {
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

export async function POST(req, res) {

  await PinterestDB()

  try {
    const body = await req.json()
    // console.log(body)
    

    const newUser = new user_profile({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      about: body.about,
      website: body.website,
      username: body.username,
      photo: body.photo,
      followersNum: body.followersNum,
      followingNum: body.followingNum,
      followers: [],
      following: [],
      createdAt: new Date(),
      boards: []
    })

    // ensure not same username

    // const newUser = new UserProfile(userInfo)
    const savedUser = await newUser.save()

    return new Response(JSON.stringify({ success: true, message: savedUser }), {
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

export async function PUT(req) {
  await PinterestDB()

  try {
    const body = await req.json()
    const { email, firstName, lastName, about, website, username, photo } = body
    // console.log(body)

    if (!firstName || !lastName || !username) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const existingUser = await user_profile.findOne({ 
      username: body.username 
  })

  if (existingUser) {
      return new Response(JSON.stringify({ 
          success: false, 
          message: 'Username taken' 
      }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
      })
  }

    const result = await user_profile.updateOne(
      { email: email },
      {
        $set: {
          firstName,
          lastName,
          about,
          website,
          username,
          photo,
        },
      }
    )

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: 'User not found or no changes made' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, message: 'Profile updated successfully' }), {
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


