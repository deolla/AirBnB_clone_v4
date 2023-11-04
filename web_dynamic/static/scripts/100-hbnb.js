$(document).ready(function () {
  $.get('http://127.0.0.1:5001/api/v1/status/', (response) => {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail((err) => {
    console.error(err);
    $('#api_status').removeClass('available');
  });

  const citiesBox = {};
  $('.filters .locations .popover ul ul input[type="checkbox"]').on('click', function () {
    if (this.checked) {
      citiesBox[$(this).data('id')] = $(this).data('name');
    } else {
      delete citiesBox[$(this).data('id')];
    }
    let obj = Object.values(citiesBox).join(', ');
    if (obj.length > 28) {
      obj = obj.slice(0, 28) + '...';
    }
    $('.locations h4').html(obj.length === 0 ? '&nbsp' : obj);
  });

  const statesBox = {};
  $('.filters .locations .popover ul li  input[type="checkbox"]').on('click', function () {
    if (this.checked) {
      statesBox[$(this).data('id')] = $(this).data('name');
    } else {
      delete statesBox[$(this).data('id')];
    }
    let obj = Object.values(statesBox).join(', ');
    if (obj.length > 28) {
      obj = obj.slice(0, 28) + '...';
    }
    $('.locations h4').html(obj.length === 0 ? '&nbsp' : obj);
  });

  const amenitiesBox = {};
  $('.amenities input[type="checkbox"]').on('click', function () {
    if (this.checked) {
      amenitiesBox[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesBox[$(this).data('id')];
    }
    let obj = Object.values(amenitiesBox).join(', ');
    if (obj.length > 28) {
      obj = obj.slice(0, 28) + '...';
    }
    $('.amenities h4').html(obj.length === 0 ? '&nbsp' : obj);
  });

  fetchPlaces();

  $('button').click(() => {
    fetchPlaces({
      cities: Object.keys(citiesBox),
      states: Object.keys(statesBox),
      amenities: Object.keys(amenitiesBox)
    });
  });

  // function for API request (POST)
  function fetchPlaces (data = {}) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(function (places) {
      const m = [];
      for (const place of places) {
        m.push(`
          <article>
            <div class="title_box">

              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>

            </div>

            <div class="information">

              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>

            <div class="user">

            </div>

            <div class="description">
              ${place.description}
            </div>
          </article>`);
      }
      $('section.places').html(m);
    }).catch(function (err) {
      console.log(err);
    });
  }
});
