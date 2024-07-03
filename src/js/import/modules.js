import Header from "%modules%/header/header";
import more from "./more";
import hideShowBlock from "./hideShowBlock";
import Modal from "./modal";

import cardAdMap from "%modules%/card-ad-map/index";
import Sidebar from "%modules%/catalog-sidebar/index";
import review from "%modules%/review/index";
import cardAdRelative from "%modules%/card-ad-relative/index";
import cardRatingModal from "%modules%/card-rating-modal/index";
import article from "%modules%/news/index";
import firstScreen from "%modules%/first-screen/index";
import partners from "%modules%/partners/index";
import mainAdvantages from "%modules%/main-advantages/index";

addEventListener('DOMContentLoaded', () => {
  more('.card-ad-top__list ul li', '.card-ad-top__list .card-ad-top__table-more .open-more2', 6)

  more('.card-ad-top__table--harakteristitki tr', '.card-ad-top__table--harakteristitki .card-ad-top__table-more .open-more', 4)

  more('.card-ad-description__content ul li', '.card-ad-description__more .open-more2', 1)

  more('.catalog-update__top2 .switch-train li', '.catalog-update__top2 .btn4', 6)

  hideShowBlock('.article .article__nav .article-nav__list', '.article .article__nav .open-more2')

  cardAdMap()
  review()
  cardAdRelative('.card-ad-relative')
  cardRatingModal()
  article()
  firstScreen()
  partners()
  mainAdvantages()
  window.app = {
    header: new Header(),
    textSellerModal: new Modal('text-seller'),
    tabReqModal: new Modal('tab-req'),
    ratingModal: new Modal('rating'),
    sortCatalogModal: new Modal('sort-catalog'),
    newsSubsModal: new Modal('news-subs'),
    sidebar: new Sidebar(),
  }
})
