class AutoSuggest extends HTMLElement {
  constructor() {
    super();
    // initialize shadow root
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.style = document.createElement("style");
    this.shadowRoot.appendChild(
      this.withStyles(` input {
      width: 500px;
    }`)
    );

    // create search input
    this.searchBox = document.createElement("input");
    this.searchBox.setAttribute("placeholder", "Search...");
    this.shadowRoot.appendChild(this.searchBox);

    // create suggestion box
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "suggestion-box-wrapper");

    this.ul = document.createElement("ul");

    this.wrapper.appendChild(this.ul);

    this.searchBox.addEventListener("input", (e) => {
      let input = e.target.value;
      // remove ul list items when input changes
      while (this.ul.firstChild) {
        this.ul.removeChild(this.ul.firstChild);
      }
      // reset visibility to hide suggestion box
      this.shadowRoot.querySelector(".suggestion-box-wrapper").style.display =
        "none";
      // iterate over suggestions and find a match
      let matches = this.fruits.filter((fruit) => fruit.includes(input));
      // add ul list items when match is found
      if (matches.length && input.length) {
        // set visibility to show suggestion box
        this.shadowRoot.querySelector(".suggestion-box-wrapper").style.display =
          "block";

        for (let item of matches) {
          let li = document.createElement("li");
          li.innerHTML = item;
          this.ul.appendChild(li);
        }
      }
    });

    this.shadowRoot.appendChild(
      this.withStyles(`
    .suggestion-box-wrapper {
      width: 515px;
      margin: 10px 0;
      border: 1px solid lightgray;
      display: none;
      background-color: white;
      box-shadow: 10px 5px 5px gray;
    }
    ul {
      list-style: none;
    }
    li {
      padding: 4px;
    }
  `)
    );
    this.shadowRoot.appendChild(this.wrapper);
  }
  shadowRoot = null;
  searchBox = null;
  style = null;
  fruits = ["Apples", "Apricots", "Cherries", "Grapes", "Bananas"];

  withStyles(cssStyles) {
    this.style.appendChild(document.createTextNode(cssStyles));
    return this.style;
  }
}

customElements.define("auto-suggest", AutoSuggest);
