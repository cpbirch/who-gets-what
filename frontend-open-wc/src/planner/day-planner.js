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

      .title {
        background-color: #ffffff;
        border: 1px solid #708090;
        color: black;
        margin: auto;
        padding: 10px;
        font-size: 22pt;
      }

      .slots-container {
        display: flex;
        flex-direction: column;
      }

      .slot {
        border: 1px solid #000066;
        color: white;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .free {
        background-color: #eeeeee;
        color: #222222;
      }

      .taken {
        background-color: #0000ff;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Day Planner';
    this.slots = [];
  }

  render() {
    return html`
      <div class="day-planner">
        <div class="title">${this.title}</div>
        <div class="slots-container">
          ${this.slots.map(
            slot =>
              html`
                <div class=${`slot ${slot.state}`}>${slot.title}</div>
              `,
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('day-planner', DayPlanner);
