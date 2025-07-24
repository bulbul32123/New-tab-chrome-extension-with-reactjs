import { useState, useEffect } from "react";
import { IoClose, IoSearch, IoLinkOutline, IoAppsOutline } from "react-icons/io5";
import { 
  IoStorefrontOutline, 
  IoGameControllerOutline, 
  IoHeartOutline, 
  IoAirplaneOutline, 
  IoNewspaperOutline,
  IoStarOutline,
  IoTextOutline,
  IoCloudUploadOutline,
  IoCameraOutline
} from "react-icons/io5";

// Popular apps data
const POPULAR_APPS = [
  { id: 1, name: "DJI", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/dji.png", url: "https://www.dji.com", category: "Technology" },
  { id: 2, name: "eBay", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ebay.png", url: "https://www.ebay.com", category: "Shopping" },
  { id: 3, name: "Amazon", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/amazon.png", url: "https://www.amazon.com", category: "Shopping" },
  { id: 4, name: "Flipkart", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/flipkart.png", url: "https://www.flipkart.com", category: "Shopping" },
  { id: 5, name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/cloudflare.png", url: "https://www.cloudflare.com", category: "Technology" },
  { id: 6, name: "Shopify", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/shopify.png", url: "https://www.shopify.com", category: "Shopping" },
  { id: 7, name: "BT", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/bt.png", url: "https://www.bt.com", category: "Technology" },
  { id: 8, name: "Best Buy", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/bestbuy.png", url: "https://www.bestbuy.com", category: "Shopping" },
  { id: 9, name: "Wanelo", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/wanelo.png", url: "https://wanelo.co", category: "Shopping" },
  { id: 10, name: "PlayStation", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/playstation.png", url: "https://www.playstation.com", category: "Entertainment" },
  { id: 11, name: "IKEA", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ikea.png", url: "https://www.ikea.com", category: "Shopping" },
  { id: 12, name: "H&M", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/hm.png", url: "https://www.hm.com", category: "Shopping" },
  { id: 13, name: "GoDaddy", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/godaddy.png", url: "https://www.godaddy.com", category: "Technology" },
  { id: 14, name: "Apple", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/apple.png", url: "https://www.apple.com", category: "Technology" },
  { id: 15, name: "Alibaba", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/alibaba.png", url: "https://www.alibaba.com", category: "Shopping" },
  { id: 16, name: "Costco", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/costco.png", url: "https://www.costco.com", category: "Shopping" },
  { id: 17, name: "Newegg", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/newegg.png", url: "https://www.newegg.com", category: "Technology" },
  { id: 18, name: "IBM Cloud", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ibm-cloud.png", url: "https://www.ibm.com/cloud", category: "Technology" },
  { id: 19, name: "Sephora", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/sephora.png", url: "https://www.sephora.com", category: "Lifestyle" },
  { id: 20, name: "Tesla", icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tesla.png", url: "https://www.tesla.com", category: "Technology" }
];

const WIDGET_APPS = [
  { id: 'search', name: "Search", icon: "https://via.placeholder.com/64/4285f4/ffffff?text=S", category: "Widgets", isWidget: true },
  { id: 'notes', name: "Notes", icon: "https://via.placeholder.com/64/ff9500/ffffff?text=N", category: "Widgets", isWidget: true },
  { id: 'clock', name: "Clock", icon: "https://via.placeholder.com/64/000000/ffffff?text=⏰", category: "Widgets", isWidget: true },
  { id: 'image', name: "Image", icon: "https://via.placeholder.com/64/ff69b4/ffffff?text=📸", category: "Widgets", isWidget: true },
  { id: 'chatai', name: "ChatAI", icon: "https://via.placeholder.com/64/000000/ffffff?text=✨", category: "Widgets", isWidget: true },
  { id: 'todo', name: "To Do", icon: "https://via.placeholder.com/64/007aff/ffffff?text=✓", category: "Widgets", isWidget: true },
  { id: 'habits', name: "Habits", icon: "https://via.placeholder.com/64/000000/ffffff?text=📊", category: "Widgets", isWidget: true }
];

const CATEGORIES = [
  { id: 'manual', icon: IoLinkOutline, label: 'Add manually', color: 'text-blue-600' },
  { id: 'widgets', icon: IoAppsOutline, label: 'Widgets', color: 'text-purple-600' },
  { id: 'popular', icon: IoStarOutline, label: 'Popular', color: 'text-yellow-600' },
  { id: 'shopping', icon: IoStorefrontOutline, label: 'Shopping', color: 'text-green-600' },
  { id: 'social', icon: IoHeartOutline, label: 'Social', color: 'text-pink-600' },
  { id: 'entertainment', icon: IoGameControllerOutline, label: 'Entertainment', color: 'text-red-600' },
  { id: 'lifestyle', icon: IoHeartOutline, label: 'Lifestyle', color: 'text-indigo-600' },
  { id: 'travel', icon: IoAirplaneOutline, label: 'Travel', color: 'text-cyan-600' },
  { id: 'news', icon: IoNewspaperOutline, label: 'News & Blogs', color: 'text-gray-600' }
];

const ICON_OPTIONS = [
  { id: 'logo', icon: IoStarOutline, label: 'Logo', color: 'bg-blue-500' },
  { id: 'text', icon: IoTextOutline, label: 'Text', color: 'bg-red-500' },
  { id: 'upload', icon: IoCloudUploadOutline, label: 'Upload', color: 'bg-orange-500' },
  { id: 'create', icon: IoCameraOutline, label: 'Create', color: 'bg-green-500' }
];

export const AddDocks = ({ open, close, setDockData }) => {
  const [activeCategory, setActiveCategory] = useState('manual');
  const [dockItems, setDockItems] = useState({ name: "", address: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIcon, setSelectedIcon] = useState('logo');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDockItems = (e) => {
    setDockItems({ ...dockItems, [e.target.name]: e.target.value });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      setDockItems({ name: "", address: "" });
      setSearchQuery("");
      setActiveCategory('manual');
      setSelectedIcon('logo');
    } else {
      setIsAnimating(false);
    }
  }, [open]);

  const handleAdd = () => {
    if (dockItems.name.trim() && dockItems.address.trim()) {
      setDockData("dockItems", dockItems);
      setDockItems({ name: "", address: "" });
    }
  };

  const handleAppSelect = (app) => {
    if (app.isWidget) {
      // Handle widget selection
      setDockData("dockItems", { name: app.name, address: `#widget-${app.id}`, isWidget: true });
    } else {
      setDockData("dockItems", { name: app.name, address: app.url });
    }
  };

  const handleCancel = () => {
    setDockItems({ name: "", address: "" });
    setIsAnimating(false);
    setTimeout(() => close(false), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && activeCategory === 'manual') {
      handleAdd();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getFilteredApps = () => {
    let apps = [];
    
    switch (activeCategory) {
      case 'widgets':
        apps = WIDGET_APPS;
        break;
      case 'popular':
        apps = POPULAR_APPS.slice(0, 20);
        break;
      case 'shopping':
        apps = POPULAR_APPS.filter(app => app.category === 'Shopping');
        break;
      case 'entertainment':
        apps = POPULAR_APPS.filter(app => app.category === 'Entertainment');
        break;
      case 'lifestyle':
        apps = POPULAR_APPS.filter(app => app.category === 'Lifestyle');
        break;
      default:
        apps = POPULAR_APPS;
    }

    if (searchQuery) {
      apps = apps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return apps;
  };

  const renderManualAdd = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={dockItems.name}
            onChange={handleDockItems}
            onKeyPress={handleKeyPress}
            placeholder="Enter name"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL Add
          </label>
          <input
            type="text"
            name="address"
            value={dockItems.address}
            onChange={handleDockItems}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Icon:
        </label>
        <div className="flex gap-3">
          {ICON_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedIcon(option.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                  selectedIcon === option.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-white`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAppGrid = () => {
    const apps = getFilteredApps();
    
    return (
      <div className="grid grid-cols-5 gap-4 max-h-80 overflow-y-auto">
        {apps.map((app, index) => (
          <div
            key={app.id}
            onClick={() => handleAppSelect(app)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group hover:scale-105"
            style={{
              animationDelay: `${index * 30}ms`
            }}
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <img
                src={app.icon}
                alt={app.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.src = `https://www.google.com/s2/favicons?domain=${app.url}&sz=64`;
                }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">
              {app.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Shortcut</h2>
            <button
              onClick={handleCancel}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <IoClose className="text-gray-600 dark:text-gray-400" size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search shortcut"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <nav className="p-4">
                <ul className="space-y-1">
                  {CATEGORIES.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                            activeCategory === category.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          style={{
                            animationDelay: `${index * 30}ms`
                          }}
                        >
                          <Icon 
                            size={16} 
                            className={activeCategory === category.id ? 'text-white' : category.color} 
                          />
                          <span className="font-medium">{category.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-6 overflow-y-auto">
                {activeCategory === 'manual' ? renderManualAdd() : renderAppGrid()}
              </div>

              {/* Footer - Only show for manual add */}
              {activeCategory === 'manual' && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                    >
                      <IoClose size={16} />
                      Cancel
                    </button>
                    <button
                      onClick={handleAdd}
                      disabled={!dockItems.name.trim() || !dockItems.address.trim()}
                      className={`flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 ${
                        !dockItems.name.trim() || !dockItems.address.trim()
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-blue-700 hover:scale-105 shadow-lg'
                      }`}
                    >
                      <IoStarOutline size={16} />
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};