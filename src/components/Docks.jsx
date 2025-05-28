import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import AddDocks from './AddDocks'

export default function Docks() {
    const [openAddDockModel, setOpenAddDockModel] = useState(false);
    const [docks, setDocks] = useState([]);

    const GetDobToLocalStorage = async () => {
        const docksData = await localStorage.getItem("dockItems")
        const parsed = JSON.parse(docksData);
        setDocks(parsed)
    }
    function setDocksToLocalStorage(key, newItem) {
        const existing = JSON.parse(localStorage.getItem(key)) || [];
        existing.push(newItem);
        localStorage.setItem(key, JSON.stringify(existing));
        setOpenAddDockModel(false)
        GetDobToLocalStorage()
    }
    useEffect(() => {
        GetDobToLocalStorage()
    }, [])
    return (
        <>
            <AddDocks open={openAddDockModel} close={setOpenAddDockModel} setDockData={setDocksToLocalStorage} />
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
