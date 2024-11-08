import mongoose from "mongoose";

const PinterestDB = async ()=>{
    if(mongoose.connections[0].readyState){
        return true
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        crossOriginIsolated.log('MongoDB connected')
        return  true
    } catch (error) {
        
    }
}

export default PinterestDB