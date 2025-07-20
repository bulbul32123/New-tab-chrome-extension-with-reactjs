import React, { useEffect, useState } from 'react'
import { FaMusic } from "react-icons/fa6";

import { IoMdAdd } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import AddDocks from './AddDocks'
import MusicModel from './MusicModel';

const data = [
    {
        thumbnail: "thum-1.webp",
        id: 1,
        audio: "aud-1.mp3",
        title: "Navjaxx, VXLLAIN - Shattered Memories",
        credits: "Navjaxx",
        ytLink: "https://www.youtube.com/watch?v=2214fezAZh4",
        channel: "https://www.youtube.com/channel/UCDQJVT9rTc6Ukbt9w_eCqng"
    },
    {
        thumbnail: "thum-2.webp",
        id: 2,
        audio: "aud-2.mp3",
        title: "Lonely Lies, GOLDKID$ - Interlinked",
        credits: "GOLDKID$",
        channel: "https://www.youtube.com/channel/UCU3ioEQ-UhS25Lnqt3v6f5Q",
        ytLink: "https://www.youtube.com/watch?v=ngJTmTAtgw0",
    },
    {
        thumbnail: "thum-3.webp",
        id: 3,
        audio: "aud-3.mp3",
        title: "Fainted (Sped Up)",
        credits: "Narvent",
        ytLink: "https://www.youtube.com/watch?v=You1CxVrDO0",
        channel: "https://www.youtube.com/channel/UC5yQIaYVVhKH8HHZgjA_IVg"
    },
    {
        thumbnail: "thum-4.webp",
        id: 4,
        ytLink: "https://www.youtube.com/watch?v=W8T--Rm0Gts",
        audio: "aud-4.mp3",
        title: `VXLLAIN x VØJ x Narvent "Distant Echoes"`,
        credits: "PHONK DOMAIN",
        channel: "https://www.youtube.com/@PHONKDOMAIN"
    },
    {
        thumbnail: "thum-5.webp",
        id: 5,
        audio: "aud-5.mp3",
        ytLink: "https://www.youtube.com/watch?v=MtAJqTZ05Gs",
        title: "Navjaxx - Metaverse ",
        credits: "Navjaxx",
        channel: "https://www.youtube.com/channel/UCDQJVT9rTc6Ukbt9w_eCqng"
    },
    {
        thumbnail: "thum-6.webp",
        id: 6,
        audio: "aud-6.mp3",
        ytLink: "https://www.youtube.com/watch?v=KgayxOF4Y7E",
        title: "ATLXS - PASSO BEM SOLTO (SLOWED)",
        credits: "Phonk",
        channel: "https://www.youtube.com/channel/UCU_YH9sKziXutlXkkd5zDMQ"
    },
    {
        thumbnail: "thum-7.webp",
        id: 7,
        audio: "aud-7.mp3",
        ytLink: "https://www.youtube.com/watch?v=aD0CPeS8OKs",
        title: "EVA",
        credits: "blueberry",
        channel: "https://www.youtube.com/channel/UCgAXqwdE-W-NNUks8Ad6RnQ"
    },
    {
        thumbnail: "thum-8.webp",
        id: 8,
        audio: "aud-8.mp3",
        ytLink: "https://www.youtube.com/watch?v=c8jyIg7tnv8",
        title: "LOWX - SEA OF FEELINGS",
        credits: "LOWX",
        channel: "https://www.youtube.com/channel/UCXbWclAWK2vF-045BRtNxqw"
    },
    {
        thumbnail: "thum-9.webp",
        id: 9,
        audio: "aud-9.mp3",
        ytLink: "https://www.youtube.com/watch?v=lCGaqyo7zRg",
        title: "Navjaxx - Embrace",
        credits: "Navjaxx",
        channel: "https://www.youtube.com/channel/UCDQJVT9rTc6Ukbt9w_eCqng"
    },
    {
        thumbnail: "thum-10.webp",
        id: 10,
        audio: "aud-10.mp3",
        ytLink: "https://www.youtube.com/watch?v=hjAmtY0Ezes",
        title: "Navjaxx, GOLDKID$ - Heavenly",
        credits: "Navjaxx",
        channel: "https://www.youtube.com/channel/UCDQJVT9rTc6Ukbt9w_eCqng"
    },
    {
        thumbnail: "thum-11.webp",
        id: 11,
        audio: "aud-11.mp3",
        ytLink: "https://www.youtube.com/watch?v=84VRfysYJfA",
        title: "STRXY - Timeless",
        credits: "Navjaxx",
        channel: "https://www.youtube.com/channel/UC8i-3OeVvCphKJoGGPPxp2g"
    },
    {
        thumbnail: "thum-12.webp",
        id: 12,
        audio: "aud-12.mp3",
        ytLink: "https://www.youtube.com/watch?v=sxEsBKBg7R8",
        title: "BLOODY MARY - VØIDGLiTCH & ØNELY",
        credits: "ØNELY",
        channel: "https://www.youtube.com/channel/UCiHqQjEcajydPgVooMYIw2A"
    },
    {
        thumbnail: "thum-13.webp",
        id: 13,
        audio: "aud-13.mp3",
        ytLink: "https://www.youtube.com/watch?v=ClRjTtga8rg",
        title: "Tumse Mohabbat Hai - JalRaj",
        credits: "JalRaj",
        channel: "https://www.youtube.com/channel/UCRvWt-hqdAQF1muHky56jxw"
    },
    {
        thumbnail: "thum-14.webp",
        id: 14,
        audio: "aud-14.mp3",
        ytLink: "https://www.youtube.com/watch?v=rpB6iJbhocA",
        title: "Fainted (Slowed)",
        credits: "Narvent",
        channel: "https://www.youtube.com/channel/UC5yQIaYVVhKH8HHZgjA_IVg"
    },
    {
        thumbnail: "thum-15.webp",
        id: 15,
        audio: "aud-15.mp3",
        ytLink: "https://www.youtube.com/watch?v=MMaqEJuj12s",
        title: "Shitom Ahmed - Chorabali",
        credits: "Ahmed Shakib",
        channel: "https://www.youtube.com/channel/UC8KixL2PCvZStvvfmES8bEg"
    },
    {
        thumbnail: "thum-16.webp",
        id: 16,
        audio: "aud-16.mp3",
        ytLink: "https://www.youtube.com/watch?v=8kooIgKESYE",
        title: "Interstellar theme song",
        credits: "JustMontage",
        channel: "https://www.youtube.com/@justmontages"
    },

]

export default function Docks() {
    const [openAddDockModel, setOpenAddDockModel] = useState(false);
    const [openAddMusicModel, setOpenAddMusicModel] = useState(false);
    const [docks, setDocks] = useState([]);
    const [musics, setMusics] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const GetDobToLocalStorage = async () => {
        const docksData = await localStorage.getItem("dockItems")
        const parsed = JSON.parse(docksData);
        setDocks(parsed)
    }
    const GetMusicToLocalStorage = async () => {
        const musicData = await localStorage.getItem("musicData")
        const parsed = JSON.parse(musicData);
        setMusics(parsed)
    }
    console.log(musics);

    function setDocksToLocalStorage(key, newItem) {
        const existing = JSON.parse(localStorage.getItem(key)) || [];
        existing.push(newItem);
        localStorage.setItem(key, JSON.stringify(existing));
        setOpenAddDockModel(false)
        GetDobToLocalStorage()
    }
    function setMusicToLocalStorage(key, newItem) {
        const existing = JSON.parse(localStorage.getItem(key)) || [];
        existing.push(newItem);
        localStorage.setItem(key, JSON.stringify(existing));
        setOpenAddMusicModel(false)
        GetMusicToLocalStorage()
    }
    useEffect(() => {
        GetDobToLocalStorage()
        GetMusicToLocalStorage()
    }, [])


    return (
        <>
            <AddDocks open={openAddDockModel} close={setOpenAddDockModel} setDockData={setDocksToLocalStorage} />
            {/* <MusicModel open={openAddMusicModel} close={setOpenAddMusicModel} setDockData={setMusicToLocalStorage} isPlaying={isPlaying} setIsPlaying={setIsPlaying} data={data} /> */}


            <div className="dock">
                <div className="dock-container">
                    <div className="flex">
                        {
                            docks?.map((item) => (
                                <a href={item.address} className='dock-icon dock-item'>
                                    <img className='' src={`https://www.google.com/s2/favicons?domain=${item.address}&sz=64`} />
                                    <span className='tooltip'> {item.name}</span>
                                </a>
                            ))
                        }
                    </div>
                    <div className="dock-divider"></div>
                    <button className="dock-item add-dock-item" onClick={() => setOpenAddDockModel(true)}>
                        <div className="dock-icon">
                            <span><IoMdAdd size={20} /></span>
                        </div>
                        <span className="tooltip">Add</span>
                    </button>

                    {/* <button className="dock-item add-dock-item" onClick={() => setOpenAddMusicModel(true)}>
                        <div className="dock-icon">
                            <span><FaMusic className={`${isPlaying ? "animate-wave" : ""}`} size={20} />
                            </span>
                        </div>
                        <span className="tooltip">{isPlaying ? "Music Playing" : "Music"}</span>
                    </button> */}

                    <button className="dock-item" id="settings-icon">
                        <div className="dock-icon">
                            <span><IoSettingsSharp size={20} /></span>
                        </div>
                        <span className="tooltip">Settings</span>
                    </button>
                </div>
            </div>
        </>
    )
}
