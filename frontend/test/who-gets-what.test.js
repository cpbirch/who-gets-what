import { expect, fixture, html } from '@open-wc/testing';
import { WhoGetsWhat } from '../src/who-gets-what.js';

describe('Who Gets What', () => {
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

    it('should have no errors on initial render', () => {
      const errors = element.shadowRoot.querySelectorAll('.error');
      expect(errors.length).to.equal(0);
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

    it('should render error against name if an error against name exists', async () => {
      const whoGetsWhat = await fixture(html`
        <who-gets-what .errors=${{ name: 'some error' }}></who-gets-what>
      `);
      const errorElement = whoGetsWhat.shadowRoot.querySelector('.error');
      expect(errorElement).to.exist;
      expect(errorElement.textContent).to.equal('some error');
    });
  });

  describe('requestPPE', () => {
    it('should add an error when invoked without user name', () => {
      const whoGetsWhat = new WhoGetsWhat();

      whoGetsWhat.requestPPE();
      expect(whoGetsWhat.errors.name).to.eq('Name is mandatory');
    });

    it('should not add an error on name when invoked with user name', () => {
      const whoGetsWhat = new WhoGetsWhat();
      whoGetsWhat.name = 'foo';

      whoGetsWhat.requestPPE();
      expect(whoGetsWhat.errors.name).to.be.undefined;
    });
  });

  describe('showError', () => {
    it('should add error span if there exists an error against the field', async () => {
      const whoGetsWhat = new WhoGetsWhat();
      whoGetsWhat.errors.fieldWithError = 'Error!';

      const errorElement = await fixture(whoGetsWhat.showError('fieldWithError'));
      expect(errorElement).to.exist;
      expect(errorElement.getAttribute('class')).to.equal('error');
      expect(errorElement.textContent).to.equal('Error!');
    });

    it('should not add error span if there exists no error against the field', async () => {
      const whoGetsWhat = new WhoGetsWhat();

      const errorElement = await fixture(whoGetsWhat.showError('fieldWithNoError'));
      expect(errorElement).to.not.exist;
    });
  });
});
