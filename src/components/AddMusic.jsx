import React, { useState, useRef } from 'react';

export default function AddMusic({ openAddMusicModel, setOpenAddMusicModel }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const imgInputRef = useRef();
    const audioInputRef = useRef();

    const handleSubmit = () => {
        const newMusic = {
            id: Date.now(),
            title,
            artist,
            thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : '',
            audioUrl: audioUrl ? URL.createObjectURL(audioUrl) : ''
        };

        const existing = JSON.parse(localStorage.getItem('musicData')) || [];
        localStorage.setItem('musicData', JSON.stringify([...existing, newMusic]));

        setOpenAddMusicModel(false);
        setTitle('');
        setArtist('');
        setThumbnail(null);
        setAudioUrl(null);
    };

    return (
        <>
            <div className={`fixed inset-0 z-[12] w-full h-full bg-black ${openAddMusicModel ? "inline" : "hidden"}`}></div>
            <div className={`fixed  z-[13] w-[30rem] max-h-[90vh] overflow-y-auto transition-all duration-200 ease-in-out rounded-2xl bg-[#72727258] text-white ${openAddMusicModel ? "py-4 px-5 opacity-[1px]" : "h-0 opacity-0"}`}>

                <h5 className='mb-4 font-light text-lg mt-2'>Add a Music</h5>

                {/* Custom Image Upload */}
                <div className="flex items-center justify-center flex-col">
                    <div
                        onClick={() => imgInputRef.current.click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            setThumbnail(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-32 h-32 rounded-full bg-black/20 flex items-center justify-center overflow-hidden cursor-pointer border  border-white mb-4"
                    >
                        {thumbnail ? (
                            <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span className="text-xs text-white text-center">Click or Drop Image</span>
                        )}
                        <input
                            ref={imgInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                    </div>

                    {/* Custom Audio Upload */}
                    <div
                        onClick={() => audioInputRef.current.click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            setAudioUrl(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-full p-4 bg-black/20 rounded-xl cursor-pointer text-center border border-white mb-4"
                    >
                        {audioUrl ? (
                            <audio controls className="w-full">
                                <source src={URL.createObjectURL(audioUrl)} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        ) : (
                            <span className="text-xs text-white">Click or Drop Audio File</span>
                        )}
                        <input
                            ref={audioInputRef}
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={(e) => setAudioUrl(e.target.files[0])}
                        />
                    </div>

                </div>

                {/* Text Inputs */}
                <div className="flex flex-col gap-4 mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="bg-black/20 p-2 rounded text-white outline-none"
                    />
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Artist"
                        className="bg-black/20 p-2 rounded text-white outline-none "
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        className='py-2 px-5 rounded-full text-sm mt-3 bg-black text-white'
                        onClick={() => setOpenAddMusicModel(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='py-2 px-5 rounded-full text-sm mt-3 bg-white text-black'
                    >
                        Add to list
                    </button>
                </div>
            </div>
        </>
    );
}
