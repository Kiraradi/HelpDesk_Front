import { SERVERURL } from "../../consts";
import ChangesPopup from "../ChangesPopup/ChangesPopup";
import './TicketBoard.css'
export default class TicketBoard {
    constructor(container) {
        this.container = container;
        this.addTicketCollback = this.addTicketCollback.bind(this);
    }

    drawUI() {
        const bottonsContainer = document.createElement('div');
        bottonsContainer.classList.add('bottons-container');

        const addTicketButton = document.createElement('button');
        addTicketButton.classList.add('addTicket-button');
        addTicketButton.textContent = 'Добавить тикет';
        bottonsContainer.appendChild(addTicketButton);

        const ticketList = document.createElement('ul');
        ticketList.classList.add('ticket-list');
        bottonsContainer.appendChild(ticketList);

        addTicketButton.addEventListener('click', this.addTicketCollback);
        this.container.appendChild(bottonsContainer)

    }

    addTicketCollback(e) {
        console.log('ddd')
        const changesPopup = new ChangesPopup(this.container, true);

        changesPopup.drawUI();
    }
}