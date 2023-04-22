import RequestService from "../../services/requestService";
import ChangesPopup from "../ChangesPopup/ChangesPopup";
import './TicketBoard.css';
import Ticket from "../Ticket/Ticket";

export default class TicketBoard {
    constructor(container) {
        this.isLoadedPage = false;
        this.container = container;
        this.addTicketCollback = this.addTicketCollback.bind(this);
        this.createTicketCollback = this.createTicketCollback.bind(this);
        this.loadPage();
    }

    loadPage() {
        RequestService.getTicketsWithServer().then(resolve => {
            this.isLoadedPage = true;
            const tickets = resolve;
            this.drawUI()
            if (tickets.length > 0) {
                tickets.forEach(ticket => {
                    this.createTicketCollback(ticket);
                })
                
            }
            this.isLoadedPage = false;
        });
        
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


    createTicketCollback(ticket) {

        if (this.isLoadedPage) {
            const ticketEl = new Ticket(this.ticketList, ticket, this.isLoadedPage);
            ticketEl.removeTaskOnServerCallback = this.removeTaskOnServerCallback;
            ticketEl.changeTicketOnServerCallback = this.changeTicketOnServerCallback;
            ticketEl.drawUI(); 
        } else {
            RequestService.addTicketOnServer(ticket.name, ticket.description).then((resolve) => {
            const ticketEl = new Ticket(this.ticketList, resolve, this.isLoadedPage);
            ticketEl.removeTaskOnServerCallback = this.removeTaskOnServerCallback;
            ticketEl.changeTicketOnServerCallback = this.changeTicketOnServerCallback;
            ticketEl.drawUI();
        });
        }        

    }

}