import { css, html, LitElement } from 'lit-element';
import './day-planner.js';

export class WeekPlanner extends LitElement {
  static get properties() {
    return {
      caption: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 10 auto;
        text-align: center;
      }

      .week-planner {
        display: block;
        flex-grow: 1;
      }

      .caption {
        margin: 12px;
      }

      .day-container {
        display: flex;
        justify-content: space-around;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.caption = 'Who Gets What Planner';
  }

  render() {
    const data = [
      {
        caption: 'Monday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Tuesday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Wednesday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Thursday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Friday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Saturday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
      {
        caption: 'Sunday',
        blocks: [
          { caption: 'BB', state: 'taken' },
          { caption: 'Free', state: 'free' },
          { caption: 'Free', state: 'free' },
        ],
      },
    ];

    return html`
      <div class="week-planner">
        <div class="caption">${this.caption}</div>

        <div class="day-container">
          ${data.map(
            item =>
              html`
                <day-planner
                  caption=${item.caption}
                  blocks=${JSON.stringify(item.blocks)}
                ></day-planner>
              `,
          )}
        </div>
      </div>

      <p class="app-footer">
        Made with love and passion by: Chris Birch, James Emmott, Christine Nagadya, Jyoti Singh,
        Sai Charan and Albert Attard
      </p>
    `;
  }
}

customElements.define('week-planner', WeekPlanner);
