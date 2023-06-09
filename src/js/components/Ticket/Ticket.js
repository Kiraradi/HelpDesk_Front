import "./Ticket.css";
import RequestService from "../../services/requestService";
import ChangesPopup from "../ChangesPopup/ChangesPopup";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
export default class Ticket {
  constructor(container, ticket, isLoadedPage) {
    this.container = container;
    this.ticket = ticket;
    this.isLoadedPage = isLoadedPage;
    this.changeTicketCallback = this.changeTicketCallback.bind(this);
  }

  drawUI() {
    this.ticketEl = document.createElement("li");
    this.ticketEl.classList.add("ticket");
    this.ticketEl.setAttribute("data-id", this.ticket.id);
    this.ticketEl.appendChild(this.getCheckboxEl());
    this.ticketEl.appendChild(this.getDescriptionEl());
    this.ticketEl.appendChild(this.getCreationTimeEl());
    this.ticketEl.appendChild(this.getButtonsEl());

    this.container.appendChild(this.ticketEl);
    this.ticketEl.addEventListener("click", (e) => {
      if (e.target.closest(".button")) {
        return;
      }

      if (
        !this.detailedDescription.classList.contains(
          "detailed-description__active"
        )
      ) {
        this.detailedDescription.classList.add("detailed-description__active");
        let height = this.descriptionWraperEl.getBoundingClientRect().height;
        height =
          height + this.detailedDescription.getBoundingClientRect().height;
        this.descriptionWraperEl.style.height = `${height}px`;
      } else {
        this.detailedDescription.classList.remove(
          "detailed-description__active"
        );
        this.descriptionWraperEl.style = "";
      }
    });
  }

  getCheckboxEl() {
    const checkboxWraperEl = document.createElement("div");
    checkboxWraperEl.classList.add("checkbox-wraper");

    const checkboxEl = document.createElement("button");
    checkboxEl.classList.add("checkbox-ticket", "button");
    checkboxWraperEl.appendChild(checkboxEl);

    if (this.isLoadedPage && this.ticket.status) {
      checkboxEl.classList.add("checkbox-ticket__active");
    }

    checkboxEl.addEventListener("click", () => {
      checkboxEl.classList.toggle("checkbox-ticket__active");
      this.ticket.status = !this.ticket.status;
      RequestService.changeTicketOnServer(this.ticket);
    });

    return checkboxWraperEl;
  }

  getDescriptionEl() {
    this.descriptionWraperEl = document.createElement("div");
    this.descriptionWraperEl.classList.add("description-wraper");

    this.shortDescription = document.createElement("div");
    this.shortDescription.classList.add("short-description", "description");
    this.shortDescription.textContent = this.ticket.name;
    this.descriptionWraperEl.appendChild(this.shortDescription);

    this.detailedDescription = document.createElement("div");
    this.detailedDescription.classList.add(
      "detailed-description",
      "description"
    );
    this.detailedDescription.innerHTML = this.ticket.description.replace(
      /\n/g,
      "<br>"
    );
    this.descriptionWraperEl.appendChild(this.detailedDescription);

    return this.descriptionWraperEl;
  }

  getCreationTimeEl() {
    const creationTimeEl = document.createElement("div");
    creationTimeEl.classList.add("creation-time");
    creationTimeEl.textContent = this.ticket.created;

    return creationTimeEl;
  }

  getButtonsEl() {
    const buttonsWraper = document.createElement("div");
    buttonsWraper.classList.add("buttons-wraper-ticket");

    const changeButton = document.createElement("button");
    changeButton.classList.add("change-button", "button");
    changeButton.textContent = "✎";

    buttonsWraper.appendChild(changeButton);

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button", "button");
    closeButton.textContent = "X";

    buttonsWraper.appendChild(closeButton);

    changeButton.addEventListener("click", () => {
      const isOpenPopup = document.querySelector(".popup");
      if (!isOpenPopup) {
        const helpDeskWrapperEl = document.querySelector(".helpDesk-wrapper");
        const changesPopup = new ChangesPopup(
          helpDeskWrapperEl,
          false,
          this.ticket
        );
        changesPopup.changeTicketCallback = this.changeTicketCallback;
        changesPopup.drawUI();
      }
    });

    closeButton.addEventListener("click", () => {
      const isOpenPopup = document.querySelector(".popup");
      if (!isOpenPopup) {
        const helpDeskWrapperEl = document.querySelector(".helpDesk-wrapper");

        const deletePopup = new DeletionPopup(helpDeskWrapperEl, this.ticketEl);
        deletePopup.drawUI();
      }
    });

    return buttonsWraper;
  }

  changeTicketCallback(ticket) {
    this.ticket = ticket;
    this.shortDescription.textContent = this.ticket.name;
    this.detailedDescription.innerHTML = this.ticket.description.replace(
      /\n/g,
      "<br>"
    );
  }
}
