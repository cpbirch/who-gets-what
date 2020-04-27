import { expect, fixture, html } from '@open-wc/testing';
import '../../src/planner/day-planner.js';

describe('Day Planner', () => {
  it('renders default planner', async () => {
    const planner = await fixture(
      html`
        <day-planner></day-planner>
      `,
    );

    const caption = planner.shadowRoot.querySelector('div[class=title]');
    expect(caption).to.exist;
    expect(caption.textContent).to.contain('Day Planner');

    const blocksContainer = planner.shadowRoot.querySelector('div[class=slots-container]');
    expect(blocksContainer).to.exist;
  });

  it('renders caption', async () => {
    const title = 'Test Day';
    const planner = await fixture(
      html`
        <day-planner title="${title}"></day-planner>
      `,
    );

    const element = planner.shadowRoot.querySelector('div[class=title]');
    expect(element).to.exist;
    expect(element.textContent).to.contain(title);
  });

  it('renders blocks', async () => {
    const slots = [
      { title: 'AA', state: 'free' },
      { title: 'BB', state: 'free' },
      { title: 'CC', state: 'free' },
    ];
    const planner = await fixture(
      html`
        <day-planner slots=${JSON.stringify(slots)}></day-planner>
      `,
    );

    const elements = planner.shadowRoot.querySelectorAll('div[class="slot free"]');
    expect(elements).to.exist;
    expect(elements.length).to.eq(3);
  });
});
