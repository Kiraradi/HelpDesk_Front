import { SERVERURL } from "../consts";
export default class RequestService {
    constructor() {

    }

    static async getTicketsWithServer() {
        let response = await fetch(`${SERVERURL}?method=allTickets`, {
            method: 'GET',
        });

        let result = await response.json();
        
        return result;
    }

    static async addTicketOnServer(shortDescription, detailedDescription) {
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

    static async removeTaskOnServer(id) {
        await fetch(`${SERVERURL}?method=ticketById&id=${id}`, {
            method: 'DELETE'
        });
    }

    static async changeTicketOnServer(ticket) {

        await fetch(`${SERVERURL}?method=change`, {
            method: 'PUT',
            body: JSON.stringify(ticket)
        });

    }
}