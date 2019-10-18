;(function () {
    'use strict';

    const database = {
        // TODO: разнообразить
        orders: [{
            id: 1,
            date: Date.now() - 1000 * 60 * 60 * 24 * 3,
            product: "Курс по верстке",
            name: "Юрий",
            email: "info@rightblog.ru",
            phone: "+7 (909) 77-55-777",
            status: "Новая"
        }, {
            id: 2,
            date: Date.now() - 1000 * 60 * 60 * 24 * 2,
            product: "Курс по JavaScript",
            name: "Алексей",
            email: "alex@rightblog.ru",
            phone: "+7 (777) 77-55-333",
            status: "В работе"
        }, {
            id: 3,
            date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            product: "Курс по VUE JS",
            name: "Анна",
            email: "anna@rightblog.ru",
            phone: "+7 (333) 77-55-555",
            status: "Завершена"
        }]
    };

    load();
    save();

    const Model = {}

    Model.getOrders = function getOrders () {
        return JSON.parse(JSON.stringify(database.orders));
    };

    // Возвращать order по id
    Model.getOrderById = function getOrderById (id) {
        for (const item of database.orders) {
            if (item.id === id) {
                return JSON.parse(JSON.stringify(item));
            }
        }
    };

    Model.updateOrder = function updateOrder (id, updateData) {
        for (const item of database.orders) {
            if (item.id === id) {
                item.product = updateData.product;
                item.name = updateData.name;
                item.email = updateData.email;
                item.phone = updateData.phone;
                item.status = updateData.status;
                save();
                return true;
            }
        }

        return false;
    };
    
    Model.createNewOrder = function createNewOrder (id, data) {
        database.orders.push({
            id: id,
            date: Date.now(),
            product: data.product,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: 'Новая',
        });
        
        save();
        return true;
    };

    window.Model = Model;

    function save () {
        localStorage.setItem('crm', JSON.stringify(database));
    }

    function load () {
        if (localStorage.getItem('crm')) {
            const data = JSON.parse(localStorage.getItem('crm'));
            Object.assign(database, data);

            // for (const key of Object.keys(data)) {
            //     database[key] = data[key]
            // }
        }
    }
})();