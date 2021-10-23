import { useState, useEffect, useCallback } from "react";
import {
    getAirports,
    getAreas,
    getFlights,
    getHotels,
} from "../helpers/hotelsAndFlightsApi";

/**
 *
 * @param {object} data
 * @param {string} data.originCity
 * @param {string} data.originCountry
 * @param {string} data.city
 * @param {string} data.country
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
        getAreas(data.city)
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
                        const newHotels =
                            response.data.searchResults.results.map((hotel) => {
                                return {
                                    name: hotel.name,
                                    stars: hotel.starRating,
                                    address: hotel.address,
                                    price: hotel.ratePlan.price.exactCurrent,
                                };
                            });
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
            getAirports(data.city, data.country),
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
                        );
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
        data.country,
        data.city,
        data.startDate,
    ]);

    useEffect(() => {
        console.log(
            "shit i got called",
            data.originCity &&
                data.originCountry &&
                data.city &&
                data.country &&
                data.startDate
        );
        if (
            data.originCity &&
            data.originCountry &&
            data.city &&
            data.country &&
            data.startDate
        ) {
            getHotelsAndFlights();
        }
    }, [
        getHotelsAndFlights,
        data.originCity,
        data.originCountry,
        data.city,
        data.country,
        data.startDate,
    ]);

    return (
        <section id="searchBox">
            {/* <div>Flights: {JSON.stringify(flights)}</div>
            <div>Hotels: {JSON.stringify(hotels)}</div> */}
            {flights.map((flight) => (
                <div>
                    FLIGHT
                    <div>{flight.minPrice}</div>
                    <div>{flight.direct ? "DIRECT" : "INDIRECT"}</div>
                </div>
            ))}
            {hotels.map((hotel) => (
                <div>
                    <div>{hotel.name}</div>
                    <div>{hotel.stars}</div>
                    <div>{hotel.price}</div>
                </div>
            ))}
        </section>
    );
};

export default SearchBox;
