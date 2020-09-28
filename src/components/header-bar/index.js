const template = document.createElement("template");

export default class HeaderBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    $(this.shadowRoot).append(template.content.cloneNode(true));
    $(this).addClass("hydrated");

    $("a", this.shadowRoot).toggleClass(function () {
      const linkName = $(this).attr("href").slice(1);
      if (location.pathname.endsWith(linkName)) {
        return "selected";
      }

      return "";
    });

    fetch("./assets/hamburger-solid.svg")
      .then((res) => res.text())
      .then(
        (svg) => ($("#links button svg", this.shadowRoot)[0].outerHTML = svg)
      );
  }
}

template.innerHTML = /* html */ `
<style>
  :host {
    background: var(--primary);
    color: white;
    font-size: 1.3rem;
  
    height: 48px;
  
    display: flex;
    align-items: center;
  
    font-family: var(--font-serif);

    align-self: stretch;

    position: sticky;
    top: 0;

    z-index: 10;

    box-shadow: var(--el-2);
  }

  #title-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-weight: 400;

    min-width: 300px;
  }

  #title-link img {
    animation: 1.5s linear infinite wiggle;
    animation-play-state: paused;
  }

  #title-link:hover img {

    animation-play-state: running;
  }
  
  #page-title {
    font-style: italic;
    color: var(--secondary-light);
    font-weight: 700;

    margin-left: 8px;
  }
  
  #links {
    padding: 0 0 0 12px;
  
    display: flex;
    flex: 1;
    align-self: stretch;
  
    font-family: var(--font);
    background: var(--primary);
  }

  #links button {
    display: none;
  }

  #links button svg {
    width: 100%;
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
    border-bottom-color: var(--primary-dark);
    transition: border-bottom-color 250ms ease-in-out;
  }
  
  #links a:hover {
    border-bottom-color: var(--secondary-light);
  }
  
  #links a.selected {
    border-bottom-color: var(--secondary);
  }

  @media screen and (max-width: 750px) and (min-width: 0px) {
    #links {
      left: 0;
      padding: 0;

      top: 100%;
      position: absolute;
      width: calc(100%);
      flex-direction: column;
      align-items: stretch;

      z-index: 100;
    }

    #links a {
      display: none;
      border-left-color: var(--primary-dark);
      border-bottom-color: var(--primary);
    }

    #links:focus-within {
      border-top: 2px solid var(--primary-dark);
    }

    #links:focus-within a {
      display: inline-flex;
    }

    #links button {
      display: inline-flex;
      align-self: flex-end;
      bottom: calc(100% + 8px);
      right: 8px;
      position: absolute;

      height: 32px;
      width: 32px;

      border-radius: 4px;
      padding: 4px;
      align-items: center;
      justify-content: center;

      border: 2px solid var(--primary-light);
      background: var(--primary);
      color: var(--secondary-light);
    }

    #links a.selected {
      border-bottom-color: var(--primary);
      border-left-color: var(--secondary);
    }

    #links a:hover {
      border-bottom-color: var(--primary);
      border-left-color: var(--secondary-light);
    }
  }

  @keyframes wiggle {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>

<a id="title-link" href="./">
<img src="./assets/sunglasses.svg" style="height: 30px; margin: 0 8px;">
Andrew Burks
<span id="page-title"><slot></slot></span>
</a>
<div id="links">
  <button>
    <svg></svg>
  </button>
  <a href="./">Home</a>
  <a href="./vis">Vis</a>
  <a href="./svg">SVG</a>
  <a href="./sources">Sources</a>
  <a href="https://sgd.andrewtburks.dev">SGD</a>
</div>
`;

customElements.define("header-bar", HeaderBar);
