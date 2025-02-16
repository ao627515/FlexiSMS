import axios from '../../node_modules/axios/dist/esm/axios.min.js';
import { AquilasConf } from '../conf/AquilasConf.js';

export class SMSSender {
  static #INTANCE = null;

  constructor() {
    if (SMSSender.#INTANCE) {
      return SMSSender.#INTANCE;
    }
    this.resource = 'sms';
    this.apiEndpoint = `${AquilasConf.apiDomaine}/${this.resource}`;
    this.apiKey = AquilasConf.apiKey;
    this.senderName = AquilasConf.senderName;
    SMSSender.#INTANCE = this;
  }

  static getIntance() {
    if (!SMSSender.#INTANCE) {
      return new SMSSender();
    }
  }

  /**
   * Envoie un SMS à une liste de participants.
   *
   * @param {string} message - Le texte du SMS.
   * @param {Array} participants - Tableau d'objets possédant la propriété fullPhoneNumber.
   * @param {string|null} sendAt - (Optionnel) Date et heure d'envoi au format "HH:mm DDMMYYYY".
   * @returns {Promise<Object>} - La réponse de l'API.
   */
  async send(message, participants, sendAt = null) {
    // Préparation des numéros de téléphone : suppression des espaces
    const recipients = participants.map(p =>
      p.fullPhoneNumber.replace(/\s+/g, '')
    );

    console.log(recipients);


    // return;

    const payload = {
      from: this.senderName,
      text: message,
      to: recipients
    };

    if (sendAt) {
      payload.send_at = sendAt;
    }

    try {
      const response = await axios.post(
        `${this.apiEndpoint}`,
        payload,
        {
          headers: {
            'X-AUTH-TOKEN': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      // Vérification du code HTTP et du flag de succès dans la réponse
      if (response.status !== 200 || !response.data.success) {
        throw new Error(`Erreur API: ${response.data.message || response.statusText}`);
      }

      console.log('SMS envoyés avec succès', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l’envoi des SMS :', error.response?.data || error.message);
      throw new Error('Échec de l’envoi des SMS');
    }
  }
}


