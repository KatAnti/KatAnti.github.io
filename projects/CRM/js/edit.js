;(function () {
    'use strict';

    const orderId = getId();
    const order = Model.getOrderById(orderId);

    View.updateEditionCard(document.body, order);
    
    const currentOrders = Model.getOrders();
    const newOrdersNumber = document.querySelector('[data-filter-status-side] .badge');

    let countNewOrders = 0;

    for (const order of currentOrders) {
        if (order.status === 'Новая') {
            countNewOrders++;
        }
    }

    newOrdersNumber.textContent = countNewOrders;

    View.dispatch = (element, event) => {
        if (element.textContent === 'Сохранить изменения') {
            const updateData = View.getEditionData(document.body);
            const result = Model.updateOrder(orderId, updateData);
            if (!result) {
                alert('Что-то пошло не так');
            } else {
                location.replace('02-crm-all-bids.html');
            }
        }

        if (element.textContent === 'Удалить в архив') {
            order.status = 'В архиве';
            const result = Model.updateOrder(orderId, order);
            
            if (!result) {
                alert('Что-то пошло не так');
            } else {
                location.replace('02-crm-all-bids.html');
            }
        }
    };
    
    function getId () {
        if (location.search.includes('?') && location.search.includes('id=')) {
            const array = location.search.slice(1).split('=');
            const index = array.indexOf('id');
        
            return parseInt(array[index + 1]);
        }
    }
})();