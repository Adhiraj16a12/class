const express = require("express")
const { request } = require("http")
const app = express()
const server = require("http").Server(app)

app.set("view engine" , "ejs" )

app.use(express.static("public"))

const{v4:uuidv4} = require("uuid")
const io = require("socket.io")(server,{
    //cors stands for cross origin resource sharing
    cors:{
        origin:"*"
    }
})



app.get("/",(req,res)=>{
    res.redirect(`/{uuidv4()}`)
})

app.get("/:room",(req,res)=>{
    res.render("index" , {roomID:req.params.room})
})

io.on("connection", (socket)=>{
    socket.on("message", (message)=>{
        io.emit("create message" , message)
    })
    socket.on("create message" , (message)=>{
        $(".messages").append(`
        <div class = "message">
            <span>
                ${message}
            </span>
        </div>
        `)
    })
})



server.listen(3030)