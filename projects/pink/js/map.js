ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
			center: [59.938631, 30.323055],
			zoom: 16,
			controls: []
		}, {
		}),
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		}, {
		});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable('scrollZoom');
		myMap.events.add('click', function onMapClick(e) {
		if(myMap.behaviors.isEnabled('scrollZoom')) {
			myMap.events.remove('click', onMapClick);
		} else {
			myMap.behaviors.enable(['scrollZoom']);
		}
	});
});
