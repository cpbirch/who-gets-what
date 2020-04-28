export class WhoGetsWhatModel {
  constructor() {
    this.name = '';
    this.selectedShape = '';
    this.errors = {};
  }

  validate() {
    if (!this.name.trim()) this.errors.name = 'Name is mandatory';
  }

  getErrorAgainst(field) {
    return this.errors[field];
  }
}
