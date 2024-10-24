const heading = React.createElement(
  "h1",
  {
    id: "namaste",
    class: "react-heading",
  },
  "hello namaste"
);

const root = ReactDOM.createRoot(document.getElementById("root"));

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "hello namaste i am nested")
  )
);

const siblingParent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "hello namaste i am nested 1"),
    React.createElement("h2", {}, "hello namaste i am nested 2"),
  ])
);

// root.render(heading);
// root.render(parent);
root.render(siblingParent);
