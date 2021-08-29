import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { Component } from "react";
import Itinerary from "../models/Itinerary";
import ItineraryDetailsModal from "./ItineraryDetailsModal";
import ItinerarySearch from "../models/ItinerarySearch";
import { toTimeStr, toDateStr } from "../utilities/DateTimeUtilities";

// We use dayjs to help show times
dayjs.extend(duration);

export interface SearchResultItemProps {
    itinerary: Itinerary;
    select: () => void;
};

interface SearchResultItemState {
    modalShown: boolean
}

export default class SearchResultItem extends Component<SearchResultItemProps, SearchResultItemState> {
    constructor(props: SearchResultItemProps) {
        super(props);
        this.state = { modalShown: false };
    }

    override render() {
        return (
        <div className="box">
            <div className="columns is-vcentered">
                <div className="column is-7">
                    <div className="columns is-vcentered">
                        <div className="column is-5">
                            <div className="has-text-centered">
                                <div className="is-inline-block has-text-justified">
                                    <p className="has-text-weight-light is-uppercase is-size-7 pb-2">Departs</p>
                                    <p>
                                        <span className="is-size-1">
                                            {toTimeStr(this.props.itinerary.startDate)}
                                        </span>
                                    </p>
                                    <p className="is-size-7">
                                        {toDateStr(this.props.itinerary.startDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column is-2">
                            <ItineraryDetailsModal itinerary={this.props.itinerary} show={this.state.modalShown} onClose={ () => this.setState({ modalShown: false }) }/>
                            <div className="has-text-centered">
                                <span className="icon is-size-1"><i className="fas fa-long-arrow-alt-right"></i></span>
                                <p className="has-text-weight-light is-family-secondary is-size-7">
                                    {dayjs.duration(this.props.itinerary.duration).format("H[h] m[m]")}
                                </p>
                                <p className="has-text-weight-medium is-family-secondary is-size-7">
                                    {getTransferText(this.props.itinerary.numTransfers)}
                                </p>
                                <button className="button is-text has-text-weight-medium is-family-secondary is-size-7" onClick={_ => this.setState({modalShown: true}) }>Details</button>
                            </div>
                        </div>
                        <div className="column is-5">
                            <div className="has-text-centered">
                                <div className="is-inline-block has-text-justified">
                                    <p className="has-text-weight-light is-uppercase is-size-7 pb-2">Arrives</p>
                                    <p><span className="is-size-1">{toTimeStr(this.props.itinerary.endDate)}</span></p>
                                    <p className="is-size-7">{toDateStr(this.props.itinerary.endDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="has-text-centered is-size-1 has-text-weight-light pb-4">
                        $31
                </div>
                    <div className="buttons">
                        <button
                            className="button is-fullwidth is-primary has-text-weight-bold"
                            onClick={_ => this.props.select()} >
                            Add to Cart
                    </button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function getTransferText(numTransfers: number) {
    if (numTransfers === 0) {
        return "";
    }

    if (numTransfers === 1) {
        return "1 Transfer";
    }

    return `${numTransfers} Transfers`;
}