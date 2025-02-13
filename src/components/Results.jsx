import { useSearchParams } from "react-router-dom";

export default function Results() {
  const [searchParams] = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");

  const getMessage = (score) => {
    if (score > 90) return { text: "Pure as fresh snow ❄️", description: "You're maintaining quite an impressive level of purity! Your innocence is refreshing in these times." };
    if (score > 70) return { text: "Mostly innocent 😇", description: "You've had your share of adventures while keeping things mostly clean!" };
    if (score > 50) return { text: "Living life to the fullest 🌟", description: "You've experienced quite a bit of what college life has to offer!" };
    return { text: "You've seen it all 😎", description: "You're practically a legend at this point. Your stories must be interesting!" };
  };

  const message = getMessage(score);

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,0,0,0.1),rgba(255,255,255,0)_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,0,0.05),rgba(255,255,255,0)_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-red-600/90 to-red-800/90 text-white text-center backdrop-blur-md border border-white/20">
            <h2 className="text-4xl font-bold mb-8">Your Purity Score</h2>
            <div className="text-9xl font-bold mb-6">{score}%</div>
            <p className="text-3xl font-semibold mb-4">{message.text}</p>
            <p className="text-xl opacity-90">{message.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}