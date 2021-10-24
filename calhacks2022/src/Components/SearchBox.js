import "../SearchBox.css";
import { useState, useEffect, useCallback } from "react";
import {
  getAirports,
  getFlights,
  getHotelsByLatLong,
} from "../helpers/hotelsAndFlightsApi";
import ReactStars from "react-rating-stars-component";

const MAX_NUM_HOTEL_RESULTS = 10;
const MAX_NUM_FLIGHT_RESULTS = 3;

const presetAirlines = [
  "JetBlue",
  "United Airlines",
  "Air Canada",
  "Delta Air Lines",
  "Spirit Airlines",
  "American Airlines",
];
/**
 *
 * @param {object} data
 * @param {string} data.originState
 * @param {string} data.originCountry
 * @param {string} data.destState
 * @param {string} data.destCountry
 * @param {string} data.startDate
 * @param {string} data.endDate
 * @param {string} data.currency
 * @returns
 */
const SearchBox = ({ data }) => {
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);

  const setFakeFlights = useCallback(() => {
    setFlights([
      {
        minPrice: Math.floor((Math.random() * 50 + 300) * 100) / 100,
        direct: Math.random() < 0.5,
        carrier:
          presetAirlines[Math.floor(Math.random() * presetAirlines.length)],
      },
      {
        minPrice: Math.floor((Math.random() * 100 + 400) * 100) / 100,
        direct: Math.random() < 0.5,
        carrier:
          presetAirlines[Math.floor(Math.random() * presetAirlines.length)],
      },
    ]);
  }, []);
  // Function for making API calls and saving to state
  const getHotelsAndFlights = useCallback(() => {
    getHotelsByLatLong(
      data.destLat,
      data.destLng,
      data.startDate,
      data.endDate,
      data.currency
    )
      .then((response) => {
        console.log("HOTELS", response.data.searchResults.results);
        const newHotels = response.data.searchResults.results
          .map((hotel) => {
            return {
              name: hotel.name,
              stars: hotel.starRating,
              address: hotel.address,
              price: hotel.ratePlan.price.exactCurrent,
              imgLink: hotel.optimizedThumbUrls.srpDesktop,
            };
          })
          .filter((_, i) => i < MAX_NUM_HOTEL_RESULTS);
        setHotels(newHotels);
      })
      .catch((error) => console.error("getHotelsByLatLong() ERROR", error));

    // Get nearest airport
    Promise.all([
      getAirports(data.originState, data.originCountry),
      getAirports(data.destState, data.destCountry),
    ])
      .then((responses) => {
        const originData = responses[0].data;
        const destData = responses[1].data;
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
          getFlights(
            originData.Places[0].PlaceId,
            destData.Places[0].PlaceId,
            data.startDate,
            data.currency
          )
            .then((response) => {
              console.log("FLIGHTS", response.data.Quotes);
              const newFlights = response.data.Quotes.map((flight) => {
                return {
                  minPrice: flight.MinPrice,
                  direct: flight.Direct,
                };
              }).filter((_, i) => i < MAX_NUM_FLIGHT_RESULTS);
              newFlights.forEach((flight, i) => {
                const carrierId =
                  response.data.Quotes[i].OutboundLeg.CarrierIds[0];
                flight.carrier = response.data.Carriers.find(
                  (carrier) => carrier.CarrierId === carrierId
                ).Name;
              });
              setFlights(newFlights);
            })
            .catch((error) => {
              console.error("getFlights() ERROR", error);
              setFakeFlights();
            });
        });
      })
      .catch((error) => {
        console.error("getAirports() ERROR", error);
        setFakeFlights();
      });
  }, [
    data.destLat,
    data.destLng,
    data.originState,
    data.originCountry,
    data.destCountry,
    data.destState,
    data.startDate,
    data.endDate,
    data.currency,
    setFakeFlights,
  ]);

  useEffect(() => {
    const doReload =
      data.originState &&
      data.originState !== "" &&
      data.originCountry &&
      data.originCountry !== "" &&
      data.destState &&
      data.destState !== "" &&
      data.destCountry &&
      data.destCountry !== "" &&
      data.startDate &&
      data.startDate !== "" &&
      data.endDate &&
      data.endDate !== "";
    console.log(
      "shit i got called",
      data.originState,
      data.originCountry,
      data.destState,
      data.destCountry,
      data.startDate,
      data.endDate,
      "RELOAD?",
      doReload
    );
    if (doReload) {
      getHotelsAndFlights();
    }
  }, [
    getHotelsAndFlights,
    data.originState,
    data.originCountry,
    data.destState,
    data.destCountry,
    data.startDate,
    data.endDate,
    data.currency,
  ]);

  return (
    <div className="searchBoxOut">
      <div className="title">RESULTS</div>
      <section id="searchBox" className="searchBox">
        {hotels.map((hotel, i) => (
          <div className="result" key={i}>
            <table className="result-table">
              <colgroup>
                <col />
                <col />
                <col />
              </colgroup>
              <tr>
                <th className="result-table-text">
                  {flights.length === 0 ? (
                    <></>
                  ) : (
                    (() => {
                      const randFlight =
                        flights[Math.floor(Math.random() * flights.length)];
                      return (
                        <div>
                          <div>
                            ${randFlight.minPrice}
                            {" " + data.currency}
                          </div>
                          <div>{randFlight.direct ? "DIRECT" : "INDIRECT"}</div>
                          <div>{randFlight.carrier}</div>
                        </div>
                      );
                    })()
                  )}
                </th>
                <th className="result-table-text">
                  <div>{hotel.name}</div>
                  <div>
                    ${hotel.price}
                    {" " + data.currency}
                  </div>
                  <ReactStars
                    count={5}
                    value={hotel.stars}
                    edit={false}
                    onChange={() => {
                      //noop
                    }}
                    size={24}
                    activeColor="#ffd700"
                  />
                </th>
                <th className="result-table-image">
                  <img src={hotel.imgLink} alt="hotel" />
                </th>
              </tr>
            </table>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SearchBox;
