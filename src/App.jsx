import { useState, useContext, createContext } from "react";
import { BadgePercent, Sparkle, Gem, Crown, ArrowRight } from "lucide-react";

const CheckboxContext = createContext();

function Checkbox({ children, ...props }) {
  const { selectedPlans, togglePlan } = useContext(CheckboxContext);
  return (
    <label className={`
      px-6 py-4 shadow rounded-lg cursor-pointer transition-all
      ${selectedPlans.includes(props.value) 
        ? "bg-gradient-to-t from-violet-200 to-violet-100 text-violet-800 shadow-violet-500 scale-105" 
        : "bg-white hover:shadow-md shadow-gray-300"
      }
    `}>
      <input 
        type="checkbox" 
        className="hidden" 
        checked={selectedPlans.includes(props.value)}
        onChange={() => togglePlan(props.value)} 
        {...props} 
      />
      {children}
    </label>
  );
}

function CheckboxGroup({ selectedPlans, onToggle, children }) {
  return (
    <CheckboxContext.Provider value={{ selectedPlans, togglePlan: onToggle }}>
      {children}
    </CheckboxContext.Provider>
  );
}

function Plan({ icon, title, features, price }) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{features.join(" · ")}</p>
      </div>
      <span className="ml-auto font-medium">${price}</span>
    </div>
  );
}

export default function App() {
  const [selectedPlans, setSelectedPlans] = useState([]);

  const togglePlan = (plan) => {
    setSelectedPlans(prev => 
      prev.includes(plan)
        ? prev.filter(p => p !== plan)
        : [...prev, plan]
    );
  };

  const getButtonText = () => {
    if (selectedPlans.length === 0) return "Select a plan";
    if (selectedPlans.length === 1) return `Proceed with ${selectedPlans[0]} plan`;
    return `Proceed with ${selectedPlans.length} plans`;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold tracking-tight">Choose Your Plans</h2>
      <hr className="my-3 w-56" />
      <CheckboxGroup selectedPlans={selectedPlans} onToggle={togglePlan}>
        <div className="flex gap-4 justify-center flex-col">
          <Checkbox value="Free">
            <Plan 
              icon={<BadgePercent />} 
              title="Free" 
              features={["SD (480p)", "Mobile", "Ads"]} 
              price={0}
            />
          </Checkbox>
          <Checkbox value="Basic">
            <Plan 
              icon={<Sparkle />} 
              title="Basic" 
              features={["HD (720p)", "Mobile", "Ads"]} 
              price={0}
            />
          </Checkbox>
          <Checkbox value="Standard">
            <Plan 
              icon={<Gem />} 
              title="Standard" 
              features={["SD (480p)", "Mobile", "Ads"]} 
              price={0}
            />
          </Checkbox>
          <Checkbox value="Premium">
            <Plan 
              icon={<Crown />} 
              title="Premium" 
              features={["SD (480p)", "Mobile", "Ads"]} 
              price={0}
            />
          </Checkbox>
        </div>
      </CheckboxGroup>
      <hr className="my-3 w-56" />
      <button 
        className={`
          flex gap-4 items-center px-6 py-3 rounded-lg 
          ${selectedPlans.length > 0 
            ? "bg-violet-800 hover:bg-violet-700" 
            : "bg-violet-400 cursor-not-allowed"
          }
          font-semibold text-lg text-white
        `}
        disabled={selectedPlans.length === 0}
      >
        {getButtonText()}
        <ArrowRight />
      </button>
    </main>
  );
}