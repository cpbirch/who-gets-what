import { expect } from '@open-wc/testing';
import { WhoGetsWhatModel } from '../../src/who-gets-what/who-gets-what-model.js';

describe('Who Gets What Model', () => {
  describe('validate', () => {
    it('should add an error when invoked without user name', () => {
      const whoGetsWhat = new WhoGetsWhatModel();

      whoGetsWhat.validate();
      expect(whoGetsWhat.errors.name).to.eq('Name is mandatory');
    });

    it('should not add an error on name when invoked with user name', () => {
      const whoGetsWhat = new WhoGetsWhatModel();
      whoGetsWhat.name = 'foo';

      whoGetsWhat.validate();
      expect(whoGetsWhat.errors.name).to.be.undefined;
    });
  });

  describe('getErrorAgainst', () => {
    it('should get error against a field', () => {
      const whoGetsWhat = new WhoGetsWhatModel();

      whoGetsWhat.errors.name = 'Name error';

      expect(whoGetsWhat.getErrorAgainst('name')).to.eq('Name error');
    });

    it('should return undefined if no error against the field exists', () => {
      const whoGetsWhat = new WhoGetsWhatModel();

      expect(whoGetsWhat.getErrorAgainst('selectedShape')).to.be.undefined;
    });
  });
});
