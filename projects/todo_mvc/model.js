;( function () {
    'use strict';

    //Создаем массив с объектами - пунктами списка
    let items = [
        { id: 1, content: 'Купить хлеб', done: true, checked: false},
        { id: 2, content: 'Купить молоко', done: false, checked: true},
    ];
    
    let idCounter = 3;
    
    //копируем каждый объект в новый массив (инкапсуляция)
    function getItems () {
        const copyItems = [];

        for (const item of items) {
            copyItems.push({
                id: item.id,
                content: item.content,
                done: item.done,
                checked: item.checked
            });
        }

        return copyItems;
    }
    
    // создаем новый объект, добавлем его в массив с пунктами списка, счетчик прибавляет +1, чтобы у каждого пункта был свой уникальный айдишник
    function addItem (content) {
        const item = {
            id: idCounter,
            content: content,
            done: false,
            checked: false
        };
    
        idCounter++;
        
        items.push(item);

        model.dispatch(getItems());
    }
    
    //Загоняем в новый массив все пункты, кроме того, у которого айдишник совпадает с переданным аргументом (т.е тот, который надо удалить не входит в массив). Переписываем массив с пунктами меню.
    function removeItem (removedId) {
        const newItems = [];
    
        for (const item of items) {
            if (item.id !== removedId) {
                newItems.push(item);
            }
        }
    
        items = newItems;

        model.dispatch(getItems());
    }
    
    //проходимся по массиву с пунктами и, если айдишник совпадает, переключаем свойство checked на противоположное
    function toggleChecked (itemId) {
        for (const item of items) {
            if (item.id === itemId) {
                item.checked = !item.checked;
            }
        }
    
        model.dispatch(getItems());
    }
    
    //проходимся по массиву с пунктами и, если айдишник совпадает, присваиваем свойству done значение status
    function setDoneStatus (itemId, status) {
        for (const item of items) {
            if (item.id === itemId) {
                item.done = status;
            }
        }

        model.dispatch(getItems());
    }

    //записываем все необходимые функции/методы в глобальный объект
    window.model = {
        getItems: getItems,
        addItem: addItem,
        removeItem: removeItem,
        toggleChecked: toggleChecked,
        setDoneStatus: setDoneStatus,
        dispatch: () => {}
    };

})();
