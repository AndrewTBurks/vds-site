const template = document.createElement("template");

export default class Pane extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    $(this.shadowRoot).append(template.content.cloneNode(true));
    $(this).addClass("hydrated");

    // add ids to slotted headers 1 2 3 automatically
    $("slot", this.shadowRoot).on("slotchange", function () {
      $(this.assignedNodes())
        .filter("h1, h2, h3")
        .attr("id", function () {
          console.log(this.innerHTML);
          return $(this)
            .text()
            .trim()
            .toLowerCase()
            .replace(/[^A-Za-z\d\s]/gm, "")
            .replace(/\s/gm, "-");
        })
        .on("click", function () {
          window.location.hash = this.id;
        });
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
