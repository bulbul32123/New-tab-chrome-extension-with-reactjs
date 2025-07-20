import DateOfBirth from "./components/DateOfBirth";
import { useEffect, useState } from "react";
import AnimatedNum from "./components/AnimatedNum";
import Docks from "./components/Docks";



function App() {
  const [isDateOfBirthModel, setIsDateOfBirthModel] = useState(false);
  const [ageData, setAgeData] = useState({ year: 0, month: 0, day: 0 });
  const [dobData, setDobData] = useState(null);
  const [yearProgress, setYearProgress] = useState(0);
  const [yearRemaining, setYearRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });


  function setDobToLocalStorage(data) {
    localStorage.setItem("dob", JSON.stringify(data));
  }
  function getMonthIndex(monthName) {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return months.indexOf(monthName);
  }

  function calculateAge(dob) {
    if (!dob || !dob.day || !dob.month || !dob.year) return { day: 0, month: 0, year: 0 };

    const monthIndex = getMonthIndex(dob.month);
    if (monthIndex === -1) return { day: 0, month: 0, year: 0 };

    const birthDate = new Date(dob.year, monthIndex, dob.day);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { day: days, month: months, year: years };
  }


  const GetDobToLocalStorage = async () => {
    const dobLocalData = await localStorage.getItem("dob")
    const parsed = JSON.parse(dobLocalData);
    setDobData(parsed);
    const age = calculateAge(parsed);
    setAgeData(age);

  }

  function setBirth(data) {
    setIsDateOfBirthModel(false)
    setDobToLocalStorage(data)
    GetDobToLocalStorage()
  }
  function calculateYearProgressAndRemaining() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const start = new Date(currentYear, 0, 1);
    const end = new Date(currentYear + 1, 0, 1);

    const totalMillis = end - start;
    const passedMillis = now - start;
    const remainingMillis = end - now;

    const percent = Math.floor((passedMillis / totalMillis) * 100)

    const remainingSeconds = Math.floor(remainingMillis / 1000);
    const seconds = remainingSeconds % 60;
    const minutes = Math.floor((remainingSeconds / 60)) % 60;
    const hours = Math.floor((remainingSeconds / 3600)) % 24;

    // Estimate months & days
    const daysRemaining = Math.floor(remainingMillis / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysRemaining / 30); // Approximate months
    const days = daysRemaining % 30;

    return {
      percent,
      remaining: { months, days, hours, minutes, seconds }
    };
  }


  useEffect(() => {
    const updateProgress = () => {
      const { percent, remaining } = calculateYearProgressAndRemaining();
      setYearProgress(percent);
      setYearRemaining(remaining);
    };
    updateProgress(); // set immediately

    const interval = setInterval(updateProgress, 1000); // update every second
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    GetDobToLocalStorage()
  }, [])



  return (
    <>
      <div className="container relative items-center">
        <div className="main-content">
          <div className="card">
            <div className="label">Progression of Year</div>
            <div className="year-progress-tab">
              <div className="value1">2025</div>
              <div className="percentage">
                <AnimatedNum value={yearProgress} className="value" />
                <span className="pers">%</span>
              </div>

              <div className="value1">2026</div>
            </div>
            <div className="progress-container">
              <div
                className="year-progress-bar"
                style={{ width: `${yearProgress}%` }}
              ></div>
            </div>
            <div className="remaining-time text-sm text-gray-300 mt-4 text-center">
              <AnimatedNum value={yearRemaining.months} /> months,{" "}
              <AnimatedNum value={yearRemaining.days} /> days,{" "}
              <AnimatedNum value={yearRemaining.hours} /> hr,{" "}
              <AnimatedNum value={yearRemaining.minutes} /> min and{" "}
              <AnimatedNum value={yearRemaining.seconds} /> sec left
            </div>

          </div>

          <div className="card">
            <div className="label">How Old Am I</div>
            <h3 className="you-r">You are</h3>
            <div className="row2">
              <div>
                <AnimatedNum value={ageData?.day} className="unit-block" />
                <span className="unit-block-span">days</span>
              </div>
              <div>
                <AnimatedNum value={ageData?.month} className="unit-block" />
                <span className="unit-block-span">months</span>
              </div>
              <div>
                <AnimatedNum value={ageData?.year} className="unit-block" />
                <span className="unit-block-span">years</span>
              </div>
            </div>

            <button onClick={() => setIsDateOfBirthModel((pre) => !pre)} className={`mt-8 bg-[#090114] py-1.5 text-white text-md font-light px-3 rounded-sm ${dobData ? "hidden" : "inline-block"}`}>
              Set Birthdate
            </button>
          </div>
        </div>
        <Docks />
        <DateOfBirth open={isDateOfBirthModel} setIt={setBirth} />
      </div >
    </>
  )
}

export default App
