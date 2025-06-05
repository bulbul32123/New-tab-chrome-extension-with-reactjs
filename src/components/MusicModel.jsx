import React, { useState, useRef, useEffect } from 'react';
import MusicCard from './MusicCard';
import { IoVolumeMedium } from "react-icons/io5";
import AddMusic from './AddMusic';

export default function MusicModel({ open, close, setIsPlaying, isPlaying, data }) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [loopAll, setLoopAll] = useState(false);
    const [loopOne, setLoopOne] = useState(null); // per-track loop
    const [volume, setVolume] = useState(0.5); // range: 0.0 (muted) to 1.0 (max)
    const [openAddMusicModel, setOpenAddMusicModel] = useState(false);


    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const handlePlayPause = (index) => {
        if (index === currentIndex) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const handleToggleLoop = () => {
        setLoopAll((prev) => {
            const newLoopAll = !prev;
            if (newLoopAll) setLoopOne(null); // turn off loopOne when loopAll is on
            return newLoopAll;
        });
    };

    const handleToggleLoopOne = (index) => {
        setLoopOne((prev) => {
            const newLoopOne = prev === index ? null : index;
            if (newLoopOne !== null) setLoopAll(false); // turn off loopAll when loopOne is on
            return newLoopOne;
        });
    };


    const handleTimeUpdate = () => {
        const { currentTime, duration } = audioRef.current;
        setProgress((currentTime / duration) * 100);
    };

    const handleEnded = () => {
        if (loopOne === currentIndex) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (loopAll) {
            const nextIndex = (currentIndex + 1) % data.length;
            setCurrentIndex(nextIndex);
        } else {
            setIsPlaying(false);
        }
    };



    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || currentIndex === null) return;

        audio.src = data[currentIndex].audio;

        // Only play if loopOne or loopAll is active or user manually triggered playback
        if (loopAll || loopOne !== null || isPlaying) {
            audio.play();
            setIsPlaying(true);
        }

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentIndex]);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);


    return (
        <>
            <div className={`fixed inset-0 z-[11] w-full h-full bg-black/90 overflow-hidden ${open ? "inline" : "hidden"}`}></div>
            <div className={`fixed z-[12] w-[30rem] transition-all duration-200 ease-in-out rounded-2xl bg-[#72727258] text-white overflow-hidden ${open ? "h-96 py-4 px-5 opacity-[1px]" : "h-0 opacity-0"}`}>
                <div className="flex justify-between items-center">
                    <h5 className='mb-2 font-light text-lg mt-2'>Select a Music</h5>
                    <div className="flex items-center gap-4 mt-2 relative">

                        {/* Volume Control */}
                        <div className="group relative flex items-center">
                            {/* Volume Icon */}
                            <span><IoVolumeMedium size={20} /></span>
                            {/* Slider (shows on hover) */}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="absolute -left-[7.5rem] top-1/2 transform -translate-y-1/2 w-[6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer  [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:w-3
             [&::-webkit-slider-thumb]:h-3
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:bg-white
             [&::-webkit-slider-thumb]:shadow
             [&::-webkit-slider-thumb]:transition
             [&::-webkit-slider-thumb]:duration-150"
                            />
                        </div>

                        {/* Loop Toggle */}
                        <button
                            onClick={handleToggleLoop}
                            className={`text-sm px-3 py-1 rounded-full ${loopAll ? "bg-white text-black" : "bg-black text-white"}`}
                        >
                            {loopAll ? "Looping All" : "Looping All Off"}
                        </button>
                    </div>
                </div>

                <div className="h-[16rem] w-full overflow-x-hidden">
                    <div className="flex flex-col gap-5 my-3">
                        {data?.map((track, index) => (
                            <MusicCard
                                key={track.id}
                                data={track}
                                isPlaying={index === currentIndex && isPlaying}
                                progress={index === currentIndex ? progress : 0}
                                onPlayPause={() => handlePlayPause(index)}
                                onLoopToggle={() => handleToggleLoopOne(index)}
                                isLoopingOne={loopOne === index}
                                volume={volume}
                                setVolume={setVolume}
                            />

                        ))}
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className='py-2 px-5 rounded-full text-sm mt-3 bg-black text-white' onClick={() => close(false)}>Cancel</button>
                    <button onClick={() => { setOpenAddMusicModel(true) }} className='py-2 px-5 rounded-full text-sm mt-3 bg-white text-black'>Add Music</button>
                </div>

                {/* Hidden audio element */}
                <audio ref={audioRef} hidden loop={loopOne !== null} />
            </div>
            <AddMusic setOpenAddMusicModel={setOpenAddMusicModel} openAddMusicModel={openAddMusicModel} />
        </>
    );
}
