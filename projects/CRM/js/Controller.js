;(function () {
    'use strict'

    const Controller = {};

    const form = document.querySelector('[data-form]');
    const orders = Model.getOrders();

    form.addEventListener('submit', function() {
        Model.createNewOrder(orders.length + 1, View.getEditionData(document.body));
    });

    window.Controller = Controller
})();