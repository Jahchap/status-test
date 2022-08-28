import BaseComponent from "./base-component.js";
import store from "../packages/state-manager/store/index.js";

export default class PlanetCard extends BaseComponent {
  constructor(props = { items: [], elSelector: "" }) {
    super({
      store,
      el: props.elSelector ? document.querySelector(props.elSelector) : null,
    });

    this.props = props;
  }

  yield() {
    let self = this;

    if (self.props.items.length === 0) {
      self.el.innerHTML = `<p class="no-items">Items empty</p>`;
      return;
    }

    self.el.innerHTML = `
        <ul class="planet__items">
          ${self.props.items
            .map((item) => {
              return `
              <li>${item.name}<button aria-label="Delete this item">×</button></li>
            `;
            })
            .join("")}
        </ul>
      `;

    self.el.querySelectorAll("button").forEach((button, index) => {
      button.addEventListener("click", () => {
        store.dispatch("clearItem", { index });
      });
    });
  }
}
