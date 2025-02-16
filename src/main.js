import { DB } from "./db/db.js";

// Classe pour gérer les participants
class Participant {
  constructor(data) {
    this.university = data.university;
    this.program = data.program;
    this.level = data.level;
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.phone = data.phone;
    this.phone_indicator = data.phone_indicator;
  }

  getFullPhoneNumber() {
    return `${this.phone_indicator}${this.phone}`;
  }

  getDisplayInfo() {
    return `
      <div class="participant-card">
        <h3>${this.name}</h3>
        <p>Université: ${this.university}</p>
        <p>Programme: ${this.program}</p>
        <p>Niveau: ${this.level}</p>
        <p>Téléphone: ${this.getFullPhoneNumber()}</p>
      </div>
    `;
  }
}

// Classe pour gérer l'interface utilisateur
class UserInterface {
  constructor() {
    this.messageInput = document.querySelector('.message-input');
    this.participantList = document.querySelector('.participant-list');
    this.sendButton = document.querySelector('button');
  }

  displayParticipants(participants) {
    this.participantList.innerHTML = participants
      .map(participant => participant.getDisplayInfo())
      .join('');
  }

  getMessage() {
    return this.messageInput.value.trim();
  }

  addSendListener(callback) {
    this.sendButton.addEventListener('click', callback);
  }
}

// Classe pour gérer l'envoi des SMS
class SMSService {
  async sendBulkSMS(participants, message) {
    try {
      const requests = participants.map(participant =>
        this.sendSMS(participant.getFullPhoneNumber(), message)
      );
      await Promise.all(requests);
      alert('Messages envoyés avec succès!');
    } catch (error) {
      alert('Erreur lors de l\'envoi des messages: ' + error.message);
    }
  }

  async sendSMS(phoneNumber, message) {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`SMS envoyé à ${phoneNumber}: ${message}`);
        resolve();
      }, 1000);
    });
  }
}

// Classe principale de l'application
class App {
  constructor(database) {
    this.participants = database[0].participants.map(data => new Participant(data));
    this.ui = new UserInterface();
    this.smsService = new SMSService();
    this.initialize();
  }

  initialize() {
    this.ui.displayParticipants(this.participants);
    this.ui.addSendListener(() => this.handleSendClick());
  }

  async handleSendClick() {
    const message = this.ui.getMessage();
    if (!message) {
      alert('Veuillez entrer un message');
      return;
    }
    await this.smsService.sendBulkSMS(this.participants, message);
  }
}

// Style CSS
const style = document.createElement('style');
style.textContent = `
  :root {
    --primary-blue: #1a237e;
    --primary-red: #d32f2f;
    --primary-white: #ffffff;
    --primary-black: #212121;
  }

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: var(--primary-white);
    color: var(--primary-black);
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: var(--primary-blue);
    text-align: center;
    margin-bottom: 30px;
  }

  .message-input {
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid var(--primary-blue);
    border-radius: 5px;
    resize: vertical;
  }

  button {
    background-color: var(--primary-red);
    color: var(--primary-white);
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-bottom: 20px;
  }

  button:hover {
    background-color: #b71c1c;
  }

  .participant-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .participant-card {
    background-color: var(--primary-white);
    border: 2px solid var(--primary-blue);
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .participant-card h3 {
    color: var(--primary-red);
    margin-top: 0;
    margin-bottom: 10px;
  }

  .participant-card p {
    margin: 5px 0;
    color: var(--primary-black);
  }
`;

document.head.appendChild(style);

// Initialisation de l'application
const app = new App(DB);