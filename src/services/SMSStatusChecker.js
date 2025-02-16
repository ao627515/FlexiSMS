import axios from '../../node_modules/axios/dist/esm/axios.min.js';
import { AquilasConf } from '../conf/AquilasConf.js';

export class SMSStatusChecker {
  static #INTANCE = null;

  constructor() {
    if (SMSStatusChecker.#INTANCE) {
      return SMSStatusChecker.#INTANCE;
    }

    this.apiEndpoint = AquilasConf.apiEndpoint;
    this.apiKey = AquilasConf.apiKey;
    SMSStatusChecker.#INTANCE = this;
  }

  static getIntance() {
    if (!SMSStatusChecker.#INTANCE) {
      return new SMSStatusChecker();
    }
  }

  /**
   * Récupère le statut des SMS envoyés grâce à leur bulk_id.
   *
   * @param {string} bulkId - L'identifiant du bulk d'envoi.
   * @returns {Promise<Array>} - Tableau des statuts de chaque SMS.
   */
  async getStatus(bulkId) {
    try {
      const response = await axios.post(
        `${this.apiEndpoint}/sms/${bulkId}`,
        {},
        {
          headers: {
            'X-AUTH-TOKEN': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error(`Erreur API: ${response.statusText}`);
      }

      console.log('Statuts récupérés avec succès', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statuts :', error.response?.data || error.message);
      throw new Error('Échec de la récupération des statuts SMS');
    }
  }
}