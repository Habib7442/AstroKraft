export type BirthDetails = {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
  cityName?: string;
};

export type PlanetPosition = {
  name: string;
  rashi: string;
  degree: number;
  house: number;
  retrograde: boolean;
};

export type DashaPhase = {
  lord: string;
  start: string;
  end: string;
  subPhases?: DashaPhase[];
};

export type KundliResult = {
  lagna: string;
  rashi: string;
  ascendantDegree: number;
  planets: PlanetPosition[];
  dashas: DashaPhase[];
};

export type GunaMilanScore = {
  name: string;
  score: number;
  max: number;
  description: string;
};

export type MatchingResult = {
  score: number;
  maxScore: number;
  compatibilityPercent: number;
  gunas: {
    varna: GunaMilanScore;
    vashya: GunaMilanScore;
    tara: GunaMilanScore;
    yoni: GunaMilanScore;
    maitri: GunaMilanScore;
    gana: GunaMilanScore;
    bhakoot: GunaMilanScore;
    nadi: GunaMilanScore;
  };
  manglikCompatible: boolean;
  p1Manglik: boolean;
  p2Manglik: boolean;
  verdict: {
    en: string;
    hin: string;
    bn: string;
  };
};
