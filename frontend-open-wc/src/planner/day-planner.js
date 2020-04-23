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
      .day-planner {
        height: 100vh;
      }

      .caption {
        background-color: #ffffff;
        border: 1px solid #708090;
        color: black;
        margin: auto;
        padding: 10px;
        font-size: 22pt;
      }

      .blocks-container {
        display: flex;
        flex-direction: column;
      }

      .block {
        background-color: #0000ff;
        border: 1px solid #000066;
        color: white;
        padding-top: 12px;
        padding-bottom: 12px;
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
      <div class="day-planner">
        <div class="caption">${this.caption}</div>
        <div class="blocks-container">
          ${this.blocks.map(
            item =>
              html`
                <div class="block">${item}</div>
              `,
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('day-planner', DayPlanner);
