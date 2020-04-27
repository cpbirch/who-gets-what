import { expect, fixture, html } from '@open-wc/testing';
import '../../src/planner/day-planner.js';

describe('Day Planner', () => {
  it('renders default planner', async () => {
    const planner = await fixture(
      html`
        <day-planner></day-planner>
      `,
    );

    const caption = planner.shadowRoot.querySelector('div[class=caption]');
    expect(caption).to.exist;
    expect(caption.textContent).to.contain('Day Planner');

    const blocksContainer = planner.shadowRoot.querySelector('div[class=blocks-container]');
    expect(blocksContainer).to.exist;
  });

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

  it('renders blocks', async () => {
    const blocks = ['AA', 'BB', 'CC'];
    const planner = await fixture(
      html`
        <day-planner blocks=${JSON.stringify(blocks)}></day-planner>
      `,
    );

    const elements = planner.shadowRoot.querySelectorAll('div[class=block]');
    expect(elements).to.exist;
    expect(elements.length).to.eq(3);
  });
});
