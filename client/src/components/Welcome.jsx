import React from 'react'

const Welcome = ({nickname,room,setRoom,setNickname,socket,setChatReady}) => { 

const handleConnect = () => {
    socket.emit("joinRoom", room);
    setChatReady(true);
}

  return (
    <div className='w-3/4 h-[600px] bg-slate-600 flex flex-col gap-8 items-center justify-center'>
      <h1 className='text-3xl font-bold'>Welcome to my ChatAPP</h1>
      <div className='flex flex-col gap-4 items-center'>
        <input value={nickname} onChange={e=> setNickname(e.target.value)} type="text" placeholder="Nickname..." className="px-2 py-1 text-lg bg-slate-500 rounded-md outline-none " />
        <input value={room} onChange={e=> setRoom(e.target.value)} type="text" placeholder="Room..." className="px-2 py-1 text-lg bg-slate-500 rounded-md outline-none " />
        <button onClick={handleConnect} className='bg-blue-300 font-bold px-2 py-2 rounded-md w-full '>CONNECT</button>
      </div>
      
    </div>
  )
}

export default Welcome
