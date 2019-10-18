;(function () {
    'use strict';
    
    const filters = {
        product: false,
        status: false
    };

    const currentOrders = Model.getOrders();
    const newOrdersNumber = document.querySelector('[data-filter-status-side] .badge');

    let countNewOrders = 0;

    for (const order of currentOrders) {
        if (order.status === 'Новая') {
            countNewOrders++;
        }
    }

    newOrdersNumber.textContent = countNewOrders;
    
    runFilter();
    
    document
        .querySelector('[data-filter-product]')
        .addEventListener('change', function () {
            filters.product = this.value || false;

            runFilter();
        });

    document
        .querySelectorAll('[data-filter-status] > a')
        .forEach(element => element.addEventListener('click', function (evt) {
            evt.preventDefault();
            switch (this.textContent) {
                case "Новые":
                    filters.status = 'Новая';
                break;
                case "В работе":
                    filters.status = 'В работе';
                break;
                case "Завершенные":
                    filters.status = 'Завершена';
                break;
                case "Архив":
                    filters.status = 'В архиве';
                break;
                default:
                    filters.status = false;
            }

            runFilter();
        }));

    const allSideFilters = document.querySelectorAll('[data-filter-status-side] > li > a');
        
    allSideFilters.forEach(element => element.addEventListener('click', function (evt) {
            for (let sideFilter of allSideFilters) {
                sideFilter.classList.remove('active');
            }
            this.classList.add('active');
            evt.preventDefault();
            const name = this.querySelector('span').textContent;
            switch (name) {
                case "Новые":
                    filters.status = 'Новая';
                break;
                case "В работе":
                    filters.status = 'В работе';
                break;
                case "Завершенные":
                    filters.status = 'Завершена';
                break;
                case "Архив":
                    filters.status = 'В архиве';
                break;
                default:
                    filters.status = false;
            }

            runFilter();
        }));
        

    function runFilter () {
        let orders = Model.getOrders();

        if (filters.status !== 'В архиве') {
            const newOrders = [];

            for (const order of orders) {
                if (order.status !== 'В архиве') {
                    newOrders.push(order);
                }
            }

            orders = newOrders;
        }

        if (filters.product) {
            const newOrders = [];

            for (const order of orders) {
                if (order.product === filters.product) {
                    newOrders.push(order);
                }
            }

            orders = newOrders;
        }
        
        if (filters.status) {
            const newOrders = [];

            for (const order of orders) {
                if (order.status === filters.status) {
                    newOrders.push(order);
                }
            }

            orders = newOrders;
        }

        const table = View.generateTable(orders);

        const tablePlace = document.querySelector('[data-tableplace]');
        tablePlace.innerHTML = '';
        tablePlace.append(table);
    }
})();
