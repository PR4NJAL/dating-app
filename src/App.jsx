import { useState } from "react";
import Radio, { RadioGroup } from "./Radio";
import { BadgePercent, Sparkle, Gem, Crown, ArrowRight } from "lucide-react";
import "./App.css";


export default function App() {
  const [plan, setPlan] = useState("");
  return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold tracking-tight"> Choose Your Plan</h2>
        <hr className="my-3 w-56" />
        <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
          <div className="flex gap-4 justify-center flex-col">
            <Radio value="Free">
              <Plan icon={<BadgePercent />} title="Free" features={["SD (480p)", "Mobile", "Ads"]} price={0}/>
            </Radio>
            <Radio value="Basic">
              <Plan icon={<Sparkle />} title="Basic" features={["HD (720p)", "Mobile", "Ads"]} price={0}/>
            </Radio>
            <Radio value="Standard">
              <Plan icon={<Gem />} title="Standard" features={["SD (480p)", "Mobile", "Ads"]} price={0}/>
            </Radio>
            <Radio value="Premium">
              <Plan icon={<Crown />} title="Premium" features={["SD (480p)", "Mobile", "Ads"]} price={0}/>
            </Radio>
          </div>
        </RadioGroup>
        <hr className="my-3 w-56" />
        <button className={`
          flex gap-4 items-center px-6 py-3 rounded-lg bg-violet-800 hover:bg-violet-700 font-semibold text-lg text-white
          `}
        >
            Proceed with {plan} plan
            <ArrowRight />
        </button>
      </main>
  )
}

function Plan({icon, title, features, price}) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{features.join(" . ")}</p>
      </div>
      <span className="ml-auto font-medium">${price}</span>
    </div>
  )
}