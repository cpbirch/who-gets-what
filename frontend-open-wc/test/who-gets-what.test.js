import { expect, fixture, html } from '@open-wc/testing';
import '../src/who-gets-what.js';

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

    it('renders shapes as radio buttons', () => {
      const square = element.shadowRoot.getElementById('square');
      const circle = element.shadowRoot.getElementById('circle');
      const triangle = element.shadowRoot.getElementById('triangle');
      expect(square).to.exist;
      expect(circle).to.exist;
      expect(triangle).to.exist;
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
});
