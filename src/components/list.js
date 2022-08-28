import BaseComponent from "./base-component.js";
import store from "../packages/state-manager/store/index.js";

export default class List extends BaseComponent {
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
        <ul class="planet__items flex flex-col">
          ${self.props.items
            .map((item) => {
              return `
              <li>
              <div class="block p-4 lg:p-12 rounded-lg my-6 text-white bg-[#27272a]">
              
                <p class="font-bold text-base text-yellow-200">${item.created}</p>
                <p class="font-bold text-lg">${item.name}</p>
                <p class="text-gray-200">${item.climate}</p>
              </div>
              </li>
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
