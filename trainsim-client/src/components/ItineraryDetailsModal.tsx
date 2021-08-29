import Itinerary from "../models/Itinerary";
import React, { Component } from "react";
import ItinerarySearch from "../models/ItinerarySearch";
import { toTimeStr } from "../utilities/DateTimeUtilities";

interface ItineraryDetailsProps {
    itinerary: Itinerary
    show: boolean
    onClose: () => void
}

export default class ItineraryDetailsModal extends Component<ItineraryDetailsProps> {

    override render() {
        const legs = this.props.itinerary.legs.map(leg => {
            return (
            <section className="section">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-vcentered">
                            <div className="column is-5 item">
                                <h4 className="title is-4">
                                    {leg.places[0].stop.name}
                                </h4>
                                Departing at: {toTimeStr(leg.places[0].departAt)}
                            </div>
                            <div className="column is-2">
                                <span className="icon is-size-1 has-text-centered">
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                            <div className="column is-5 item">
                                <h4 className="title is-4">
                                    {leg.places[leg.places.length - 1].stop.name}
                                </h4>
                                Arriving at: {toTimeStr(leg.places[leg.places.length - 1].arriveAt)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            );
        });

        return <div className={this.props.show ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title has-text-weight-bold">{this.props.itinerary.start.stop?.name} <em className="has-text-weight-normal">to</em> {this.props.itinerary.end.stop?.name}</p>
                    <button className="delete" aria-label="close" onClick={_ => this.props.onClose()}></button>
                </header>
                <section className="modal-card-body">
                    {legs}
                </section>
            </div>
        </div>
    }
}