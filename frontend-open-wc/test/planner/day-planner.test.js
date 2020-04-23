import { expect, fixture, html } from '@open-wc/testing';
import '../../src/planner/day-planner.js';

describe('Day Planner', () => {
  it('renders caption', async () => {
    const caption = 'Test Day';
    const planner = await fixture(
      html`
        <day-planner caption="${caption}"></day-planner>
      `,
    );

    const element = planner.shadowRoot.querySelector('div[class=caption]');
    expect(element).to.exist;
    expect(element.textContent).to.contain(caption);
  });
});
