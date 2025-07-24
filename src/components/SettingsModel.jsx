import { useState, useEffect } from "react";
import { IoClose, IoCheckmark, IoCloudUploadOutline } from "react-icons/io5";
import { 
  IoSettingsOutline, 
  IoImageOutline, 
  IoSaveOutline, 
  IoHelpCircleOutline,
  IoSparklesOutline,
  IoEyeOutline 
} from "react-icons/io5";

const WALLPAPERS = [
  {
    id: 1,
    name: "Ocean Wave",
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=225&fit=crop&crop=center",
    category: "nature"
  },
  {
    id: 2,
    name: "Sunset Gradient",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&crop=center",
    category: "abstract"
  },
  {
    id: 3,
    name: "Mountain Lake",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&crop=center",
    category: "nature"
  },
  {
    id: 4,
    name: "Blue Abstract",
    url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=225&fit=crop&crop=center",
    category: "abstract"
  },
  {
    id: 5,
    name: "Purple Flow",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=225&fit=crop&crop=center",
    category: "abstract"
  },
  {
    id: 6,
    name: "Dark Space",
    url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=225&fit=crop&crop=center",
    category: "space"
  },
  {
    id: 7,
    name: "Forest Path",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop&crop=center",
    category: "nature"
  },
  {
    id: 8,
    name: "City Lights",
    url: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=400&h=225&fit=crop&crop=center",
    category: "urban"
  },
  {
    id: 9,
    name: "Snow Mountain",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&crop=center",
    category: "nature"
  }
];

export const SettingsModal = ({ open, close }) => {
  const [activeTab, setActiveTab] = useState('General');
  const [blurValue, setBlurValue] = useState(0);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const tabs = [
    { id: 'General', icon: IoSettingsOutline, label: 'General' },
    { id: 'Background', icon: IoImageOutline, label: 'Background' },
    { id: 'Screen Saver', icon: IoEyeOutline, label: 'Screen Saver' },
    { id: 'Get Help', icon: IoHelpCircleOutline, label: 'Get Help' },
    { id: 'What\'s New', icon: IoSparklesOutline, label: 'What\'s New' }
  ];

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      // Load saved settings
      const savedBlur = localStorage.getItem('blurValue');
      const savedWallpaper = localStorage.getItem('selectedWallpaper');
      if (savedBlur) setBlurValue(parseInt(savedBlur));
      if (savedWallpaper) setSelectedWallpaper(JSON.parse(savedWallpaper));
    }
  }, [open]);

  const handleBlurChange = (value) => {
    setBlurValue(value);
    localStorage.setItem('blurValue', value.toString());
  };

  const handleWallpaperSelect = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    localStorage.setItem('selectedWallpaper', JSON.stringify(wallpaper));
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => close(), 200);
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <IoEyeOutline className="text-blue-600 dark:text-blue-400" size={16} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">Blur</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{blurValue}</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleBlurChange(Math.max(0, blurValue - 1))}
                className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm hover:bg-blue-700 transition-colors"
              >
                -
              </button>
              <button
                onClick={() => handleBlurChange(Math.min(10, blurValue + 1))}
                className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm hover:bg-blue-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackgroundTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Wallpaper</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
        {WALLPAPERS.map((wallpaper, index) => (
          <div
            key={wallpaper.id}
            className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
              selectedWallpaper?.id === wallpaper.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            style={{
              animationDelay: `${index * 50}ms`
            }}
            onClick={() => handleWallpaperSelect(wallpaper)}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
              <img
                src={wallpaper.url}
                alt={wallpaper.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {selectedWallpaper?.id === wallpaper.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <IoCheckmark className="text-white" size={14} />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-white text-xs font-medium truncate">{wallpaper.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <IoCloudUploadOutline className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Upload Image</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose your own wallpaper</p>
          </div>
          <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Select File
          </button>
        </div>
      </div>
    </div>
  );

  const renderScreenSaverTab = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <IoEyeOutline className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Screen Saver Settings</h3>
        <p className="text-gray-500 dark:text-gray-400">Configure your screen saver preferences</p>
      </div>
    </div>
  );

  const renderHelpTab = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <IoHelpCircleOutline className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Get Help</h3>
        <p className="text-gray-500 dark:text-gray-400">Need assistance? We're here to help!</p>
      </div>
    </div>
  );

  const renderWhatsNewTab = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <IoSparklesOutline className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">What's New</h3>
        <p className="text-gray-500 dark:text-gray-400">Check out the latest features and updates</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return renderGeneralTab();
      case 'Background':
        return renderBackgroundTab();
      case 'Screen Saver':
        return renderScreenSaverTab();
      case 'Get Help':
        return renderHelpTab();
      case 'What\'s New':
        return renderWhatsNewTab();
      default:
        return renderGeneralTab();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <Icon 
                          size={20} 
                          className={`transition-colors ${
                            activeTab === tab.id 
                              ? 'text-white' 
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                          }`} 
                        />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sign In Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                <IoSaveOutline size={20} />
                Sign In / Sync
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{activeTab}</h3>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <IoClose className="text-gray-600 dark:text-gray-400" size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};