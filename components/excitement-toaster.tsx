"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Compass } from "lucide-react";

const NAMES = [
  "Rahul", "Priya", "Vikram", "Ananya", "Amit", "Sneha", "Rajesh", "Kiran",
  "Aditya", "Neha", "Sanjay", "Deepika", "Rohan", "Pooja", "Arjun", "Kriti",
  "Dev", "Riya", "Karan", "Tanvi", "Siddharth", "Ishita", "Abhishek", "Shreya"
];

const LOCATIONS = [
  "Mumbai", "Delhi", "Kolkata", "Bengaluru", "Chennai", "Hyderabad",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Silchar", "Guwahati",
  "Patna", "Indore", "Chandigarh", "Dehradun", "Kochi", "Bhopal"
];

const ASTROLOGERS = [
  "Acharya Bhakta Vedanta",
  "Biprangshu Bhattacharjee",
  "Acharya Abhi Shastri",
  "Acharya Sneha",
  "Astrologer Indrajit Dutta",
  "Rishi Acharya"
];

const ACTIONS = [
  (name: string, loc: string) => `${name} from ${loc} joined AstroKraft!`,
  (name: string, loc: string) => `${name} from ${loc} consulted ${getRandomItem(ASTROLOGERS)}!`,
  (name: string, loc: string) => `${name} from ${loc} checked their daily horoscope.`,
  (name: string, loc: string) => `${name} from ${loc} calculated their Kundli match.`,
  (name: string, loc: string) => `${name} from ${loc} booked a gemstone consultation.`,
  (name: string, loc: string) => `${name} from ${loc} asked a Horary question.`,
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function ExcitementToaster() {
  useEffect(() => {
    // Show first excitement toast after 6 seconds to welcome the user softly
    const initialTimer = setTimeout(() => {
      triggerExcitementToast();
    }, 6000);

    // Then trigger every 60 seconds
    const interval = setInterval(() => {
      triggerExcitementToast();
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const triggerExcitementToast = () => {
    const name = getRandomItem(NAMES);
    const loc = getRandomItem(LOCATIONS);
    const actionCreator = getRandomItem(ACTIONS);
    const message = actionCreator(name, loc);

    toast(
      <div className="flex flex-col gap-1 pr-4">
        <span className="text-xs sm:text-sm font-extrabold text-black leading-snug">
          {message}
        </span>
        <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest select-none">
          Live AstroKraft Activity
        </span>
      </div>,
      {
        icon: <Compass className="w-4 h-4 text-[#FFC000] animate-pulse shrink-0 mt-0.5" />,
        duration: 4000,
        className: "border-2 border-black bg-white text-black rounded-xl shadow-[3px_3px_0px_#000] p-4 flex items-start gap-3",
      }
    );
  };

  return null;
}
