import axios from "axios";

/**
 *
 * @param {string} city
 * @returns {Promise<object>} Promise resolving to response object
 */
export const getAreas = (city, curr) => {
    var options = {
        method: "GET",
        url: "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search",
        params: { query: city, currency: curr, locale: "en_US" },
        headers: {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key":
                "a5187c3c21msh91991b7a36881f8p1ec7d4jsnf5375894fb39",
        },
    };

    return axios.request(options);
};

/**
 *
 * @param {string} destinationId
 * @param {number} numAdults
 * @returns {Promise<object>} Promise resolving to response object
 */
export const getHotels = (destinationId, numAdults, curr) => {
    var options = {
        method: "GET",
        url: "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search",
        params: {
            checkin_date: "2022-03-26",
            checkout_date: "2022-03-27",
            sort_order: "STAR_RATING_HIGHEST_FIRST",
            destination_id: destinationId,
            adults_number: numAdults.toString(),
            locale: "en_US",
            currency: curr,
            price_min: "10",
            star_rating_ids: "3,4,5",
            // accommodation_ids: "20,8,15,5,1",
            price_max: "500",
            page_number: "1",
            theme_ids: "14,27,25",
            // amenity_ids: "527,2063",
        },
        headers: {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key":
                "a5187c3c21msh91991b7a36881f8p1ec7d4jsnf5375894fb39",
        },
    };

    return axios.request(options);
};

/**
 *
 * @param {string} city
 * @param {string} country
 * @returns {Promise<object>} Promise resolving to response object
 */
export const getAirports = (city, country) => {
    var options = {
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/CAD/en-US/`,
        params: { query: city },
        headers: {
            "x-rapidapi-host":
                "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key":
                "a5187c3c21msh91991b7a36881f8p1ec7d4jsnf5375894fb39",
        },
    };

    return axios.request(options);
};

/**
 *
 * @param {string} origin - Place (airport) of departure
 * @param {string} dest - Place (airport) of arrival
 * @param {string} outboundDate - Date of departure
 * @returns {Promise<object>} Promise resolving to response object
 */
export const getFlights = (origin, dest, outboundDate, curr) => {
    var options = {
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${curr}/en-US/${origin}/${dest}/${outboundDate}`,
        // params: { inboundpartialdate: ""},
        headers: {
            "x-rapidapi-host":
                "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key":
                "a5187c3c21msh91991b7a36881f8p1ec7d4jsnf5375894fb39",
        },
    };
    return axios.request(options);
};
