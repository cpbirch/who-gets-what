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

      .logo > svg {
        margin-top: 24px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
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
      </main>

      <p class="app-footer">
        Made with love and passion by: Chris Birch, James Emmott, Christine Nagadya, Jyoti Singh and
        Albert Attard
      </p>
    `;
  }
}

customElements.define('who-gets-what', WhoGetsWhat);
