import { useState } from "react";

export const AddDocks = ({ open, close, setDockData }) => {
    const [dockItems, setDockItems] = useState({ name: "", address: "" });
  
    const handleDockItems = (e) => {
      setDockItems({ ...dockItems, [e.target.name]: e.target.value });
    };
  
    return (
      <>
        <div className={`fixed inset-0 z-[11] w-full h-full bg-black/90 overflow-hidden ${open ? "inline" : "hidden"}`}></div>
        <div className={`fixed z-[12] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] transition-all duration-200 ease-in-out rounded-2xl bg-[#72727258] text-white overflow-hidden ${open ? "h-72 py-4 px-5 opacity-100" : "h-0 opacity-0"}`}>
          <h5 className='mb-2 font-light text-lg mt-2'>Add Docks</h5>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <span className='text-sm text-gray-300 font-light py-1'>Name</span>
              <input type="text" className='border-none outline-none py-2 px-4 rounded-lg bg-black text-white' placeholder='Dock Name' name='name' value={dockItems.name} onChange={handleDockItems} />
            </div>
            <div className="w-full flex flex-col">
              <span className='text-sm text-gray-300 font-light py-1'>Dock Address</span>
              <input type="text" className='border-none outline-none py-2 px-4 rounded-lg bg-black text-white' placeholder='Dock Address' name='address' value={dockItems.address} onChange={handleDockItems} />
            </div>
          </div>
  
          <div className="flex justify-between">
            <button className='py-2 px-5 rounded-full text-sm mt-3 bg-black text-white' onClick={() => close(false)}>Cancel</button>
            <button className='py-2 px-5 rounded-full text-sm mt-3 bg-white text-black' onClick={() => setDockData("dockItems", dockItems)}>Add</button>
          </div>
        </div>
      </>
    );
  };