import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cachedData = this.cache.get(url);
        if (cachedData) {
            return cachedData;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations = await resp.json();
            this.cache.add(url, locations);
            return locations;
        }
        catch (err) {
            throw new Error(`Error fetching locations: ${err.message}`);
        }
    }
    async fetchLocation(locationName) {
        const cachedData = this.cache.get(locationName);
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        if (cachedData) {
            return cachedData;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const location = await resp.json();
            this.cache.add(locationName, location);
            return location;
        }
        catch (err) {
            throw new Error(`Error fetching location '${locationName}': ${err.message}`);
        }
    }
}
