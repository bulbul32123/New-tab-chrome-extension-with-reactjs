import { useState, useEffect } from "react";

export const AddDocks = ({ open, close, setDockData }) => {
    const [dockItems, setDockItems] = useState({ name: "", address: "" });
  
    const handleDockItems = (e) => {
      setDockItems({ ...dockItems, [e.target.name]: e.target.value });
    };

    // Reset input values when modal opens
    useEffect(() => {
        if (open) {
            setDockItems({ name: "", address: "" });
        }
    }, [open]);

    const handleAdd = () => {
        if (dockItems.name.trim() && dockItems.address.trim()) {
            setDockData("dockItems", dockItems);
            // Reset the form after successful addition
            setDockItems({ name: "", address: "" });
        }
    };

    const handleCancel = () => {
        // Reset form when canceling
        setDockItems({ name: "", address: "" });
        close(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };
  
    return (
      <>
        <div className={`fixed inset-0 z-[11] w-full h-full bg-black/90 overflow-hidden transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
        <div className={`fixed z-[12] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] transition-all duration-300 ease-out rounded-2xl bg-[#72727258] backdrop-blur-sm text-white overflow-hidden ${open ? "h-72 py-4 px-5 opacity-100 scale-100" : "h-0 opacity-0 scale-95 pointer-events-none"}`}>
          <h5 className='mb-2 font-light text-lg mt-2'>Add Docks</h5>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <span className='text-sm text-gray-300 font-light py-1'>Name</span>
              <input 
                type="text" 
                className='border-none outline-none py-2 px-4 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200' 
                placeholder='Dock Name' 
                name='name' 
                value={dockItems.name} 
                onChange={handleDockItems}
                onKeyPress={handleKeyPress}
                autoFocus={open}
              />
            </div>
            <div className="w-full flex flex-col">
              <span className='text-sm text-gray-300 font-light py-1'>Dock Address</span>
              <input 
                type="text" 
                className='border-none outline-none py-2 px-4 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200' 
                placeholder='https://example.com' 
                name='address' 
                value={dockItems.address} 
                onChange={handleDockItems}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
  
          <div className="flex justify-between mt-6">
            <button 
              className='py-2 px-5 rounded-full text-sm bg-black text-white hover:bg-gray-800 transition-colors duration-200' 
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className={`py-2 px-5 rounded-full text-sm bg-white text-black hover:bg-gray-100 transition-all duration-200 ${
                !dockItems.name.trim() || !dockItems.address.trim() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105'
              }`}
              onClick={handleAdd}
              disabled={!dockItems.name.trim() || !dockItems.address.trim()}
            >
              Add
            </button>
          </div>
        </div>
      </>
    );
};