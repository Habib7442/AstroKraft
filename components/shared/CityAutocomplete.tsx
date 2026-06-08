"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type LocationResult = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country_code?: string;
  };
};

type CityAutocompleteProps = {
  placeholder?: string;
  onSelect: (location: {
    name: string;
    lat: number;
    lon: number;
    timezone: number;
  }) => void;
  onChangeName?: (name: string) => void;
  defaultValue?: string;
  className?: string;
};

export function CityAutocomplete({
  placeholder = "Search birth city...",
  onSelect,
  onChangeName,
  defaultValue = "",
  className,
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sync with defaultValue if it changes from external sources
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchCities = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "AstroKraft-App/1.0",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("[CityAutocomplete] Geocoding lookup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (onChangeName) {
      onChangeName(value);
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchCities(value);
    }, 500);
  };

  const handleSelectResult = (item: LocationResult) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    
    // Determine timezone approximation
    // India default: +5.5
    // Else, approximate timezone (15 degrees per hour)
    let timezone = 5.5; // Default to India/Kolkata
    
    const isIndia = item.display_name.toLowerCase().includes("india") || 
                    item.address?.country_code === "in";

    if (!isIndia) {
      // Estimate UTC offset (e.g. 75 degrees east is UTC+5)
      // Round to nearest 0.5 hours
      timezone = Math.round((lon / 15) * 2) / 2;
    }

    // Shorten display name for input field (e.g., "New Delhi, Delhi, India")
    const parts = item.display_name.split(", ");
    const shortName = parts.length > 2 
      ? `${parts[0]}, ${parts[1]}${parts[parts.length - 1] ? `, ${parts[parts.length - 1]}` : ""}`
      : item.display_name;

    setQuery(shortName);
    setIsOpen(false);
    onSelect({
      name: shortName,
      lat,
      lon,
      timezone,
    });
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-10"
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-gold"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-border bg-neutral-950/95 backdrop-blur-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer select-none px-4 py-2 text-foreground hover:bg-muted hover:text-gold transition-colors"
              onClick={() => handleSelectResult(item)}
            >
              <span className="block truncate font-medium">{item.display_name}</span>
              <span className="block text-xs text-muted-foreground">
                Lat: {parseFloat(item.lat).toFixed(4)}, Lon: {parseFloat(item.lon).toFixed(4)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
