const template = document.createElement("template");

export default class HeaderBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    console.log("Construct HeaderBar");
  }

  async connectedCallback() {
    console.log("Connected HeaderBar");
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
    background: var(--primary);
    color: white;
    padding: 0 20px;
    font-size: 1.3rem;
  
    height: 48px;
  
    display: flex;
    align-items: center;
  
    font-family: var(--font-serif);

    align-self: stretch;

    position: sticky;
    top: 0;

    box-shadow: var(--el-2);
  }

  #title-link {
    text-decoration: none;
    color: inherit;
    font-weight: 400;
  }
  
  #page-title {
    font-style: italic;
    color: var(--secondary-light);
    font-weight: 700;
  }
  
  #links {
    padding: 0 0 0 12px;
  
    display: flex;
    flex: 1;
    align-self: stretch;
  
    font-family: var(--font);
  }
  
  #links a {
    /* background: rgba(255, 255, 255, 0.2);/s */
    display: inline-flex;
    text-decoration: none;
  
    color: var(--secondary-light);
  
    align-self: stretch;
    place-items: center;
    padding: 8px;
  
    border: 6px solid var(--primary);
    border-bottom-color: var(--primary);
    transition: border-bottom-color 250ms ease-in-out;
  }
  
  #links a:hover {
    border-bottom-color: var(--secondary-light);
  }
  
  #links a.selected {
    border-bottom-color: var(--secondary);
  }
</style>

<a id="title-link" href="./">
Andrew Burks
<span id="page-title">
  - <slot></slot>
</span>
</a>
<div id="links">
  <slot name="links">
    <a href="./">Home</a>
    <a href="./vis">Vis</a>
    <a href="./svg">SVG</a>
    <a href="./sources">Sources</a>
  </slot>
</div>
`;

customElements.define("header-bar", HeaderBar);
