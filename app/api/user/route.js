import PinterestDB from '@/lib/database'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  await PinterestDB()

  try {
    const userProfile = await User.findOne({ email })
    if (!userProfile) {
      return new Response(JSON.stringify({ success: false, message: 'User profile not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data: userProfile }), {
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
    console.log(body)

    const newUser = new User({
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
    })

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

    if (!firstName || !lastName || !username) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = await User.updateOne(
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


