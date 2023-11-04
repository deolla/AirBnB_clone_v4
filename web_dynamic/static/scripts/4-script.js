$(document).ready(function () {
    $.get('http://127.0.0.1:5001/api/v1/status/', (response) => {
      // console.log(res);
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }).fail((err) => {
      console.error(err);
      $('#api_status').removeClass('available');
    });
  
    const elemIds = {};
    $('input[type="checkbox"]').on('click', function () {
      if (this.checked) {
        elemIds[$(this).data('id')] = $(this).data('name');
      } else {
        delete elemIds[$(this).data('id')];
      }
      let ob = Object.values(elemIds).join(', ');
      if (ob.length > 28) {
        ob = ob.slice(0, 28) + '...';
      }
      $('.amenities h4').html(ob.length === 0 ? '&nbsp' : ob);
    });
  
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify(
        {
            states: [],
            cities: [],
            amenities: listAmenities
        }
      ),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(function (places) {
      for (const place of places) {
        console.log(place);
        $('section.places').append(`
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
    }).catch(function (err) {
      console.log(err);
    });
  });
  