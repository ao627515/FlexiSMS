export class SMSHandler {
  constructor() {
    this.apiEndpoint = 'https://api.example.com/send-sms';
  }

  async send(message, participants) {
    try {
      const requests = participants.map(participant => {
        return fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: participant.phone,
            message: message
          })
        });
      });

      await Promise.all(requests);
      console.log('Tous les SMS ont été envoyés avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi des SMS:', error);
      throw error;
    }
  }
}