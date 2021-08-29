import Stop from "../models/Stop";

export class StopProvider {
    private stops?: Stop[];

    fetchStops(callback: (stops: Stop[]) => void) {
        if (this.stops) {
            callback(this.stops);
            return;
        }

        fetch("/api/itinerary/stops")
            .then(res => res.json())
            .then(res => res as StopDto[])
            .then(res => res.map(dto => new Stop(dto.stop_id, dto.otpId, dto.name)))
            .then(res => this.stops = res)
            .then(res => callback(res));
    }

    fetchStop(stopId: string): Stop {
        let stop: Stop = new Stop(-1, "", "");
        if(this.stops == undefined)
            return stop;
        
        for(let i = 0; i < this.stops?.length; i++)
            if(stopId === this.stops[i].otpId)
                stop = this.stops[i];

        return stop;
    }
}

interface StopDto {
    stop_id: number;
    otpId: string;
    name: string;
};