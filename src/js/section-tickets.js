const totalPrice = document.querySelector(".total-price");
const labelList = document.querySelectorAll(".tickets label");
const basicTicketsInput = document.querySelector(".basic-tickets-amount");
const seniorTicketsInput = document.querySelector(".senior-tickets-amount");
const ticketsInputButtonList = document
  .querySelector(".amount")
  .querySelectorAll("button");
let ticketTypeCost = 20;

labelList.forEach((item) =>
  item.addEventListener("click", function (e) {
    if (e.target.tagName != "LABEL") return;

    if (e.target.classList.contains("active")) {
      return;
    } else {
      Array.from(labelList).map((item) => item.classList.remove("active"));
      e.target.classList.add("active");

      if (e.target.classList.contains("permanent")) {
        sessionStorage.setItem("ticketType", "permanent");
      } else if (e.target.classList.contains("temporary")) {
        sessionStorage.setItem("ticketType", "temporary");
      } else if (e.target.classList.contains("combined")) {
        sessionStorage.setItem("ticketType", "combined");
      }

      priceRecount();
    }
  }),
);

ticketsInputButtonList.forEach((item) =>
  item.addEventListener("click", () => {
    priceRecount();
    sessionStorage.setItem(
      "basicTicketsInputValue",
      `${basicTicketsInput.value}`,
    );
    sessionStorage.setItem(
      "seniorTicketsInputValue",
      `${seniorTicketsInput.value}`,
    );
  }),
);

function priceRecount() {
  switch (sessionStorage.getItem("ticketType")) {
    case "permanent":
      ticketTypeCost = 20;
      break;
    case "temporary":
      ticketTypeCost = 25;
      break;
    case "combined":
      ticketTypeCost = 40;
      break;
  }

  totalPrice.textContent =
    ticketTypeCost * basicTicketsInput.value +
    (ticketTypeCost / 2) * seniorTicketsInput.value;
}

let basicTicketsInputValue = sessionStorage.getItem("basicTicketsInputValue");
let seniorTicketsInputValue = sessionStorage.getItem("seniorTicketsInputValue");
let ticketTypeValue = sessionStorage.getItem("ticketType");

function checksessionStorage() {
  basicTicketsInputValue = sessionStorage.getItem("basicTicketsInputValue");
  seniorTicketsInputValue = sessionStorage.getItem("seniorTicketsInputValue");
  ticketTypeValue = sessionStorage.getItem("ticketType");

  if (basicTicketsInputValue) basicTicketsInput.value = basicTicketsInputValue;

  if (seniorTicketsInputValue)
    seniorTicketsInput.value = seniorTicketsInputValue;

  if (ticketTypeValue) {
    labelList.forEach((item) => {
      item.classList.remove("active");

      if (item.classList.contains(sessionStorage.getItem("ticketType")))
        item.classList.add("active");
    });
  }
}

checksessionStorage();
priceRecount();

export { checksessionStorage, priceRecount };
