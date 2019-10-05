;(function () {
    'use strict';

    let mountedElement = null;

    const api = {};

    model.dispatch = function dispatch () {
        api.update();
    };

    view.clickHandler = function clickHandler (element, evt) {
        evt.preventDefault();

        const plateNumber = model.getCurrentPlateNumber();

        const plateData = model.getPlateData(plateNumber);

        if (plateNumber === 1) {
            if (element.textContent === 'Пройти тест') {
                model.toNextPlate();
            }
        }
        
        else if (plateNumber === 2) {
            if (element.tagName === 'INPUT') {
                model.setPlateData(plateNumber, {
                    item: element.value
                });
            }

            else if (element.tagName === 'A' && element.textContent === 'Назад') {
                model.toPrevPlate();
            }
            
            else if (element.tagName === 'A' && element.textContent === 'Далее') {

                if (plateData.item) {
                    model.toNextPlate();
                } else {
                    alert('Выберите вариант ответа!');
                }
            }
        }
        
        else if (plateNumber === 3) {
            if (element.tagName === 'INPUT') {
                const value =  element.value;

                if (plateData.items.includes(value)) {
                    const index = plateData.items.indexOf(value);
                    plateData.items.splice(index, 1);
                }

                else {
                    plateData.items.push(value);
                }

                model.setPlateData(plateNumber, plateData);
            }

            else if (element.tagName === 'A' && element.textContent === 'Назад') {
                model.toPrevPlate();
            }
            
            else if (element.tagName === 'A' && element.textContent === 'Далее') {

                if (plateData.items.length !== 0) {
                    model.toNextPlate();
                } else {
                    alert('Выберите вариант ответа!');
                }
            }

        }
        
        else if (plateNumber === 4) {
            if (element.tagName === 'INPUT') {
                model.setPlateData(plateNumber, {
                    item: element.value
                });
            }

            else if (element.tagName === 'A' && element.textContent === 'Назад') {
                model.toPrevPlate();
            }
            
            else if (element.tagName === 'A' && element.textContent === 'Далее') {

                if (plateData.item) {
                    model.toNextPlate();
                } else {
                    alert('Выберите вариант ответа!');
                }
            }

        }
        
        else if (plateNumber === 5) {
            const emailInput = document.querySelector('.input-email');

            if (element.classList.contains('checkbox__real')) {
                model.setPlateData(plateNumber, {
                    email: emailInput.value,
                    agreement: !plateData.agreement,
                });
            }

            else if (element.tagName === 'INPUT' && element.value === 'Получить результаты') {
                model.setPlateData(plateNumber, {
                    email: emailInput.value,
                    agreement: plateData.agreement,
                });

                if (plateData.agreement && emailInput.value && api.validateEmail(emailInput.value)) {
                    model.toNextPlate();
                }

                else if (!emailInput.value) {
                    alert('Пожалуйста, введите ваш email!')
                }
                
                else if (!plateData.agreement) {
                    alert('Пожалуйста, ознакомьтесь с политикой конфиденциальности!')
                }

                else if (emailInput.value && !api.validateEmail(emailInput.value)) {
                    alert('Пожалуйста, введите корректный email!');
                }

            }
        }
        
        else if (plateNumber === 6) {

        }
    };

    api.validateEmail = function validateEmail (value) {
        for ( let i = 0; i < value.length; i++ ) {
            if ( value[i] === '@' ) {
                return true;
            }
        }
    };

    api.start = function start (initMountedElement) {
        mountedElement = initMountedElement;
        api.update();
    };

    api.update = function update () {
        const plateNumber = model.getCurrentPlateNumber();
        const plateData = model.getPlateData(plateNumber);
        const plateElement = view.getPlate(plateNumber, plateData);
        
        mountedElement.innerHTML = '';
        mountedElement.append(plateElement);
    }

    window.controller = api;
})();