import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const CheckboxContext = createContext();

function Choice({ children, ...props }) {
  const { selectedItems, toggleItem } = useContext(CheckboxContext);
  return (
    <div
      onClick={() => toggleItem(props.value)}
      className={`
        cursor-pointer transition-all duration-300 ease-in-out
        p-6 rounded-xl text-center min-h-[100px] flex items-center justify-center
        backdrop-blur-md
        ${selectedItems.includes(props.value)
          ? "bg-gradient-to-r from-red-500/90 via-red-600/90 to-red-500/90 text-white shadow-lg shadow-red-200/50 scale-105"
          : "bg-gradient-to-r from-white/60 to-red-50/60 hover:to-red-100/60 text-gray-700 hover:text-red-800 shadow-lg hover:shadow-xl"
        }
        border border-white/20 max-w-2xl mx-auto w-full
      `}
    >
      <p className="font-medium text-lg">{children}</p>
    </div>
  );
}

function ChoiceGroup({ selectedItems, onToggle, children }) {
  return (
    <CheckboxContext.Provider value={{ selectedItems, toggleItem: onToggle }}>
      {children}
    </CheckboxContext.Provider>
  );
}

const questions = [
  "Visited Nirvana With Member Of Preferred Gender",
  "Waited In Front Of Memebr Of Preferred Gender Hostel",
  "Been In A Relationship In Thapar",
  "Dated A Senior",
  "Dated A Junior",
  "Dated A Person In Society",
  "Been Initmate With The Person In Society",
  "Been Blacked Out Drunk In Elevate/LA",
  "Had Sex in CSED",
  "Made Out At Library Back Stairs",
  "Made Out in Nirvana",
  "Gone Out On A Date on Mantu",
  "Gave A Lab Eval High/Drunk",
  "Smoked/Drank While In Lecture",
  "Made Out In Library CSED Lift",
  "Kisssed On Saturnalia",
  "Hooked Up At Saturnalia",
  "Had A Fling/Hookup With Member Of Preffered Gender From Another UNI, Visiting Due To An Event",
  "Had Sex With A PHD Student",
  "Dry Humped On A Skywalk",
  "Went On A Date Within 1st Month Of College",
  "Had An Auxi In First Year",
  "Had A Fling In Summer Sem",
  "Caught By A Guard Or Ashish Purohit While Intimate",
  "Did Something CRAZY in Lecture/Lab",
  "Went On A Date At TSLA's",
  "Made Out At TSLA's",
  "Had A Crush On A Biotech/TSLA Girl",
  "Had A House Party At Chandigarh",
  "Impromptu Plan To Kasoli",
  "Had A Hookup While Clubbing in Chd/Patiala",
  "Had A Hookup At LA",
  "Been Detained",
  "Made Out In B Block",
  "Had A Quickie In CSED Washroom",
  "Had A Quicki In JAGGI Washroom",
  "Recieved Oral on Campus",
  "Gave Oral on Campus",
  "Recieved Oral At Nirvana/Skywalk",
  "Gave Oral At Niravana/Skywalk",
  "Had Sex With Ms/Mr IZHAAR",
  "Had Sex/Made Out In OAT Washroom",
  "Had Sex/Made Out In CR Rooms",
  "Fondled With Homies Tits",
  "Hooked Up With Your Society Senior",
  "Hooked Up With Your Society Junior",
  "Went To Skywalk For The Sole Purpose Of Staring At Girls",
  "Have You Gone To Kasol, For The Purpose Of Weed",
  "Got Caught By Caretaker For Smoking/Alcohol",
  "Got Caught By Caretaker For Weed",
  "After MST Mandatory Party?",
  "Gave/Recieved Hickey In Nirvana",
  "Had Sex During Night Permi",
  "Had A Drink With Caretaker",
  "Saw Hurds High/Drunk",
  "Had A Sneak In Other Sex Hostel",
  "Have ou Ever Been Called To The DOSAA Office",
  "Made Out In LT",
  "Made Out In LT",
  "Ever Smoked Weed In Nature Park",
  "Ever Gone On An Elysian Date",
  "Held Hands During A Lecture",
  "Faked A Medical Report For An Exam/Eval",
  "Booked A Hotel In Patiala",
  "Had Intimacy With Same Sex in Hostel",
  "Got Judged By Mangla Aunty",
  "Wrapchik Date",
  "JAGGI Coffee Date",
  "Hooked Up With A PECFEST Chick",
  ".",
  "Gone To Vakhra For Sutta",
  "TSLA's 1st Floor Makeout",
  "Admitted To Manipal Hospital",
  "Auxi In Every Sem",
  "Attended Some Else Class Cuz You Liked Member Of Preferred Gender",
  "Ever Gone On Rooftop Of Faculty Residential Area",
  "Lap Dance In Hostel",
  "Been Beaten On Birthday",
  "Beaten Someone On Birthday",
  "JAGGI Coffee Drink",
  "Aura Down, Entry Lock Not Open",
  "Late Entry College",
  "Sneaked In On Another Years TFF",
  "Got Fucked In The Ass By Maths-1",
  "Thought Of Applying As During Placements",
  "Made Out At A FROSH Event",
  "Hostel-J",
  "Auditorium",
  "Kabir",
  "La Pino's Monster Pizaa",
  "TSE Trip",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
].map((text, index) => ({ id: index + 1, text }));

export default function Questions() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const toggleItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCalculateScore = () => {
    const score = 100 - selectedItems.length;
    navigate(`/results?score=${score}`);
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,0,0,0.1),rgba(255,255,255,0)_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,0,0.05),rgba(255,255,255,0)_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text mb-4">
            Thapar Purity Test
          </h1>
          <br />
          <h2 className="text-gray-600 text-lg">Caution: This is not a bucket list. Completion of all items on this test will likely result in expulsion.</h2>
          <br />
          <p className="text-gray-600 text-lg">Select all that apply to you</p>
        </div>

        <ChoiceGroup selectedItems={selectedItems} onToggle={toggleItem}>
          <div className="flex flex-col space-y-4">
            {questions.map((question) => (
              <Choice key={question.id} value={question.id}>
                {question.text}
              </Choice>
            ))}
          </div>
        </ChoiceGroup>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={handleCalculateScore}
            className="
              px-12 py-4 rounded-xl font-semibold text-lg
              bg-gradient-to-r from-red-600/90 to-red-800/90 
              hover:from-red-700/90 hover:to-red-900/90
              text-white shadow-lg shadow-red-200/50
              transform transition-all duration-300
              hover:scale-105 hover:shadow-xl
              backdrop-blur-md border border-white/20
            "
          >
            Calculate My Score
          </button>
        </div>
      </div>
    </main>
  );
}