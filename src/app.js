export class App {
  static #INTANCE = null;
  constructor() {
    if (App.#INTANCE) {
      return App.#INTANCE;
    }
    App.#INTANCE = this;
  }

  static getIntance() {
    if (!App.#INTANCE) {
      return new App();
    }
  }

  run() {
    console.log('app run');
  }
}