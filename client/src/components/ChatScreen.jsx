import React, { useEffect, useRef, useState } from 'react'

const ChatScreen = ({nickname,room,socket}) => {

    const [messageList,setMessageList] = useState([]);

    const messageBoxRef = useRef(null);

    useEffect(() => {
        socket.on("message", (message) => {
            console.log(message)
            setMessageList(prev => [...prev,message]);
        })
    },[socket])

    const handleSubmit = () => {
        const date = new Date(Date.now());
        const newMessage = {
            nickname,
            room,
            time: date.getHours() + ':' + date.getMinutes(),
            text: messageBoxRef.current.value
        }
        setMessageList((prev) => [...prev,newMessage])
        socket.emit("newMessage",newMessage)
        messageBoxRef.current.value= "";
    }


  return (
    <div className='w-3/4 h-[600px] flex flex-col'>
        <div className='flex items-center justify-between bg-slate-500 px-2'>
            <div>Connected Room: <span className='text-blue-400 font-bold'>{room}</span></div>
            <div>Your Nickname: <span className='text-blue-400 font-bold'>{nickname}</span></div>
        </div>
        <div className='flex-1 bg-slate-400 p-5 flex flex-col gap-[20px]'>
            {messageList.map((message) => (
            <div className={`font-bold text-white flex items-center ${message.nickname === nickname ? "justify-end" : "justify-start"}`}>
                <div className={`${message.nickname === nickname ? "bg-slate-500" :"bg-green-500"} p-2 max-w-[85%] flex flex-col gap-1 rounded-md`}>
                    <span className='text-xs italic'>{message.nickname}:{message.time}</span>
                    {message.text}
                </div>
            </div>
            ))}
        </div>
        <div className='flex gap-4 items-center h-24 bg-slate-500 p-2'>
            <textarea ref={messageBoxRef} className='min-h-[80px] h-[80x] max-h-[80px] flex-1 bg-slate-300 text-slate-700 font-bold p-2 outline-none' />
            <button onClick={handleSubmit} className='px-2 py-1 bg-blue-500 h-full rounded-lg'>SUBMIT</button>
        </div>
    </div>
  )
}

export default ChatScreen