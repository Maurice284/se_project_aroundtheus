export default class Card {
  constructor(
    { isLiked, name, link, _id },
    cardSelector,
    handleCardImageClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this.id = _id;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    //click the card's image to open the preview-image modal
    this._cardImageEl.addEventListener("click", () => {
      this._handleCardImageClick(this._name, this._link);
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this.id;
  }

  updateLikesView() {
    this._likeButton.classList.toggle("card__like-button_liked");
    this._isLiked = !this._isLiked;
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //select the image element within cardElement
    //seelect the title element withtin cardElement

    //set the src of the image element to be the link of the card

    //set the text content of the title element to be the name of the card

    // set event listners

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    // check if the card is liked on the server. If it is, we make it look liked on the dom.
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_liked");
    }
    this._setEventListeners();
    return this._cardElement;
    //return the card
  }
}
