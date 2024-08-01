const mongoose=require("mongoose");
const {Schema}=mongoose;
const blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    content:String,
    user:{
        type:Schema.Types.ObjectId, 
        ref:"User"
    },
    verify:{
        type:Boolean,
        default:false
    },
    favourites:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model("blog",blogSchema);