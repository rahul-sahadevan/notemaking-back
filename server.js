const express = require("express")
const mongoose = require("mongoose")
const noteModel = require("./noteModel")
const cors = require("cors")


const app = express()
const PORT = 8000
const URI= "mongodb+srv://rahul:12345@cluster0.zrlma3o.mongodb.net/note_app"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


mongoose.connect(URI)
.then(()=> console.log("db is connected"))
.catch((error)=> console.log(error))


app.get("/",(req,res)=>{
   return res.send("server is running")
})

app.post("/add_note",async(req,res)=>{
    const {title,note} = req.body
    console.log(title,note)
    try{

        const noteObj = new noteModel({
            title,
            note
        })

        const noteDb = await noteObj.save()
        console.log(noteDb)

        return res.send({
            status:201,
            message:"note is added succesfully",
            data:noteDb
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"database error"
        })
    }
    

})

app.get("/get_notes",async(req,res)=>{
    try{
        const allNotes = await noteModel.find()
        console.log(allNotes)
        return res.send({
            status:200,
            message:"all data fetched",
            data:allNotes
        })
    }
    catch(error){
        return res.send({
            status:500,
            message:"data base error"
        })
    }
})

app.post("/delete_note",async(req,res)=>{

    const {title} = req.body
    console.log(title)
    try{

        const noteDb = await noteModel.findOneAndDelete({title})
        console.log(noteDb)

        return res.send({
            status:200,
            message:"deletion is completed",
            data:noteDb
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"database error"
        })
    }
    // return res.send("delete is compelted")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})