;( function () {
    'use strict';

    //функция, которая запускает работу
    function start () {
        //добавляем в body стартовый шаблон с подключенными обработчиками событий
        document.body.append(view.getRoot());

        //теперь каждый раз, при изменении данных, программа будет обновляться (все пункты списка будут создаваться заново)
        model.dispatch = view.update;
    
        //создаются пункты списка
        view.update(model.getItems());
    
        //функция, которая используется в обработчиках событий, т.е какие действия надо выполнить
        view.clickHandler = function (elementId, itemId) {
            //будет переключать checked заданного элемента
            if (elementId === 'clickByItem') {
                model.toggleChecked(itemId);
            }

            //если нажата кнопка добавить, получаем значение инпута и добавляем его как пункт списка
            else if (elementId === 'addItem') {
                const value = view.getValue();
    
                if (value !== '') {
                    model.addItem(value);
                }

                view.setValueEmpty();
            }
            
            //если нажата кнопка выполнить, получаем копию массива с пунктами, и для каждого с параметром checked, изменяем статус done на true
            else if (elementId === 'makeDone') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.setDoneStatus(item.id, true);
                        model.toggleChecked(item.id);
                    }
                }
            }
            
            //если нажата кнопка восстановить, получаем копию массива с пунктами, и для каждого с параметром checked, изменяем статус done на false
            else if (elementId === 'makeNotDone') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.setDoneStatus(item.id, false);
                        model.toggleChecked(item.id);
                    }
                }
            }

            //если нажата кнопка удалить, получаем копию массива с пунктами, и удаляем все с параметром checked (каждый раз составляем новый массив, в который записываем все пункты, кроме checked)
            else if (elementId === 'remove') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.removeItem(item.id);
                    }
                }
            }

        };
    }

    //записываем в глобальный объект метод start, чтобы можно было запустить программу одной командой
    window.controller = {
        start: start
    };

})();