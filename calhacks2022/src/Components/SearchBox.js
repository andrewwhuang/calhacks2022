import "../SearchBox.css";
import { useState, useEffect, useCallback } from "react";
import {
    getAirports,
    getAreas,
    getFlights,
    getHotels,
} from "../helpers/hotelsAndFlightsApi";

const MAX_NUM_HOTEL_RESULTS = 3;
const MAX_NUM_FLIGHT_RESULTS = 3;

/**
 *
 * @param {object} data
 * @param {string} data.originCity
 * @param {string} data.originCountry
 * @param {string} data.destCity
 * @param {string} data.destCountry
 * @param {string} data.startDate
 * @param {string} [data.endDate]
 * @returns
 */
const SearchBox = ({ data }) => {
    const [hotels, setHotels] = useState([]);
    const [flights, setFlights] = useState([]);

    // Function for making API calls and saving to state
    const getHotelsAndFlights = useCallback(() => {
        // Get destination ID for Hotel request
        getAreas(data.destCity)
            .then((response) => {
                // Hotel request
                getHotels(
                    response.data.suggestions[0].entities[0].destinationId,
                    1
                )
                    .then((response) => {
                        console.log(
                            "HOTELS",
                            response.data.searchResults.results
                        );
                        const newHotels = response.data.searchResults.results
                            .map((hotel) => {
                                return {
                                    name: hotel.name,
                                    stars: hotel.starRating,
                                    address: hotel.address,
                                    price: hotel.ratePlan.price.exactCurrent,
                                };
                            })
                            .filter((_, i) => i < MAX_NUM_HOTEL_RESULTS);
                        setHotels(newHotels);
                    })
                    .catch((error) =>
                        console.error("getHotels() ERROR", error)
                    );
            })
            .catch((error) => console.error("getAreas() ERROR", error));

        // Get nearest airport
        Promise.all([
            getAirports(data.originCity, data.originCountry),
            getAirports(data.destCity, data.destCountry),
        ])
            .then((responses) => {
                const originData = responses[0].data;
                const destData = responses[1].data;
                getFlights(
                    originData.Places[0].PlaceId,
                    destData.Places[0].PlaceId,
                    data.startDate
                )
                    .then((response) => {
                        console.log("FLIGHTS", response.data.Quotes);
                        const newFlights = response.data.Quotes.map(
                            (flight) => {
                                return {
                                    minPrice: flight.MinPrice,
                                    direct: flight.Direct,
                                };
                            }
                        ).filter((_, i) => i < MAX_NUM_FLIGHT_RESULTS);
                        newFlights.forEach((flight, i) => {
                            const carrierId =
                                response.data.Quotes[i].OutboundLeg
                                    .CarrierIds[0];
                            flight.carrier = response.data.Carriers.find(
                                (carrier) => carrier.CarrierId === carrierId
                            ).Name;
                        });
                        setFlights(newFlights);
                    })
                    .catch((error) =>
                        console.error("getFlights() ERROR", error)
                    );
            })
            .catch((error) => console.error("getAirports() ERROR", error));
    }, [
        data.originCity,
        data.originCountry,
        data.destCountry,
        data.destCity,
        data.startDate,
    ]);

    useEffect(() => {
        console.log(
            "shit i got called",
            data.originCity &&
                data.originCountry &&
                data.destCity &&
                data.destCountry &&
                data.startDate
        );
        if (
            data.originCity &&
            data.originCountry &&
            data.destCity &&
            data.destCountry &&
            data.startDate
        ) {
            getHotelsAndFlights();
        }
    }, [
        getHotelsAndFlights,
        data.originCity,
        data.originCountry,
        data.destCity,
        data.destCountry,
        data.startDate,
    ]);

    return (
        <section id="searchBox" className="searchBox">
            <div className="title">FLIGHTS</div>
            {flights.map((flight) => (
                <div className="result">
                    <div>{flight.minPrice}</div>
                    <div>{flight.direct ? "DIRECT" : "INDIRECT"}</div>
                    <div>{flight.carrier}</div>
                </div>
            ))}
            <div className="title">HOTELS</div>
            {hotels.map((hotel) => (
                <div className="result">
                    <div>{hotel.name}</div>
                    <div>{hotel.stars}</div>
                    <div>{hotel.price}</div>
                </div>
            ))}
        </section>
    );
};

export default SearchBox;
