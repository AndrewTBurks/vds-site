const template = document.createElement("template");

export default class Pane extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    console.log("Construct Pane");
  }

  async connectedCallback() {
    console.log("Connected Pane");
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelectorAll("a").forEach((el) => {
      const linkName = el.getAttribute("href").slice(1);

      console.log(location.pathname, linkName);

      if (location.pathname.endsWith(linkName)) {
        el.classList.toggle("selected", true);
      }
    });
  }
}

template.innerHTML = /* html */ `
<style>
  :host {
    background: white;
    color: black;
    padding: 1.5rem;
    margin: 1.5rem;
    border-radius: 1.5rem;

    display: flex;
    flex-flow: column;
  
    font-family: var(--font);

    width: 800px;
    max-width: calc(100% - 1rem);
    box-shadow: var(--el-1);
  }
</style>

<slot></slot>
`;

customElements.define("content-pane", Pane);
