const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
  const params = {
    q : `${searchTerm} in:title`,
    part : `snippet`,
    key : 'AIzaSyAoaTW7PgZeffOnCgq_N17QCyFjoHIbG-Q'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function renderResult(result) {
  return `
    <div class = js-item>
      <a class="js-image" target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
        <img src="${result.snippet.thumbnails.default.url}" alt="${result.snippet.title}">
      </a>
      <h3>${result.snippet.title}</h3>
      <p>Description: <span class="js-description">${result.snippet.description}</span></p>
      <p>Published: <span class="js-published">${result.snippet.publishedAt}</span></p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
