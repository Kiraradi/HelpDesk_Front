import './Ticket.css'
import RequestService from '../../services/requestService';
import ChangesPopup from '../ChangesPopup/ChangesPopup';
export default class Ticket {
    constructor(container, ticket) {
        this.container = container;
        this.ticket = ticket;        
    }

    drawUI() {
        this.ticketEl = document.createElement('li');
        this.ticketEl.classList.add('ticket');
        this.ticketEl.setAttribute('data-id', this.ticket.id);
        this.ticketEl.appendChild(this.getCheckboxEl());
        this.ticketEl.appendChild(this.getDescriptionEl());
        this.ticketEl.appendChild(this.getCreationTimeEl());
        this.ticketEl.appendChild(this.getButtonsEl());

        this.container.appendChild(this.ticketEl);
        console.log(this.ticket)
    }

    getCheckboxEl() {
        const checkboxWraperEl = document.createElement('div');
        checkboxWraperEl.classList.add('checkbox-wraper');
        
        const checkboxEl = document.createElement('button');
        checkboxEl.classList.add('checkbox-ticket', 'button');
        checkboxWraperEl.appendChild(checkboxEl);

        checkboxEl.addEventListener('click', () => {
            checkboxEl.classList.toggle('checkbox-ticket__active');
            this.ticket.status = !this.ticket.status;
            RequestService.changeTicketOnServer(this.ticket);
        })

        return checkboxWraperEl;
    }

    getDescriptionEl() {
        const descriptionWraperEl = document.createElement('div');
        descriptionWraperEl.classList.add('description-wraper');

        const shortDescription = document.createElement('div');
        shortDescription.classList.add('short-description', 'description');
        shortDescription.textContent = this.ticket.name;
        descriptionWraperEl.appendChild(shortDescription);

        const detailedDescription = document.createElement('div');
        detailedDescription.classList.add('detailed-description', 'description');
        detailedDescription.textContent = this.ticket.description;
        descriptionWraperEl.appendChild(detailedDescription);

        return descriptionWraperEl;
    }

    getCreationTimeEl() {
        const creationTimeEl = document.createElement('div');
        creationTimeEl.classList.add('creation-time');
        creationTimeEl.textContent = this.ticket.created;

        return creationTimeEl;
    }

    getButtonsEl() {
        const buttonsWraper = document.createElement('div');
        buttonsWraper.classList.add('buttons-wraper-ticket');

        const changeButton = document.createElement('button');
        changeButton.classList.add('change-button', 'button');
        changeButton.textContent = '✎';

        buttonsWraper.appendChild(changeButton);

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button', 'button');
        closeButton.textContent = 'X';

        buttonsWraper.appendChild(closeButton);

        changeButton.addEventListener('click', e => {
             
        });

        closeButton.addEventListener('click', (e) => {
            const id = this.ticketEl.getAttribute('data-id');
            RequestService.removeTaskOnServer(id);
            this.ticketEl.remove();
        });

        return buttonsWraper;
    }
}