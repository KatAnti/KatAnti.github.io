;( function () {
    'use strict';

    //стартовый шаблон
    const template = `
    <div id="app">
        <input type="text" id="enter">
        <button id="addItem">Добавить</button>
        <div id="todoList"></div>
        <button id="makeDone">Выполнить</button>
        <button id="makeNotDone">Воcстановить</button>
        <button id="remove">Удалить</button>		
    </div>`;

    let rootElement = null;

    //создаем див и создаем в нем разметку шаблона. Добавляем всем кнопкам обработчик события
    function getRoot () {
        const divElement = document.createElement('div');
        divElement.innerHTML = template;

        rootElement = divElement.firstElementChild;

        const buttonElements = rootElement.querySelectorAll('button');

        for (let i = 0; i < buttonElements.length; i++) {
            const buttonElement = buttonElements[i];

            buttonElement.addEventListener('click', function (evt) {
                //функция clickHandler будет объявляться в controller, в нее передаем айди кнопки, на которую произошло событие
                view.clickHandler(buttonElement.getAttribute('id'));
            });
        }

        return rootElement;
    }

    // получаем значение из инпута
    function getValue () {
        return rootElement.querySelector('#enter').value;
    }
    
    //присваиваем значение инпуту
    function setValueEmpty (value) {
        rootElement.querySelector('#enter').value = '';
    }

    //создаем пункты списка и вставляем из в ДОМ
    function update (items) {
        const todoList = document.querySelector('#todoList');
        const ulElement = createToDoList(items);

        todoList.textContent = '';
        todoList.append(ulElement);
    }

    //создаем виртуальные ДОМ элементы для списка и для каждого пункта в списке
    function createToDoList (items) {
        const ulElement = document.createElement('ul');

        for (const item of items) {
            const liElement = document.createElement('li');
            const checkboxElement = document.createElement('input');

            checkboxElement.setAttribute('type', 'checkbox');

            if (item.done) {
                liElement.classList.add('done');
            }

            if (item.checked) {
                checkboxElement.setAttribute('checked', '');
            }

            liElement.append(checkboxElement);
            liElement.append(' ' + item.content);

            ulElement.append(liElement);

            // заменяем обработчик события по умолчанию, на нашу функцию
            checkboxElement.addEventListener('click', function (evt) {
                evt.preventDefault();
                view.clickHandler('clickByItem', item.id);
            });
        }

        return ulElement;
    }
    
    //записываем все необходимые функции/методы в глобальный объект
    window.view = {
        getRoot: getRoot,
        update: update,
        getValue: getValue,
        setValueEmpty: setValueEmpty,
        clickHandler: () => {}
    };

})();