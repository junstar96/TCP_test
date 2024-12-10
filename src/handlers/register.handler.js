import { Socket, Server as SocketIO } from "socket.io";
import { addUser } from "../models/user.models.js";
import {v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, handleEvent } from "./helper.js";


export const registerHandler = (io) => {


    //connection이란 게 발생할 때까지 대기한다.
    io.on('connection', (socket) => {
        //최초 커넥션이 맺어진 이후 계속 여기서 돌아간다.
        const userUUID = uuidv4();
        addUser({uuid : userUUID, socketID : socket.id});
        handleConnection(socket, userUUID);

        socket.on("event", (data)=>handleEvent(io,socket,data));

        socket.io('disconnect', (socket)=>handleDisconnect(socket,userUUID));
    })
}