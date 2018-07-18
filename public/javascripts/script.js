document.addEventListener('DOMContentLoaded', () => {
  
  const Madrid = {
    lat: 40.4176865,
    lng: -3.7096531
  };

  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14,
      center: Madrid
    }
  );

      $(function(){
        $("#geocomplete").geocomplete({
          map: ".map_canvas",
          details: "form ul",
          detailsAttribute: "data-geo"
        });
        
        $("#geocomplete").trigger("geocode");
      });
      }, false);