import { css, html, LitElement } from 'lit-element';

export class DayPlanner extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      slots: { type: Array },
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
        border-width: 0px 1px 1px;
        border-color: #000066;
        border-style: solid;
        color: white;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .slot[data-state='FREE'] {
        background-color: #fafafa;
        color: #222222;
      }

      .free::after {
        content: 'FREE';
        line-height: 30px;
        font-size: 0.8em;
      }

      .square {
        height: 30px;
        width: 30px;
        background-color: blue;
      }

      .circle {
        height: 30px;
        width: 30px;
        background-color: yellow;
        border-radius: 50%;
      }

      .triangle {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 30px solid green;
      }

      .slot[data-state='TAKEN'] {
        justify-content: center;
        display: flex;
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
                <div class="slot" data-state="${slot.state}">
                  <div class="${slot.ppeType}"></div>
                </div>
              `,
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('day-planner', DayPlanner);
