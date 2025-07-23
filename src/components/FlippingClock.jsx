import { useEffect, useState } from "react";

export const FlippingClock = ({ show }) => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      if (show) {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
      }
    }, [show]);
  
    const formatNumber = (num) => num.toString().padStart(2, '0');
  
    const hours = formatNumber(time.getHours() % 12 || 12);
    const minutes = formatNumber(time.getMinutes());
    const seconds = formatNumber(time.getSeconds());
  
    const FlipCard = ({ value, prevValue }) => (
      <div className="relative w-32 h-40 mx-2">
        <div className="absolute inset-0 bg-gray-800 rounded-lg shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gray-900 rounded-t-lg border-b border-gray-700 flex items-center justify-center overflow-hidden">
            <span className="text-6xl font-bold text-white select-none">{value}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-800 rounded-b-lg flex items-center justify-center overflow-hidden">
            <span className="text-6xl font-bold text-white select-none">{value}</span>
          </div>
        </div>
      </div>
    );
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center items-center mb-8">
            <FlipCard value={hours[0]} />
            <FlipCard value={hours[1]} />
            <div className="text-6xl text-white mx-4">:</div>
            <FlipCard value={minutes[0]} />
            <FlipCard value={minutes[1]} />
            <div className="text-6xl text-white mx-4">:</div>
            <FlipCard value={seconds[0]} />
            <FlipCard value={seconds[1]} />
          </div>
          <div className="text-2xl text-gray-400">
            {time.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    );
  };
  