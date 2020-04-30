import { css, html, LitElement } from 'lit-element';
import { WhoGetsWhatModel } from './who-gets-what-model.js';

export class WhoGetsWhat extends LitElement {
  static get properties() {
    return {
      caption: String,
      model: WhoGetsWhatModel,
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
      .title {
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
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

      .ppeTypes,
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

      .ppeTypes > div:first-child {
        margin-left: 0px;
      }

      .ppeTypes > div {
        margin-left: 10px;
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

      button {
        padding: 20px;
        font-size: 1em;
        margin: 10px auto;
      }
      .error {
        color: red;
        font-size: 0.9em;
      }

      .navigation {
      }
    `;
  }

  constructor() {
    super();
    this.caption = 'Who Gets What';
    this.model = new WhoGetsWhatModel();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.model.updateField(name, value);
    this.requestUpdate('model');
  }

  requestPPE() {
    this.model.validate();
    this.requestUpdate('model');
  }

  showError(field) {
    const error = this.model.getErrorAgainst(field);
    if (error) {
      return html`
        <span class="error">${error}</span>
      `;
    }
    return '';
  }

  render() {
    return html`
      <main>
        <div class="navigation">
          <a href="/planner.html">Planner</a>
        </div>
        <div class="title">${this.caption}</div>

        <div class="field">
          <label for="name"><b>Name:</b></label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            .value="${this.model.name}"
            @change="${this.handleChange}"
          />
          ${this.showError('name')}
        </div>

        <div class="field">
          <label for="ppeType"><b>PPE Type:</b></label>
          <div class="ppeTypes">
            <input
              type="radio"
              name="ppeType"
              aria-label="square"
              id="square"
              value="square"
              @change=${this.handleChange}
              ?checked="${this.model.ppeType === 'square'}"
            />
            <label for="square" class="square"></label>

            <input
              type="radio"
              name="ppeType"
              aria-label="circle"
              id="circle"
              value="circle"
              @change=${this.handleChange}
              ?checked="${this.model.ppeType === 'circle'}"
            />
            <label for="circle" class="circle"></label>

            <input
              type="radio"
              name="ppeType"
              aria-label="triangle"
              id="triangle"
              value="triangle"
              @change=${this.handleChange}
              ?checked="${this.model.ppeType === 'triangle'}"
            />
            <label for="triangle" class="triangle"></label>
            ${this.showError('ppeType')}
          </div>
        </div>

        <button id="request-ppe" @click="${this.requestPPE}">Request PPE</button>
        <div class="success">${this.model.message}</div>
      </main>

      <p class="app-footer">
        Made with love and passion by: Chris Birch, James Emmott, Christine Nagadya, Jyoti Singh,
        Sai Charan and Albert Attard
      </p>
    `;
  }
}

customElements.define('who-gets-what', WhoGetsWhat);
