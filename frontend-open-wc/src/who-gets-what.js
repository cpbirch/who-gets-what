import { css, html, LitElement } from 'lit-element';

export class WhoGetsWhat extends LitElement {
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

      .shapes > div:first-child {
        margin-left: 0px;
      }

      .shapes > div {
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
    `;
  }

  constructor() {
    super();
    this.caption = 'Who Gets What';
  }

  render() {
    return html`
      <main>
        <div>${this.caption}</div>

        <div class="field">
          <label for="name"><b>Name:</b></label>
          <input type="text" name="name" aria-label="name" id="name" />
        </div>

        <div class="field">
          <label for="shape"><b>Shape:</b></label>
          <div class="shapes">
            <input type="radio" name="shapes" aria-label="square" id="square" value="square" />
            <label for="square" class="square"></label>

            <input type="radio" name="shapes" aria-label="circle" id="circle" value="circle" />
            <label for="circle" class="circle"></label>

            <input
              type="radio"
              name="shapes"
              aria-label="triangle"
              id="triangle"
              value="triangle"
            />
            <label for="triangle" class="triangle"></label>
          </div>
        </div>
      </main>

      <p class="app-footer">
        Made with love and passion by: Chris Birch, James Emmott, Christine Nagadya, Jyoti Singh and
        Albert Attard
      </p>
    `;
  }
}

customElements.define('who-gets-what', WhoGetsWhat);
