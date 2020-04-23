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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      main span {
        margin: 12px;
        display: block;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      .shapes,
      .field {
        display: flex;
        align-items: center;
      }

      .field > label {
        padding: 20px;
      }

      .field > input {
        line-height: 2em;
        padding: 0.3em;
        min-width: 400px;
        font-size: 1em;
      }

      .planner {
        column-count: 5;
        column-gap: 50px;
      }
    `;
  }

  constructor() {
    super();
    this.caption = 'Who Gets What Planner';
  }

  render() {
    return html`
      <main>
        <div>${this.caption}</div>

        <div class="planner">
          <day-planner caption="Monday"></day-planner>
          <day-planner caption="Tuesday"></day-planner>
          <day-planner caption="Wednesday"></day-planner>
          <day-planner caption="Thursday"></day-planner>
          <day-planner caption="Friday"></day-planner>
        </div>
      </main>

      <p class="app-footer">
        Made with love and passion by: Chris Birch, James Emmott, Christine Nagadya, Jyoti Singh and
        Albert Attard
      </p>
    `;
  }
}

customElements.define('week-planner', WeekPlanner);
