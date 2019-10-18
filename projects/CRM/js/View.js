;(function () {
    'use strict';

    const View = {
        dispatch () {}
    };

    const dateFormatter = new Intl.DateTimeFormat('ru');

    function dispatch (...args) {
        View.dispatch(...args);
    }

    View.generateTable = function generateTable (orders) {
        const tableHTML = stringToHtml(tableTemplate);

        for (const order of orders) {
            const trElement = document.createElement('tr');
            trElement.innerHTML = trTemplate
                .replace(/%REQUESTID%/g, order.id)
                .replace(/%DATE%/g, dateFormatter.format(order.date))
                .replace(/%PRODUCT%/g, order.product)
                .replace(/%NAME%/g, order.name)
                .replace(/%EMAIL%/g, order.email)
                .replace(/%PHONE%/g, order.phone)
                .replace(/%STATUS%/g, order.status)
                .replace(/%ID%/g, order.id);

            const status = trElement.querySelector('[data-status]');

            switch (order.status.toLowerCase()) {
                case "новая":
                    status.classList.add('badge-danger');
                break;
                case "в работе":
                    status.classList.add('badge-warning');
                break;
                case "завершена":
                    status.classList.add('badge-success');
                break;
            }
            // TODO: вставить все оставшиеся данные в строку
           
            tableHTML.querySelector('tbody').append(trElement);
        }

        return tableHTML;
    };

    View.updateEditionCard = function updateEditionCard (dom, data) {
        dom.querySelector('[data-id]').textContent = data.id;
        dom.querySelector('[data-datetime]').textContent = dateFormatter.format(data.date);
        dom.querySelector('[data-product]').value = data.product;
        dom.querySelector('[data-name]').value = data.name;
        dom.querySelector('[data-email]').value = data.email;
        dom.querySelector('[data-phone]').value = data.phone;
        dom.querySelector('[data-status]').value = data.status;
        
        dom
            .querySelector('[data-button-save]')
            .addEventListener('click', function (event) {
                event.preventDefault();
                dispatch(this, event);
        });
        
        dom
            .querySelector('[data-button-archive]')
            .addEventListener('click', function (event) {
                event.preventDefault();
                dispatch(this, event);
         });
    };

    View.getEditionData = function getEditionData (dom) {
        return {
            id: dom.querySelector('[data-id]') ? dom.querySelector('[data-id]').textContent : '',
            product: dom.querySelector('[data-product]').value,
            name: dom.querySelector('[data-name]').value,
            email: dom.querySelector('[data-email]').value,
            phone: dom.querySelector('[data-phone]').value,
            status: dom.querySelector('[data-status]') ? dom.querySelector('[data-status]').value : ''
        };
    };

    window.View = View;

    function stringToHtml (string) {
        const divElement = document.createElement('div');
        divElement.innerHTML = string;
        return divElement.firstElementChild;

    }

    const tableTemplate = `
<table class="table fs-14">
    <thead>
        <tr>
            <th>ID</th>
            <th>дата</th>
            <th>продукт</th>
            <th>имя</th>
            <th>email</th>
            <th>телефон</th>
            <th>статус</th>
            <th></th>
        </tr>
    </thead>
    <tbody></tbody>
</table>`;

    const trTemplate = `
<th scope="row" data-id>%ID%</th>
<td data-date>%DATE%</td>
<td data-product>%PRODUCT%</td>
<td data-name>%NAME%</td>
<td data-email>%EMAIL%</td>
<td data-phone>%PHONE%</td>
<td>
    <div class="badge badge-pill" data-status>%STATUS%</div>
</td>
<td><a href="03-crm-edit-bid.html?id=%ID%" data-editbutton>Редактировать</a></td>`;

})();