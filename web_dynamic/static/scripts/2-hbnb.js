$(document).ready(function () {
    $.get('http://127.0.0.1:5001/api/v1/status/', (response) => {
        console.log(response);
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
  });
  