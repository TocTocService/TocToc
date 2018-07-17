document.addEventListener('DOMContentLoaded', () => {

  const Madrid = {
    lat: 40.4176865,
    lng: -3.7096531
  };
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 15,
      center: Madrid
    }
  );

}, false);