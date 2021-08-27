import Itinerary from "../models/Itinerary";
import ItinerarySearch from "../models/ItinerarySearch";
import Leg from "../models/Leg";
import Place from "../models/Place";
import SearchResult from "../models/SearchResult";
import { StopProvider } from "./StopProvider";

export default class ItineraryProvider {
    private _stopProvider: StopProvider;

    constructor(stopProvider: StopProvider) {
        this._stopProvider = stopProvider;
    }

    fetchItineraries(search: ItinerarySearch, callback: (itineraries: SearchResult) => void) {

        fetch("/api/itinerary/query", { method: "POST", body: search.toJson() })
            .then(res => res.json())
            .then(res => res as SearchResultDto)
            .then(res => fromSearchResultDto(res, this._stopProvider))
            .then(res => callback(res));
    }
}

function fromSearchResultDto(dto: SearchResultDto, stopProvider: StopProvider) {
    return new SearchResult(dto.outboundItineraries.map(i => fromItineraryDto(i, stopProvider)), dto.returnItineraries.map(i => fromItineraryDto(i, stopProvider)));
}

function fromItineraryDto(dto: ItineraryDto, stopProvider: StopProvider) {
    return new Itinerary(dto.id, dto.legs.map(l => fromLegDto(l, stopProvider)));
}

function fromLegDto(dto: LegDto, stopProvider: StopProvider) {
    const places = dto.places.map(p => fromPlaceDto(p, stopProvider));

    // Another way to do this would be to have a "WalkingLeg" and a "TransitLeg" class
    if (dto.routeId === undefined) {
        return Leg.walk(dto.id, dto.distance, places);
    }

    return Leg.transit(dto.id, dto.routeId, dto.distance, places);
}

function fromPlaceDto(dto: PlaceDto, stopProvider: StopProvider) {
    const stop = stopProvider.fetchStop(dto.stopId);

    return new Place(dto.id, stop, new Date(dto.arriveAt), new Date(dto.departAt));
}

interface SearchResultDto {
    outboundItineraries: ItineraryDto[];
    returnItineraries: ItineraryDto[];
}

interface ItineraryDto
{
    id: string;
    legs: LegDto[];
}

interface LegDto
{
    id: string;
    routeId?: string;
    distance: number;
    places: PlaceDto[];
}

interface PlaceDto
{
    id: string;
    stopId: string;
    arriveAt: number;
    departAt: number;
}