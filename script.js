//api_key='tu4BFzFbRNpOy19mHhYmh3bW1lbqEWvOmTBD011s'

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=tu4BFzFbRNpOy19mHhYmh3bW1lbqEWvOmTBD011s

'use strict';

const apiKey = 'tu4BFzFbRNpOy19mHhYmh3bW1lbqEWvOmTBD011s'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}'</a>
      <h5>Address</h5>
      <p>${responseJson.data[i].addresses[0].line1}</p>
      <p>${responseJson.data[i].addresses[0].line2}</p>
      <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
      </li>`
    )};

  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults-1,
    fields: "addresses"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
    $('#js-search-term').val("");
  });
}

$(watchForm);