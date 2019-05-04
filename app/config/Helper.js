export function currencyFormat(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateTotalPrice(items) {
  let amounts = 0;

  for (let item of items) {
    if (item.selected_type == "pcs") {
      amounts += item.quantity * item.price_piece;
    } else {
      amounts += item.quantity * item.price_box;
    }
  }

  return amounts;
}

export function formatDate(date) {
  date = date.replace(/-/gi, "/");
  date = new Date(date);
  date = date.toDateString();

  return date;
}

export function formatStatus(status) {
  switch (status) {
    case "WAITING_OFFER":
      return "Waiting Offer";
    case "OFFER_RECEIVED":
      return "Offer Received";
    case "OFFER_AGREED":
      return "Offer Agreed";
    case "OFFER_REJECTED":
      return "Offer Rejected";
    case "WAITING_PAYMENT":
      return "Waiting Payment";
    case "PAYMENT_CONFIRMED":
      return "Payment Confirmed";
    case "ORDER_FINISHED":
      return "Finished";
    case "ORDER_CANCELED":
      return "Canceled";
    default:
      return "Unknown";
  }
}

export function getCurrentPosition() {
  return new Promise(navigator.geolocation.getCurrentPosition);
}
