import { css, html, LitElement } from 'lit-element';

export class DayPlanner extends LitElement {
  static get properties() {
    return {
      caption: { type: String },
      blocks: { type: Array },
    };
  }

  static get styles() {
    return css`
      .caption {
        height: 48px;
        background-color: white;
        border: 1px solid lightgray;
        color: black;
      }

      .blocks-container {
        column-count: 1;
      }

      .block {
        background-color: blue;
        color: white;
        display: flex;
        flex-direction: column;
      }
    `;
  }

  constructor() {
    super();
    this.caption = 'Day Planner';
    this.blocks = [];
  }

  render() {
    return html`
      <div class="caption">${this.caption}</div>

      <div class="blocks-container">
        ${this.blocks.map(
          item =>
            html`
              <div class="block">${item}</div>
            `,
        )}
      </div>
    `;
  }
}

customElements.define('day-planner', DayPlanner);
