import React from 'react'
import axios from "../config/axios.js"
import { useState, useEffect, useRef, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import hljs from 'highlight.js';
import { ImCross } from "react-icons/im";
const Project = () => {
    const location = useLocation();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    return (
        <main className='h-screen w-screen flex'>
            <section className="left h-full min-w-96 relative bg-slate-300 flex flex-col">
                <header className='w-full p-2 px-4 flex justify-end bg-slate-100'>
                    <button className='p-2'
                        onClick={() => { setIsSidePanelOpen(!isSidePanelOpen) }}
                    >
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className='conversation-area flex-grow flex flex-col'>
                    <div className="message-box flex-grow flex flex-col gap-1 p-1">
                        <div className="max-w-56 message bg-slate-50 p-2 w-fit rounded-md flex flex-col ">
                            <small
                                className='opacity-65 text-xs'
                            >
                                example@gmail.com
                            </small>
                            <p className='text-sm'>
                                Lorem ipsum dolor sit amet.
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        <div className="max-w-56  ml-auto message bg-slate-50 p-2 w-fit rounded-md flex flex-col ">
                            <small
                                className='opacity-65 text-xs'
                            >
                                example@gmail.com
                            </small>
                            <p className='text-sm'>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                    </div>
                    <div className="inputField w-full flex">
                        <input className='border-none outline-none p-2 px-4 bg-white flex-grow' type='text' placeholder='Enter message' />
                        <button className='px-5 bg-black text-white'>
                            <i className="ri-send-plane-2-fill"></i>
                        </button>
                    </div>
                </div>
                <div
                    className={`sidePanel bg-slate-100 flex flex-col gap-2 w-full h-full absolute top-0 left-0 transform transition-all duration-300
                      ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`
                    }
                >
                    <ImCross className='text-4xl place-self-end pr-3 pt-2'
                        onClick={() => { setIsSidePanelOpen(!isSidePanelOpen) }}
                    />
                    <div className="users flex flex-col gap-2">
                        <div className="user cursor-pointer bg-amber-400 hover:bg-pink-500 p-2 flex gap-2 items-center group">
                            <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                                <i className="ri-user-fill text-xl absolute"></i>
                            </div>
                            <h1 className="font-semibold text-lg">username</h1>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

export default Project
