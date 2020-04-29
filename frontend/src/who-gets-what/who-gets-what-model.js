export class WhoGetsWhatModel {
  constructor() {
    this.name = '';
    this.ppeType = '';
    this.errors = {};
  }

  validate() {
    if (!this.name.trim()) this.errors.name = 'Name is mandatory';
    if (!this.ppeType) this.errors.ppeType = 'PPE type is mandatory';
  }

  get isValid() {
    return Object.keys(this.errors).length === 0;
  }

  getErrorAgainst(field) {
    return this.errors[field];
  }

  updateField(name, value) {
    if (name in this.errors) {
      delete this.errors[name];
    }
    this[name] = value;
  }
}
