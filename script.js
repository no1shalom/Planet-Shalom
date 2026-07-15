console.log("JavaScript loaded!");
 function updateTime() {
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime;
    }
    setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#TheArchive"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ---Window Elements---
const welcomeScreen = document.querySelector("#welcome");
const archiveScreen = document.querySelector("#TheArchive");

// Store all application windows here
const windows = [
  welcomeScreen,
  archiveScreen
];

// --Window Functions--

// Hide every window
function closeAllWindows() {
  windows.forEach(window => {
    window.style.display = "none";
  });
}

// Hide a single window
function closeWindow(windowElement) {
  windowElement.style.display = "none";
}

// Open one window and close the rest
function openWindow(windowElement) {
  closeAllWindows();
  windowElement.style.display = "flex";
}

// Connect a pair of buttons to a window
function connectWindow(openButton, closeButton, windowElement) {
  openButton.addEventListener("click", () => {
    openWindow(windowElement);
  });

  closeButton.addEventListener("click", () => {
    closeWindow(windowElement);
  });
}

// Connect Windows
connectWindow(
  document.querySelector("#welcomeopen"),
  document.querySelector("#welcomeclose"),
  welcomeScreen
);

connectWindow(
  document.querySelector("#TheArchiveopen"),
  document.querySelector("#TheArchiveclose"),
  archiveScreen
);

// Show the Welcome window when the page loads
openWindow(welcomeScreen);


// --Icon Selection--
var selectedIcon = undefined;

// Store the currently selected desktop icon
function selectIcon(icon) { 
  icon.classList.add("selected");
  selectedIcon = icon;
} 

function deselectIcon(icon){
  icon.classList.remove("selected");
  selectedIcon = undefined;
}

function iconHovering(icon){
  icon.addEventListener("mouseenter", () => {
  selectIcon(icon)
  });

  icon.addEventListener("mouseleave", () => {
  deselectIcon(icon)
  });
}

// Variables for app icon
const archiveIcon = document.querySelector("#TheArchiveopen");
iconHovering(archiveIcon);

