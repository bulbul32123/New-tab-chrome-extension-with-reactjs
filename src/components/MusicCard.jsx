import React from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { RiLoopRightLine } from "react-icons/ri";


export default function MusicCard({ data, isPlaying, onPlayPause, progress, onLoopToggle, isLoopingOne }) {
    return (
        <div className="w-full">
            <button
                className='flex justify-between items-center w-full pr-5 pb-2'
                onClick={onPlayPause}
            >
                <div className="flex gap-3 items-center">
                    <img src={data.thumbnail} alt="Thumb" className='rounded-full h-10 w-10 object-cover object-center' />
                    <div className="flex flex-col gap-1 items-start">
                        <span className='text-[16px] text-gray-200'>{data.title}</span>
                        <span className='text-xs text-gray-400'>by - {data.credits}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isPlaying && <button onClick={(e) => { e.stopPropagation(); onLoopToggle(); }} title="Loop this track" className={`${isLoopingOne ? "text-green-400" : "text-white"}`}>
                        <RiLoopRightLine />
                    </button>}
                    <span>
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </span>
                </div>
            </button>


            {/* Progress bar */}
            {isPlaying && <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>}
        </div>
    );
}
