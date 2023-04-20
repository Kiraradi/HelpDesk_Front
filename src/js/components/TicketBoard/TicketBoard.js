import { SERVERURL } from "../../consts";
import ChangesPopup from "../ChangesPopup/ChangesPopup";
import './TicketBoard.css';
import Ticket from "../Ticket/Ticket";

export default class TicketBoard {
    constructor(container) {
        this.container = container;
        this.addTicketCollback = this.addTicketCollback.bind(this);
        this.createTicketCollback = this.createTicketCollback.bind(this);
        this.removeTaskOnServerCallback = this.removeTaskOnServerCallback.bind(this);
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

    createTicketCollback(shortDescription, detailedDescription) {
        
        this.addTicketOnServer(shortDescription, detailedDescription).then((resolve) => {
            
            const ticketEl = new Ticket(this.ticketList, resolve);
            ticketEl.removeTaskOnServerCallback = this.removeTaskOnServerCallback;
            ticketEl.drawUI();
        });

    }

    async addTicketOnServer(shortDescription, detailedDescription) {
        const ticket = {
            shortDescription,
            detailedDescription,
        }

        let response = await fetch(SERVERURL, {
            method: 'POST',
            body: JSON.stringify(ticket)
        });

        let result = await response.json();
        
        return result;
    }

    async removeTaskOnServerCallback(id) {
        let response = await fetch(`${SERVERURL}?method=ticketById&id=${id}`, {
            method: 'DELETE'
        });
    }
}