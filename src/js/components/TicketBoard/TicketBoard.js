import RequestService from "../../services/requestService";
import ChangesPopup from "../ChangesPopup/ChangesPopup";
import './TicketBoard.css';
import Ticket from "../Ticket/Ticket";

export default class TicketBoard {
    constructor(container) {
        this.container = container;
        this.addTicketCollback = this.addTicketCollback.bind(this);
        this.createTicketCollback = this.createTicketCollback.bind(this);
    }

    drawUI() {
        const bottonsContainer = document.createElement('div');
        bottonsContainer.classList.add('bottons-container');

        const addTicketButton = document.createElement('button');
        addTicketButton.classList.add('addTicket-button');
        addTicketButton.textContent = 'Добавить тикет';
        bottonsContainer.appendChild(addTicketButton);

        this.ticketList = document.createElement('ul');
        this.ticketList.classList.add('ticket-list');
        bottonsContainer.appendChild(this.ticketList);

        addTicketButton.addEventListener('click', this.addTicketCollback);
        this.container.appendChild(bottonsContainer)

    }

    addTicketCollback(e) {
        const changesPopup = new ChangesPopup(this.container, true);
        changesPopup.createTicketCollback = this.createTicketCollback
        changesPopup.drawUI();
    }

    changeTicket(ticket) {
        const changesPopup = new ChangesPopup(this.container, true, ticket);
        changesPopup.createTicketCollback = this.createTicketCollback;
        changesPopup.changeTicketOnServerCallback = this.changeTicketOnServerCallback;

    }

    createTicketCollback(shortDescription, detailedDescription) {
        
        RequestService.addTicketOnServer(shortDescription, detailedDescription).then((resolve) => {
            
            const ticketEl = new Ticket(this.ticketList, resolve);
            ticketEl.removeTaskOnServerCallback = this.removeTaskOnServerCallback;
            ticketEl.changeTicketOnServerCallback = this.changeTicketOnServerCallback;
            ticketEl.drawUI();
        });

    }

}