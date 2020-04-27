import { expect, fixture, html } from '@open-wc/testing';
import '../../src/planner/week-planner.js';

describe('Week Planner', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <week-planner></week-planner>
    `);
  });

  describe('General', () => {
    it('renders footer', () => {
      const footer = element.shadowRoot.querySelector('p[class=app-footer]');
      expect(footer).to.exist;
      expect(footer.textContent).to.contain('Made with love and passion by');
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
});
