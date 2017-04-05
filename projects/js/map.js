ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
			center: [59.93959142831845,30.329859469098814],
			zoom: 16,
			controls: []
		}, {
			searchControlProvider: 'yandex#search'
		}),
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: 'img/adress_marker.png',
			// Размеры метки.
			iconImageSize: [202, 140],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-365, -50]
		});

	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom')
});
