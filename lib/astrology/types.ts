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

export type PanchangPeriod = {
  start: string;
  end: string;
};

export type PanchangTimePeriod = {
  id: number;
  name: string;
  type: string;
  period: PanchangPeriod[];
};

export type PanchangAttribute = {
  id: number;
  name: string;
  start: string;
  end: string;
  lord?: {
    id: number;
    name: string;
    vedic_name: string;
  };
  paksha?: string;
  index?: number;
};

export type PanchangResult = {
  vaara: string;
  nakshatra: PanchangAttribute[];
  tithi: PanchangAttribute[];
  karana: PanchangAttribute[];
  yoga: PanchangAttribute[];
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  auspicious_period: PanchangTimePeriod[];
  inauspicious_period: PanchangTimePeriod[];
};

