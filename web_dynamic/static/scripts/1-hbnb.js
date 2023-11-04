$(document).ready(function () {
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
