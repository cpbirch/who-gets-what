import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/who-gets-what/who-gets-what.js';
import { WhoGetsWhatModel } from '../../src/who-gets-what/who-gets-what-model.js';

describe('Who Gets What Component', () => {
  let component;
  beforeEach(async () => {
    component = await fixture(html`
      <who-gets-what></who-gets-what>
    `);
  });

  describe('General', () => {
    it('renders footer', () => {
      const footer = component.shadowRoot.querySelector('p[class=app-footer]');
      expect(footer).to.exist;
      expect(footer.textContent).to.contain('Made with love and passion by');
    });

    it('renders name field', () => {
      const name = component.shadowRoot.getElementById('name');
      expect(name).to.exist;
    });

    it('renders shapes as radio buttons', () => {
      const square = component.shadowRoot.getElementById('square');
      const circle = component.shadowRoot.getElementById('circle');
      const triangle = component.shadowRoot.getElementById('triangle');
      expect(square).to.exist;
      expect(circle).to.exist;
      expect(triangle).to.exist;
    });

    it('renders the "Request PPE" button', () => {
      const button = component.shadowRoot.getElementById('request-ppe');
      expect(button).to.exist;
      expect(button.textContent).to.equal('Request PPE');
    });

    it('passes the a11y audit', async () => {
      await expect(component).shadowDom.to.be.accessible();
    });
  });

  describe('Handle Change', () => {
    it.skip('should be called when the name input value is changed', async () => {
      const input = await component.shadowRoot.getElementById('name');
      sinon.spy(component, 'handleChange');
      console.log('===b4');
      input.dispatchEvent(new Event('change'));
      console.log('==after');
    });

    it('should call the requestUpdate lifecycle method', () => {
      const requestUpdateSpy = sinon.spy(component, 'requestUpdate');
      component.handleChange({ target: { name: 'name', value: 'Joe Doe' } });
      expect(requestUpdateSpy).be.calledOnceWith('model');
    });

    it("should call the model's updateField method with the 'name' event values", () => {
      const requestUpdateSpy = sinon.spy(component.model, 'updateField');
      component.handleChange({ target: { name: 'name', value: 'Joe Doe' } });
      expect(requestUpdateSpy).be.calledOnceWith('name', 'Joe Doe');
    });

    it("should call the model's updateField method with the 'shape' event values", () => {
      const requestUpdateSpy = sinon.spy(component.model, 'updateField');
      component.handleChange({ target: { name: 'shape', value: 'square' } });
      expect(requestUpdateSpy).be.calledOnceWith('shape', 'square');
    });
  });

  describe('showError', () => {
    it('should not add error span if no error exists', () => {
      expect(component.shadowRoot.querySelector('.error')).to.not.exist;
    });

    it('should render error against name if an error against name exists', async () => {
      const model = new WhoGetsWhatModel();
      model.errors = { name: 'some error' };

      component = await fixture(html`
        <who-gets-what .model=${model}></who-gets-what>
      `);
      const errorcomponent = component.shadowRoot.querySelector('.error');

      expect(errorcomponent).to.exist;
      expect(errorcomponent.textContent).to.equal('some error');
    });
  });

  describe('requestPPE', () => {
    it('should call the requestUpdate lifecycle method', () => {
      sinon.spy(component, 'requestUpdate');
      component.requestPPE();
      expect(component.requestUpdate).be.calledOnceWith('model');
    });

    it('renders the success message when present', async () => {
      const model = new WhoGetsWhatModel();
      model.message = 'You rock!';

      component = await fixture(html`
        <who-gets-what .model=${model}></who-gets-what>
      `);

      const successMessage = component.shadowRoot.querySelector('.success');
      expect(successMessage.textContent).to.eq('You rock!');
    });
  });
});
