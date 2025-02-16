import { DB } from "./db/db.js";
import { ParticipantRenderer } from "./services/ParticipantRenderer.js";
import { SMSHandler } from "./services/SMSHandler.js";
import { Participant } from "./models/Participant.js";

export class App {
  static #INTANCE = null;

  constructor() {
    if (App.#INTANCE) {
      return App.#INTANCE;
    }

    App.#INTANCE = this;

    this.db = DB;
    this.participants = this.loadParticipants();
    this.renderer = new ParticipantRenderer('.participant-list');
    this.smsHandler = new SMSHandler();
    this.initializeUI();
  }

  static getIntance() {
    if (!App.#INTANCE) {
      return new App();
    }
  }

  run() {
    console.log('app run');
  }

  loadParticipants() {
    return this.db.flatMap(formation =>
      formation.participants.map(p => new Participant(p))
    );
  }

  initializeUI() {
    this.renderer.render(this.participants.map(p => p.toObject()));
    document.querySelector('button').addEventListener('click', () => this.handleSend());
  }

  async handleSend() {
    const message = document.querySelector('.message-input').value;
    if (!message.trim()) {
      alert('Veuillez saisir un message valide');
      return;
    }

    try {
      await this.smsHandler.send(message, this.participants);
      alert('Messages envoyés avec succès !');
    } catch (error) {
      alert('Une erreur est survenue lors de l\'envoi des messages');
    }
  }
}
