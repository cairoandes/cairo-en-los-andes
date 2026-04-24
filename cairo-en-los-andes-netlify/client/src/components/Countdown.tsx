import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { countdownLabels } from "@/lib/translations";

const TARGET = new Date("2026-10-16T09:00:00-03:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const { lang } = useLang();
  const labels = countdownLabels(lang);
  const [diff, setDiff] = useState(TARGET - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const units = [
    { label: labels.days, value: days },
    { label: labels.hours, value: hours },
    { label: labels.min, value: minutes },
    { label: labels.sec, value: seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]"
        >
          <div className="relative bg-[#0d1230]/80 border border-[#d4a843]/30 rounded-lg px-3 py-3 sm:px-5 sm:py-4 gold-glow">
            <span className="font-heading text-2xl sm:text-4xl font-bold gold-text tabular-nums">
              {pad(u.value)}
            </span>
          </div>
          <span className="mt-2 text-xs sm:text-sm text-[#faf5eb]/60 uppercase tracking-widest">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
