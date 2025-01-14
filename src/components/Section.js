export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // items is an array of the items that we want rendered on the page
  setItems(items) {
    this._items = items;
  }

  // render all the items in the 'items' array
  renderItems() {
    // loop through all the items, and render each item on the page
    this._items.forEach((item) => {
      console.log(item);
      this._renderer(item);
    });
  }

  // add an element to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
