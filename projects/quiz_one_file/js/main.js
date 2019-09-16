const data = [null, null, null, null]

activatePlate(1);

// функция, отображающая заданную карточку
function showPlate (number) {
    const plates = document.querySelectorAll('div.plate');

    for (let i = 0; i < plates.length; i++) {
        plates[i].style.display = 'none';
    }

    plates[number - 1].style.display = '';
}

//функция, делающая активной функции в текущей (активной) карточке
function activatePlate (number) {
    showPlate(number);
    
    activatePlate_1(false);
    activatePlate_2(false);
    activatePlate_3(false);
    activatePlate_4(false);
    activatePlate_5(false);
    
    switch (number) {
        case 1:
            activatePlate_1(true);
            break;
        case 2:
            activatePlate_2(true);
            break;
        case 3:
            activatePlate_3(true);
            break;
        case 4:
            activatePlate_4(true);
            break;
        case 5:
            activatePlate_5(true);
            break;
    }
}

//функционал для первой карточки
function activatePlate_1 (isActive) {
    const aElement = document.querySelector('#startTest');

    if (isActive) {
        aElement.addEventListener('click', startTest);
    } else {
        aElement.removeEventListener('click', startTest);
    }

    function startTest (evt) {
        evt.preventDefault();
        activatePlate(2);
    }
}

//функционал для второй карточки
function activatePlate_2 (isActive) {
    const plateElement = document.querySelector('#plate2');
    const labelElements = plateElement.querySelectorAll('.radio-block');
    const aElementBack = plateElement.querySelector('.button--back');
    const aElementNext = plateElement.querySelector('.button--next');

    if (isActive) {
        aElementNext.addEventListener('click', toNextPlate);
        aElementBack.addEventListener('click', toBackPlate);
    } else {
        aElementNext.removeEventListener('click', toNextPlate);
        aElementBack.removeEventListener('click', toBackPlate);
    }

    for (let i = 0; i < labelElements.length; i++) {
        const label = labelElements[i];

        if (isActive) {
            label.addEventListener('click', selectHandler);
        } else {
            label.removeEventListener('click', selectHandler);
        }
    }

    function selectHandler (evt) {

        updateProgress(plateElement, '34%');

        for (let i = 0; i < labelElements.length; i++) {
            labelElements[i].classList.remove('radio-block--active');
        }

        this.classList.add('radio-block--active');

        const inputElement = this.querySelector('input');
        const value = inputElement.value;

        data[0] = value;


    }

    function toNextPlate (evt) {
        evt.preventDefault();
        if (data[0]) {
            activatePlate(3);
        }
    }

    function toBackPlate (evt) {
        evt.preventDefault();
        activatePlate(1);
    }
}

//функционал для третьей карточки
function activatePlate_3 (isActive) {
    const plateElement = document.querySelector('#plate3');
    const labelElements = plateElement.querySelectorAll('.checkbox-block');
    const aElementBack = plateElement.querySelector('.button--back');
    const aElementNext = plateElement.querySelector('.button--next');

    if (isActive) {
        aElementNext.addEventListener('click', toNextPlate);
        aElementBack.addEventListener('click', toBackPlate);
    } else {
        aElementNext.removeEventListener('click', toNextPlate);
        aElementBack.removeEventListener('click', toBackPlate);
    }

    for (let i = 0; i < labelElements.length; i++) {
        const label = labelElements[i];

        if (isActive) {
            label.addEventListener('click', selectHandler);
        } else {
            label.removeEventListener('click', selectHandler);
        }
    }

    function selectHandler (evt) {

        updateProgress(plateElement, '68%');

        const inputElement = this.querySelector('input');

        this.classList.toggle('checkbox-block--active');
        inputElement.checked = !inputElement.checked;

        evt.preventDefault();

        const answers = [];

        for (let i = 0; i < labelElements.length; i++) {
            const inputElement = labelElements[i].querySelector('input');

            if (inputElement.checked) {
                answers.push(inputElement.value);
            }
        }


        data[1] = answers;
    }

    function toNextPlate (evt) {
        evt.preventDefault();
        if (data[1] && data[1].length > 0) {
            activatePlate(4);
        }
    }

    function toBackPlate (evt) {
        evt.preventDefault();
        activatePlate(2);
        
    }
}

//функционал для четвертой карточки
function activatePlate_4 (isActive) {
    const plateElement = document.querySelector('#plate4');
    const labelElements = plateElement.querySelectorAll('.card-block');
    const aElementBack = plateElement.querySelector('.button--back');
    const aElementNext = plateElement.querySelector('.button--next');

    if (isActive) {
        aElementNext.addEventListener('click', toNextPlate);
        aElementBack.addEventListener('click', toBackPlate);
    } else {
        aElementNext.removeEventListener('click', toNextPlate);
        aElementBack.removeEventListener('click', toBackPlate);
    }

    for (let i = 0; i < labelElements.length; i++) {
        const label = labelElements[i];

        if (isActive) {
            label.addEventListener('click', selectHandler);
        } else {
            label.removeEventListener('click', selectHandler);
        }
    }

    function selectHandler (evt) {

        updateProgress(plateElement, '100%');

        const inputElement = this.querySelector('input');
        const value = inputElement.value;
        data[2] = value;
    }

    function toNextPlate (evt) {
        evt.preventDefault();
        if (data[2]) {
            activatePlate(5);
        }
    }

    function toBackPlate (evt) {
        evt.preventDefault();
        activatePlate(3);
    }
}

//функционал для пятой карточки
function activatePlate_5 (isActive) {
    const plateElement = document.querySelector('#plate5');
    const checkboxLabel = plateElement.querySelector('.checkbox');
    const getResults = plateElement.querySelector('.button--huge');

    if (isActive) {
        getResults.addEventListener('click', toNextPlate);
    } else {
        getResults.removeEventListener('click', toNextPlate);
    }

    if (isActive) {
        checkboxLabel.addEventListener('click', selectHandler);
    } else {
        checkboxLabel.removeEventListener('click', selectHandler);
    }

    function selectHandler (evt) {
        const checkbox = this.querySelector('input');
        data[3] = checkbox.checked;
    }

    function toNextPlate (evt) {
        evt.preventDefault();
        if (data[3]) {
            activatePlate(6);
        }
    }
}


function updateProgress (plate, percent) {
    let progressBarText = plate.querySelector('.progress__label strong');
    let progressBarLine = plate.querySelector('.progress__line-bar');

    progressBarText.textContent = percent;
    progressBarLine.style.width = percent;
}
