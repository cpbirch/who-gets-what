import { expect, fixture, html } from '@open-wc/testing';
import '../../src/who-gets-what/who-gets-what.js';
import { WhoGetsWhatModel } from '../../src/who-gets-what/who-gets-what-model.js';

describe('Who Gets What Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <who-gets-what></who-gets-what>
    `);
  });

  describe('General', () => {
    it('renders footer', () => {
      const footer = element.shadowRoot.querySelector('p[class=app-footer]');
      expect(footer).to.exist;
      expect(footer.textContent).to.contain('Made with love and passion by');
    });

    it('renders name field', () => {
      const name = element.shadowRoot.getElementById('name');
      expect(name).to.exist;
    });

    it('renders shapes as radio buttons', () => {
      const square = element.shadowRoot.getElementById('square');
      const circle = element.shadowRoot.getElementById('circle');
      const triangle = element.shadowRoot.getElementById('triangle');
      expect(square).to.exist;
      expect(circle).to.exist;
      expect(triangle).to.exist;
    });

    it('renders the "Request PPE" button', () => {
      const button = element.shadowRoot.getElementById('request-ppe');
      expect(button).to.exist;
      expect(button.textContent).to.equal('Request PPE');
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('showError', () => {
    it('should render error against name if an error against name exists', async () => {
      const model = new WhoGetsWhatModel();
      model.errors = { name: 'some error' };
      const whoGetsWhat = await fixture(html`
        <who-gets-what .model=${model}></who-gets-what>
      `);
      const errorElement = whoGetsWhat.shadowRoot.querySelector('.error');
      expect(errorElement).to.exist;
      expect(errorElement.textContent).to.equal('some error');
    });

    it('should not add error span if no error exists', async () => {
      const whoGetsWhat = await fixture(html`
        <who-gets-what .model=${new WhoGetsWhatModel()}></who-gets-what>
      `);
      const errorElement = whoGetsWhat.shadowRoot.querySelector('.error');
      expect(errorElement).to.not.exist;
    });
  });
});
