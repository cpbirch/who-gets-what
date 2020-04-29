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

    it('should add an error when invoked without a shape', () => {
      model.validate();
      expect(model.errors.shape).to.eq('Shape is mandatory');
      expect(model.isValid).to.be.false;
    });

    it('should not add an error on name when invoked with a shape', () => {
      model.shape = 'square';

      model.validate();
      expect(model.errors).to.not.have.property('shape');
    });
    it('should not add any when invoked with all mandatory fields', () => {
      model.shape = 'square';
      model.name = 'foo';

      model.validate();
      expect(model.errors).to.be.empty;
      expect(model.isValid).to.be.true;
    });
  });

  describe('getErrorAgainst', () => {
    it('should get error against a field', () => {
      model.errors.name = 'Name error';

      expect(model.getErrorAgainst('name')).to.eq('Name error');
    });

    it('should return undefined if no error against the field exists', () => {
      expect(model.getErrorAgainst('selectedShape')).to.be.undefined;
    });
  });

  describe('updateField', () => {
    it('should delete the name field from the errors property', () => {
      model.errors.name = 'Name error';

      expect(model.errors).to.have.property('name');
      model.updateField('name', 'Joe Doe');
      expect(model.errors).to.not.have.property('name');
    });

    it('should delete the shape field from the errors property', () => {
      model.errors.shape = 'Shape error';

      expect(model.errors).to.have.property('shape');
      model.updateField('shape', 'circle');
      expect(model.errors).to.not.have.property('shape');
    });

    it('should update the name property to the provided value', () => {
      expect(model.name).to.not.equal('Joe Doe');
      model.updateField('name', 'Joe Doe');
      expect(model.name).to.equal('Joe Doe');
    });
  });
});
