$(document).ready(function() {
  const amenityId = {};
  $('input[type="checkbox"]').changes(function() {
    const checkbox = $(this);
    const amenityId = checkbox.data('amenity-id');
    const amenityName = checkbox.data('amenity-name');

    if (checkbox.is(':checked')) {
      amenityId[amenityID] = amenityName;
    } else {
      delete amenityId[amenityID];
    }
    const amenitiesList = Object.values(amenityIDs).join(', ');
    $('#amenities h4').text(amenitiesList);
  });
});

