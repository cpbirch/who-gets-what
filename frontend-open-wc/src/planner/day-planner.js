import { css, html, LitElement } from 'lit-element';

export class DayPlanner extends LitElement {
  static get properties() {
    return {
      caption: { type: String },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.caption = '';
  }

  render() {
    return html`
      <div class="caption">${this.caption}</div>
    `;
  }
}

customElements.define('day-planner', DayPlanner);
