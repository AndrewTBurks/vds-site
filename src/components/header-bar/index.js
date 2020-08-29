export default class HeaderBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    console.log("Construct HeaderBar");
  }

  async connectedCallback() {
    console.log("Connected HeaderBar");
    this.shadowRoot.innerHTML = `
      <div style="background: var(--primary); height: 64px;"></div>
    `;

    return fetch("./src/components/header-bar")
      .then((res) => res.text())
      .then((text) => {
        this.shadowRoot.innerHTML = text;

        this.shadowRoot.querySelectorAll("a").forEach((el) => {
          const linkName = el.getAttribute("href").slice(1);

          console.log(location.pathname, linkName);

          if (location.pathname.endsWith(linkName)) {
            el.classList.toggle("selected", true);
          }
        });
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(...arguments);
  }
}

customElements.define("header-bar", HeaderBar);
console.log(HeaderBar);
