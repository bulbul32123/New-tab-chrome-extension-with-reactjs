import React, { useState } from 'react'

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);


export default function DateOfBirth({ open, setIt }) {
    const [dob, setDob] = useState({ month: "", day: "", year: "" });

    const handleChange = (e) => {
        setDob({ ...dob, [e.target.name]: e.target.value });
    };
    
    return (
        <>
            <div className={`fixed z-[12] transition-all duration-300 ease-in-out w-96 bg-[#464545] text-white ${!open && "z-[12] hidden"} h-[13rem] rounded-2xl py-8 px-5`}>
                <label className="block text-lg font-bold mb-1">
                    Birthday
                </label>
                <label className="block text-sm font-light">Choose a preferred birthday</label>
                <div className="flex gap-3 mt-3">
                    <div className="relative w-full">
                        <select
                            name="month"
                            value={dob.month}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                        >
                            <option value="" disabled>Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative w-full">
                        <select
                            name="day"
                            value={dob.day}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                        >
                            <option value="" disabled>Day</option>
                            {days.map((day, index) => (
                                <option key={index} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative w-full">
                        <select
                            name="year"
                            value={dob.year}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                        >
                            <option value="" disabled>Year</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <button className='py-1 rounded-md px-4 mt-3 bg-white text-black' onClick={() => setIt(dob)}>Set it</button>
            </div>
        </>
    )
}
