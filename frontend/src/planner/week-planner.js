import { css, html, LitElement } from 'lit-element';
import './day-planner.js';

export class WeekPlanner extends LitElement {
  static get properties() {
    return {
      title: { type: String },
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

      .title {
        margin: 12px;
      }

      .days-container {
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
    this.title = 'Who Gets What Planner';
    this.data = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // fetch('/planner/week/2020/0')
    //     .then(response => response.json())
    //     .catch((e) => {
    //       console.log("Failed to fetch week planner", e);
    //     }).bind(this)
  }

  render() {
    return html`
      <div class="week-planner">
        <div class="title">${this.title}</div>

        <div class="days-container">
          ${this.data.map(
            item =>
              html`
                <day-planner title=${item.title} slots=${JSON.stringify(item.slots)}></day-planner>
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
