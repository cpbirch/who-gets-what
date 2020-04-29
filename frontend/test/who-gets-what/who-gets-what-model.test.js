import { expect } from '@open-wc/testing';

import { WhoGetsWhatModel } from '../../src/who-gets-what/who-gets-what-model.js';

describe('Who Gets What Model', () => {
  let model;

  beforeEach(() => {
    model = new WhoGetsWhatModel();
  });

  describe('validate', () => {
    it('should add an error when invoked without user name', () => {
      model.validate();
      expect(model.errors.name).to.eq('Name is mandatory');
      expect(model.isValid).to.be.false;
    });

    it('should not add an error on name when invoked with user name', () => {
      model.name = 'foo';

      model.validate();
      expect(model.errors).to.not.have.property('name');
    });

    it('should add an error when invoked without specifying the PPE type', () => {
      model.validate();
      expect(model.errors.ppeType).to.eq('PPE type is mandatory');
      expect(model.isValid).to.be.false;
    });

    it('should not add an error on name when invoked with the PPE Type specified', () => {
      model.ppeType = 'square';

      model.validate();
      expect(model.errors).to.not.have.property('ppeType');
    });
    it('should not add any error when invoked with all mandatory fields', () => {
      model.ppeType = 'square';
      model.name = 'foo';

      model.validate();
      expect(model.errors).to.be.empty;
      expect(model.isValid).to.be.true;
    });

    it('should not display success message when there are validation errors', () => {
      model.errors = { name: 'Name is mandatory' };
      model.validate();
      expect(model).to.not.have.property('message');
    });

    it('should set message to success when invoked with all mandatory fields', () => {
      model.ppeType = 'square';
      model.name = 'foo';

      model.validate();
      expect(model.message).to.eq(
        'Your request has been placed successfully, allocation is pending.',
      );
    });
  });

  describe('getErrorAgainst', () => {
    it('should get error against a field', () => {
      model.errors.name = 'Name error';

      expect(model.getErrorAgainst('name')).to.eq('Name error');
    });

    it('should return undefined if no error against the field exists', () => {
      model.errors.name = 'Name error';
      expect(model.getErrorAgainst('ppeType')).to.be.undefined;
    });
  });

  describe('updateField', () => {
    it('should delete the name field from the errors property', () => {
      model.errors.name = 'Name error';

      expect(model.errors).to.have.property('name');
      model.updateField('name', 'Joe Doe');
      expect(model.errors).to.not.have.property('name');
    });

    it('should delete the ppeType field from the errors property', () => {
      model.errors.ppeType = 'ppeType error';

      expect(model.errors).to.have.property('ppeType');
      model.updateField('ppeType', 'circle');
      expect(model.errors).to.not.have.property('ppeType');
    });

    it('should update the name property to the provided value', () => {
      expect(model.name).to.not.equal('Joe Doe');
      model.updateField('name', 'Joe Doe');
      expect(model.name).to.equal('Joe Doe');
    });
  });
});
