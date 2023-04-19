import TicketBoard from "./js/components/TicketBoard/TicketBoard";

const helpDeskWrapper = document.querySelector('.helpDesk-wrapper');

const ticketBoard = new TicketBoard(helpDeskWrapper);

ticketBoard.drawUI();
