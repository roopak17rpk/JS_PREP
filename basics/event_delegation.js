/**
 * Event Bubbling and Capturing in JavaScript
 *
 * Event Bubbling:
 * - When an event occurs in an element inside another element, and both elements have registered a handler for that event, the event first triggers the handlers on the innermost element, and then successively triggers the handlers on its ancestors.
 * - The event bubbles up from the target element to the root.
 *
 * Event Capturing:
 * - Also known as "trickling," the event starts from the root and trickles down to the target element.
 * - The event is captured by the outermost element first and then propagated to the innermost element.
 *
 * Use Cases:
 * - Event Bubbling: Useful when you want to handle events at a higher level in the DOM tree, such as form validation or delegating events to a parent element.
 * - Event Capturing: Useful when you need to intercept events before they reach the target element, such as stopping propagation or implementing custom behavior.
 */

// Example of Event Bubbling
document.getElementById("child").addEventListener("click", function () {
  console.log("Child clicked");
});

document.getElementById("parent").addEventListener("click", function () {
  console.log("Parent clicked");
});

document.getElementById("grandparent").addEventListener("click", function () {
  console.log("Grandparent clicked");
});

// Example of Event Capturing
document.getElementById("child").addEventListener(
  "click",
  function () {
    console.log("Child clicked");
  },
  true // Use capturing phase
);

document.getElementById("parent").addEventListener(
  "click",
  function () {
    console.log("Parent clicked");
  },
  true // Use capturing phase
);

document.getElementById("grandparent").addEventListener(
  "click",
  function () {
    console.log("Grandparent clicked");
  },
  true // Use capturing phase
);

/**
 * HTML Structure:
 * <div id="grandparent">
 *   Grandparent
 *   <div id="parent">
 *     Parent
 *     <div id="child">Child</div>
 *   </div>
 * </div>
 *
 * When clicking on the "Child" element:
 * - Event Bubbling: Logs "Child clicked", "Parent clicked", "Grandparent clicked"
 * - Event Capturing: Logs "Grandparent clicked", "Parent clicked", "Child clicked"
 */

// Use Case: Event Delegation
// Instead of adding event listeners to multiple child elements, you can add a single event listener to a parent element and handle events for all child elements.

document.getElementById("list").addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "LI") {
    console.log("List item clicked:", event.target.textContent);
  }
});

/**
 * HTML Structure:
 * <ul id="list">
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 *   <li>Item 3</li>
 * </ul>
 *
 * When clicking on any list item, the event listener on the parent <ul> element handles the event.
 */
