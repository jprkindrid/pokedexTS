import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval)
  }


  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
      const cachedData: ShallowLocations | undefined = this.cache.get<any>(url)
      if (cachedData) {
      return cachedData
      }
    try {
      const resp = await fetch(url)

    if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
    }

    const locations: ShallowLocations = await resp.json();
    this.cache.add(url, locations)
    return locations
    } catch (err) {
    throw new Error(`Error fetching locations: ${(err as Error).message}`);
   }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const cachedData: Location | undefined = this.cache.get(locationName);
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    if (cachedData) {
      return cachedData
    }
      try {
          const resp = await fetch(url);
          if (!resp.ok) {
          throw new Error(`${resp.status} ${resp.statusText}`)
          }
          
          const location: Location = await resp.json();
          this.cache.add(locationName, location)
          return location
      } catch (err) {
          throw new Error (
              `Error fetching location '${locationName}': ${(err as Error).message}`
          );
    }
  }
}   

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};