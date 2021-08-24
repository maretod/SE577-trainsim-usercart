import Itinerary from "./Itinerary";

export default class Cart {
    private readonly _itineraries: Itinerary[];

    constructor() {
        this._itineraries = [];
    }

    public get getItineraries(): Itinerary[] {
        return this._itineraries;
    }

    public addItinerary(itinerary: Itinerary) {
        this._itineraries.push(itinerary);
    }
}