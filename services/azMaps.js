const axios = require('axios');

module.exports.geocodeAddress = async (address) => {
  // we concatenate the base url of Azure Maps Search API with the query parameters we are concerned with which are the subscription-key and the query address itself.
  const requestURL = `https://atlas.microsoft.com/search/address/json?api-version=1.0&limit=1&subscription-key=${process.env.AZ_MAPS_SEARCH_API_KEY}&query=${address}`;

  try {
    /* 
      Note: when the axios.get() promise is resolved, we get an object of type AxiosRespone that contains a data attribute.
      this data attribute is the one that holds the actual http response.
      therefore, we can directly use the object destructuring syntax in JS to extract the data attribute.

      it could also be written as:
      const axiosResponse = await axios.get(requestURL);
      const data = axiosResponse.data;
    */
    const { data } = await axios.get(requestURL);

    if (data.summary.numResults < 1) {
      return null;
    }

    const locationCoordinates = data.results[0].position;
    return locationCoordinates;
  } catch (err) {
    console.log(err);
    throw new Error('Could not find a valid location using the given address.');
  }
};
