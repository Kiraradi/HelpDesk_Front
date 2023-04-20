import "./ChangesPopup.css";
export default class ChangesPopup {
    constructor(container, isTickedAdded, shortDescription = '', detailedDescription = '') {
        this.container = container;
        this.isTickedAdded = isTickedAdded;
        this.shortDescription = shortDescription;
        this.detailedDescription = detailedDescription;
        this.cancelButtonCallback = this.cancelButtonCallback.bind(this);
        this.addButtonCallback = this.addButtonCallback.bind(this);
        this.createTicketCollback = () => {};
        this.changeTicketCollback = () => {};
    }

    drawUI() {
        this.popupEl = document.createElement('div');
        this.popupEl.classList.add('popup');

        const popupFormEl = document.createElement('form');
        popupFormEl.classList.add('popup-form');

        const popupTitleEl = document.createElement('h2');
        popupTitleEl.classList.add('popup-title');

        if (this.isTickedAdded) {
            popupTitleEl.textContent = 'Добавить тикет';
        } else {
            popupTitleEl.textContent = 'Изменить тикет';
        }
        popupFormEl.appendChild(popupTitleEl);
        popupFormEl.appendChild(this.getInputEl(true));
        popupFormEl.appendChild(this.getInputEl(false));
        popupFormEl.appendChild(this.getButtonsEl());
        this.popupEl.appendChild(popupFormEl);

        popupFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        this.popupEl.addEventListener('click', (e) => {
            if (!e.target.closest('.popup-form')) {
                this.cancelButtonCallback();
            }
        });

        this.container.appendChild(this.popupEl);
    }

    getInputEl(isInputShort) {
        const inputWraper = document.createElement('div');
        inputWraper.classList.add('input-wraper');

        const inputTitle = document.createElement('h2')
        inputTitle.classList.add('input-title');
        let inputEl

        if (isInputShort) {
            inputTitle.textContent = 'Краткое описание';
            inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = this.shortDescription;

        } else {
            inputTitle.textContent = 'Подробное описание';
            inputEl = document.createElement('textarea');
            inputEl.classList.add('textarea');
            inputEl.value = this.detailedDescription;
        }
        inputWraper.appendChild(inputTitle);
        inputWraper.appendChild(inputEl);

        return inputWraper;
    }

    getButtonsEl() {
        const buttonsWraper = document.createElement('div');
        buttonsWraper.classList.add('buttons-wraper');

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('button','cancel-button');
        cancelButton.textContent = 'Отмена';
        buttonsWraper.appendChild(cancelButton);

        const addButton = document.createElement('button');
        addButton.classList.add('button','add-button');
        addButton.textContent = 'Ок';
        buttonsWraper.appendChild(addButton);

        cancelButton.addEventListener('click', this.cancelButtonCallback);
        addButton.addEventListener('click', this.addButtonCallback);
        return buttonsWraper;
    }

    cancelButtonCallback() {
        this.popupEl.remove();
    }

    addButtonCallback() {
        this.shortDescription = this.popupEl.querySelector('.input').value;
        this.detailedDescription = this.popupEl.querySelector('.textarea').value;
        this.createTicketCollback(this.shortDescription, this.detailedDescription); 
        this.popupEl.remove();       
    }
}