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

template.innerHTML = `
<style>
  :host {
    background: var(--primary);
    color: white;
    padding: 0 20px;
    font-size: 1.7rem;
  
    height: 64px;
  
    display: flex;
    align-items: center;
  
    font-family: var(--font-serif);

    align-self: stretch;

    position: sticky;
    top: 0;

    box-shadow: var(--el-2);
  }
  
  slot[name="title"] {
    color: orange;
  }
  
  slot[name="title"],
  span {
    margin-left: 4px;
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

Andrew Burks ~
<span id="title">
  <slot name="title">None</slot>
</span>
<div id="links">
  <slot name="links">
    <a href="./">Home</a>
    <a href="./vis">Visualization</a>
    <a href="./sources">Sources</a>
  </slot>
</div>
`;

customElements.define("header-bar", HeaderBar);
