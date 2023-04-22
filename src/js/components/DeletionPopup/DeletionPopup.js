import RequestService from "../../services/requestService";
import "./DeletionPopup.css";
export default class DeletionPopup {
  constructor(containet, ticketEl) {
    this.containet = containet;
    this.ticketEl = ticketEl;
  }

  drawUI() {
    this.popupEl = document.createElement("div");
    this.popupEl.classList.add("popup");

    const popupFormEl = document.createElement("form");
    popupFormEl.classList.add("popup-form");

    const popupTitleEl = document.createElement("h2");
    popupTitleEl.classList.add("popup-title");
    popupTitleEl.textContent = "Удалить тикет?";

    const popupWarningEl = document.createElement("div");
    popupWarningEl.classList.add("popup-warning");
    popupWarningEl.textContent =
      "Вы уверены, что хотите удалить тикет? Это действие необратимо.";

    popupFormEl.appendChild(popupTitleEl);
    popupFormEl.appendChild(popupWarningEl);
    popupFormEl.appendChild(this.getButtonsEl());

    this.popupEl.appendChild(popupFormEl);
    this.containet.appendChild(this.popupEl);

    this.popupEl.addEventListener("click", (e) => {
      if (!e.target.closest(".popup-form")) {
        this.popupEl.remove();
      }
    });
  }

  getButtonsEl() {
    const buttonsWraper = document.createElement("div");
    buttonsWraper.classList.add("buttons-wraper");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("button", "cancel-button");
    cancelButton.textContent = "Отмена";
    buttonsWraper.appendChild(cancelButton);

    const addButton = document.createElement("button");
    addButton.classList.add("button", "add-button");
    addButton.textContent = "Ок";
    buttonsWraper.appendChild(addButton);

    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.popupEl.remove();
    });
    addButton.addEventListener("click", () => {
      const id = this.ticketEl.getAttribute("data-id");
      RequestService.removeTaskOnServer(id);
      this.ticketEl.remove();
      this.popupEl.remove();
    });
    return buttonsWraper;
  }
}
