import { IoSettingsSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";



function App() {

  return (
    <div className="container">
      <div className="main-content">
        <div className="card">
          <div className="label">Progression of Year</div>
          <div className="year-progress-tab">
            <div className="value1" id="">2025</div>
            <div className="percentage">
              <div className="value" id="yearProgress">0%</div>
              <span className="pers">%</span>
            </div>
            <div className="value1" id="">2026</div>
          </div>
          <div className="progress-container">
            <div
              className="year-progress-bar"
              id="progressBar"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="row" id="remainingTime"></div>
        </div>

        <div className="card">
          <div className="label">How Old Am I</div>
          <h3 className="you-r">You are</h3>
          <div className="row2">
            <div className="unit-block">
              <div className="unit" id="daysOld">0</div>
              <span>days</span>
            </div>
            <div className="unit-block">
              <div className="unit" id="monthsOld">0</div>
              <span>months</span>
            </div>
            <div className="unit-block">
              <div className="unit" id="yearsOld">0</div>
              <span>years</span>
            </div>
          </div>

          <button id="ageModelBtn">
            Set My Birthdate
          </button>
        </div>

        <div className="modal" id="ageModal">
          <div className="modal-content">
            <h3>Enter Your Birthdate</h3>
            <input type="date" id="birthInput" />
            <button >Save</button>
          </div>
        </div>
      </div>
      <div className="dock">
        <div className="dock-container">
          <div className="dock-divider"></div>
          <a href="#" className="dock-item add-dock-item">
            <div className="dock-icon">
              <span><IoMdAdd size={20} /></span>
            </div>
            <span className="tooltip">Add</span>
          </a>
          <a href="#" className="dock-item" id="settings-icon">
            <div className="dock-icon">
              <span><IoSettingsSharp size={20} /></span>
            </div>
            <span className="tooltip">Settings</span>
          </a>
        </div>
      </div>
    </div>

  )
}

export default App
