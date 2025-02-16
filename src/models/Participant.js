export class Participant {
  constructor(data) {
    this.university = data.university;
    this.program = data.program;
    this.level = data.level;
    this.name = data.name;
    this.phone = data.phone.match(/.{1,2}/g).join(' ');
    this.phoneIndicator = data.phone_indicator;
  }

  get fullPhoneNumber() {
    return `${this.phoneIndicator} ${this.phone}`;
  }

  toObject() {
    return {
      name: this.name,
      university: this.university,
      program: this.program,
      level: this.level,
      phone: this.fullPhoneNumber
    };
  }
}