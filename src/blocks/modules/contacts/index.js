import $ from "jquery";

export default function() {
  if (!$('#contact-map').length) {
    return false;
  }
  ymaps.ready(function () {                         
    var contactMap = new ymaps.Map('contact-map', {
        center: [55.699467, 37.625594],
        zoom: 12
    });
  });
}