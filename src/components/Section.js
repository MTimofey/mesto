// создание секции с карточками 
class Section {
  constructor({ renderer }, validationConfig) {
    this._renderer = renderer;
    this._container = document.querySelector(validationConfig);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  removeCard(item) {
    this._container.remove(item);
  }

  renderItems(items) {
    for (let i = items.length - 1; i > -1; i--) {
      this._renderer(items[i]);
    }
  }
};

// экспорты
export { Section };
