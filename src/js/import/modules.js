import Header from "%modules%/header/header";
import more from "./more";
import Modal from "./modal";

import cardAdMap from "%modules%/card-ad-map/index";

addEventListener('DOMContentLoaded', () => {
  more('.card-ad-top__list ul li', '.card-ad-top__table-more .open-more2', 6)

  more('.card-ad-description__content ul li', '.card-ad-description__more .open-more2', 1)

  cardAdMap()
  window.app = {
    header: new Header(),
    textSellerModal: new Modal('text-seller'),
  }
})
