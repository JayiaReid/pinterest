import PinterestDB from "@/lib/database"
import user_profile from "@/models/user_profile"
import user_board from "@/models/user_board"
import Section from "@/models/Section"
import Pin from "@/models/Pin"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const q = searchParams.get('q')
  
    try {
      await PinterestDB()
      if(username){
        const user = await user_profile.findOne({ username }).populate({
        path: 'boards',
        populate: {
        path: 'sections',
        populate: 'pins'
        }
    }).populate({
      path: "boards",
      populate:{
        path: 'pins'
      }
    }).populate('followers').populate('following')

    const pins = await Pin.find({user: user._id})


      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'User profile not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
  
      return new Response(JSON.stringify({ success: true, data: user, pins: pins  }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
      }else{
        const users = await user_profile.find({username: {$regex: q, $options: 'i'}})

        if (!users) {
          return new Response(JSON.stringify({ success: false, message: 'User profile not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          })
        }
    
        return new Response(JSON.stringify({ success: true, data: users }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
        }
      
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

export async function PUT(req){
  
  const body = await req.json()

  const {op, email, _id} = body

  try {

    await PinterestDB()
    if(op){
      const thisUser = await user_profile.findOne({email})

      const user = await user_profile.findById(_id)

      user.followers.push(thisUser._id)
      user.followersNum = user.followersNum + 1
      user.save()

      thisUser.following.push(_id)
      thisUser.followingNum = thisUser.followingNum + 1
      thisUser.save()

      return new Response(JSON.stringify({
        success: true,
        message: 'Followed'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
    }else{
      const thisUser = await user_profile.findOne({email})

      const user = await user_profile.findById(_id)

      user.followers = user.followers.filter(follower => follower.toString() !== thisUser._id.toString()) 
      user.followersNum = user.followers.length
      user.save()

      thisUser.following = thisUser.following.filter(user => user.toString() !== _id.toString())
      thisUser.followingNum = thisUser.following.length
      thisUser.save()

      return new Response(JSON.stringify({
        success: true,
        message: 'UnFollowed'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
    }

      
   
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// export async function DELETE(req){
  
//   const body = await req.json()

//   const { email, _id} = body

//   try {
//     await PinterestDB()

//       const thisUser = await user_profile.findOne({email})

//       const user = await user_profile.findById(_id)

//       user.followers.filter(follower => follower.toString() != thisUser._id) 
//       // user.followersNum = user.followersNum - 1
//       user.save()

//       thisUser.following.filter(user => user.toString() != _id)
//       // thisUser.followingNum = thisUser.followingNum - 1
//       thisUser.save()

//       return new Response(JSON.stringify({
//         success: true,
//         message: 'UnFollowed'
//     }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     })
   
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }