import { useEffect, useState } from "react";


export const EditDockModal = ({ open, close, dockItem, onSave }) => {
    const [editData, setEditData] = useState({ name: '', address: '' });
  
    useEffect(() => {
      if (open && dockItem) {
        setEditData({ name: dockItem.name, address: dockItem.address });
      }
    }, [open, dockItem]);
  
    const handleChange = (e) => {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      onSave(editData);
      close();
    };
  
    if (!open) return null;
  
    return (
      <>
        <div className="fixed inset-0 z-[20] w-full h-full bg-black/90 overflow-hidden"></div>
        <div className="fixed z-[21] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Shortcut</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Facebook"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">URL</label>
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.facebook.com"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-3">Icon</label>
              <div className="flex gap-3">
                <button className="flex flex-col items-center gap-2 p-3 bg-blue-500 text-white rounded-xl">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">f</div>
                  <span className="text-xs">Logo</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-gray-500 text-white rounded-xl">
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs font-bold">F</div>
                  <span className="text-xs">Text</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-orange-500 text-white rounded-xl">
                  <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-xs">↑</div>
                  <span className="text-xs">Upload</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-green-500 text-white rounded-xl">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-xs">+</div>
                  <span className="text-xs">Create</span>
                </button>
              </div>
            </div>
          </div>
  
          <div className="flex gap-3 mt-8">
            <button
              onClick={close}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  };