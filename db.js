const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

const userSchema=new Schema({
    email:{type:String, required:true, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    creatorId:ObjectId
});

const adminSchema=new Schema({
    email:{type:String, required:true, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const userModel=mongoose.model("User",userSchema);
const courseModel=mongoose.model("Course", courseSchema);
const adminModel=mongoose.model("Admin", adminSchema);
const purchaseModel=mongoose.model("Purchase", purchaseSchema);

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel,
    connectDB
}