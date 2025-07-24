import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export const SettingsModal = ({ open, close }) => {
  const [timeFormat, setTimeFormat] = useState('07:49:57 PM');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [openWebsite, setOpenWebsite] = useState('In the current tab');

  const colors = [
    '#000000', '#ef4444', '#f97316', '#eab308', '#22c55e',
    '#06b6d4', '#3b82f6'
  ];

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[20] w-full  bg-black/90 overflow-hidden"></div>
      <div className="fixed z-[21] top-1/2 left-1/2 h-[70vh] transform -translate-x-1/2 -translate-y-1/2 w-[700px] bg-white rounded-3xl overflow-hidden">

        {/* Sidebar */}
        <div className="flex w-full h-full">
          <div className="w-1/4 bg-gray-50 p-3 py-4 h-full border-r flex flex-col justify-between">
            <div className="space-y-2 text-sm">
              <button className="w-full text-left px-4 py-3 bg-blue-500 text-white rounded-xl">
                ⚙️ General
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-xl">
                🎨 Background
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-xl">
                💾 Screen Saver
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-xl">
                ❓ Get Help
              </button>
            </div>
            <div className="pt-4">
              <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm">
                🔄 Sign In / Sync
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="space-y-6">

              {/* Time Format */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🕐
                  </div>
                  <span className="font-medium text-gray-800">Time Format</span>
                </div>
                <select
                  value={timeFormat}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option>07:49:57 PM</option>
                  <option>19:49:57</option>
                  <option>7:49 PM</option>
                </select>
              </div>

              {/* Font Color */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🎨
                  </div>
                  <span className="font-medium text-gray-800">Font Color</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-gray-400' : 'border-transparent'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                  </button>
                </div>
              </div>


              {/* Import/Export */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      📥
                    </div>
                    <span className="font-medium text-gray-800">Import Settings</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Select File
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      📤
                    </div>
                    <span className="font-medium text-gray-800">Export Settings</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Download
                  </button>
                </div>
              </div>

              {/* Sign In */}

            </div>

          </div>
        </div>

      </div>
    </>
  );
};
