import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import http from "http";


const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"],
    }
})

io.on("connection",(socket) => {
    console.log(`socket: ${socket.id} is connected`)

    socket.on("joinRoom", (room) => {
        console.log(room)
        socket.join(room);
    })

    socket.on("newMessage",(message)=> {
        console.log(message)
        socket.to(message.room).emit("message", message);
    })

})

const PORT = 5000;

server.listen(PORT,() => {
    console.log(`server listening on ${PORT}`);
})