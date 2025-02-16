export class ParticipantRenderer {
  constructor(containerSelector) {
    this.listElement = document.querySelector(containerSelector);
  }

  clearList() {
    this.listElement.innerHTML = '';
  }

  render(participants) {
    this.clearList();
    participants.forEach(participant => {
      const li = document.createElement('li');
      li.innerHTML = `
                <div class="participant-info">
                    <span>Nom:</span> ${participant.name}<br>
                    <span>Université:</span> ${participant.university}<br>
                    <span>Programme:</span> ${participant.program}<br>
                    <span>Niveau:</span> ${participant.level}<br>
                    <span>Téléphone:</span> ${participant.phone}
                </div>
            `;
      this.listElement.appendChild(li);
    });
  }
}