import { StopProvider } from "../providers/StopProvider";
import Stop from "./Stop";

export default class Place {
    private readonly _id: string;
    private readonly _stop: Stop;
    private readonly _arriveAt: Date;
    private readonly _departAt: Date;

    constructor(id: string, stop: Stop, arriveAt: Date, departAt: Date) {
        this._id = id;
        this._stop = stop;
        this._arriveAt = arriveAt;
        this._departAt = departAt;
    }

    public get id(): string {
        return this._id;
    }

    public get stop(): Stop {
        return this._stop;
    }

    public get arriveAt(): Date {
        return this._arriveAt;
    }
    
    public get departAt(): Date {
        return this._departAt;
    }
}