
const User=require("../model/user");
const blog=require("../model/blog");
const getAllBlogsadmin = async (req, res) => {
    try {
        let blogsadmin = await blog.find({verify:true}).populate("user");
        const count=0;
        console.log(count);
      
      console.log(count);
      console.log(hi);
        res.render('adminhome', { blogsadmin });
    } catch (error) {
        res.send('Error');
    }
};
const getAllBlogs= async (req, res) => {
    try {
        let blogsadmin = await blog.find({}).populate("user");
        res.render('home', { blogsadmin });
    } catch (error) {
        res.send('Error');
    }
};
const getAllfavourites= async (req, res) => {
  try {
      let blogsadmin = await blog.find({}).populate("user");
      res.render('favourites', { blogsadmin });
  } catch (error) {
      res.send('Error');
  }
};
const notification= async (req, res) => {
  try {
      let blogsadmin = await blog.find({}).populate("user");
      const count=0;
      for (i in {blogsadmin} ){
        count++;
      }
      console.log(count);
      res.render('notification', { blogsadmin });
  } catch (error) {
      res.send('Error');
  }
};
const getBlogByUser = async (req, res) => {
    try {
        let users=await User.findById({_id:req.session.user._id}).populate("blog");
        let blogs=await blog.find({user:req.session.user._id}).populate("user");
        res.render('userhome', { users,blogs });
    } catch (error) {
        console.error('Error in getAllBlogsadmin function:', error);
        res.send('Error');
    }
};

  const deleteBlog = async (req, res) => {
    const user=req.session.user;
    const blogId = req.params.blogId;
  console.log(blogId)
    try {
       
      const blogInstance = await blog.findById(blogId);

   await blog.findByIdAndDelete(blogId);
      const userblog = await User.findOne({ _id: blogInstance.user });
      await User.findByIdAndUpdate(userblog._id, { $pull: { blog: blogId } });

   if(user.username=="Varnika"){
        res.redirect('admin/home');
}else{ res.redirect('user/home') ;}
    } catch (error) {
      console.error(error);
      res.send("Error");
    }
  };
  const fullblog = async(req,res)=>{
    const blogId = req.params.blogId;
    const blogInstance = await blog.findById(blogId).populate('user');
    console.log(blogInstance);
    res.render("fullblog",{blogInstance});
  }
  const approve=async(req,res,next)=>{
    // console.log(req.params.blogId);
    const blogId=req.params.blogId;
    const blogInstance = await blog.findById(blogId).populate('user');
    blogInstance.verify=true;
    await blogInstance.save();
    next();
  }
  const favourites=async(req,res,next)=>{
    // console.log(req.params.blogId);
    const blogId=req.params.blogId;
    const blogInstance = await blog.findById(blogId).populate('user');
    blogInstance.favourites=true;
    await blogInstance.save();
    next();
  }
module.exports={
    getAllBlogsadmin,
    getAllBlogs,
    getBlogByUser,
    deleteBlog,
    fullblog,
    notification,
    approve,
    favourites,
    getAllfavourites
}  