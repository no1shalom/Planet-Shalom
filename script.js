console.log("JavaScript loaded!");
 function updateTime() {
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime;
    }
    setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("TheArchive"));
dragElement(document.getElementById("Links"));
dragElement(document.getElementById("Gallery"));
dragElement(document.getElementById("ContactMe"));

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
const linksScreen = document.querySelector("#Links");
const galleryScreen = document.querySelector("#Gallery");
const photoboothScreen = document.querySelector("#Photobooth");
const contactMeScreen = document.querySelector("#ContactMe");

// Store all application windows here
const windows = [
  welcomeScreen,
  archiveScreen,
  linksScreen,
  galleryScreen,
  photoboothScreen,
  contactMeScreen
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

// Show the Welcome window when the page loads
openWindow(welcomeScreen);

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

connectWindow(
  document.querySelector("#Linksopen"),
  document.querySelector("#Linksclose"),
  linksScreen
);

connectWindow(
  document.querySelector("#Galleryopen"),
  document.querySelector("#Galleryclose"),
  galleryScreen
);

connectWindow(
  document.querySelector("#Photoboothopen"),
  document.querySelector("#Photoboothclose"),
  photoboothScreen
);

connectWindow(
  document.querySelector("#ContactMeopen"),
  document.querySelector("#ContactMeclose"),
  contactMeScreen
);

// Displaying my Software Projects
const sengProjects = [
  {
    title: "Planet Shalom",
    image: "./images/sunset1.jpg",
    description: "My portfolio as a web-based operating system.",
    github: "https://github.com/no1shalom/Planet-Shalom",
    website: "https://yourwebsite.com",
    tech: "HTML, CSS, JavaScript"
    }
  ];

const sengContainer = document.getElementById("sengProjects-container");

sengProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <img
            src="${project.image}"
            alt="${project.title}"
            class="project-image"
        >

        <div class="project-content">
          <div 
            style="
              display: flex; 
              gap: 10%;
              align-items: centre">

              <h2 class="project-title">
                  ${project.title}
              </h2>

              <a
                href="${project.github}"
                target="_blank"
                class="project-link">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <i 
                    style="color:rgb(248, 228, 209);"
                    class="fa-brands fa-github"></i>
                  </a>
              </a>
          </div>

          <p class="project-description">
              ${project.description}
          </p>

            ${
              project.website
              ? `
                <a
                  href="${project.website}"
                  target="_blank"
                  class="project-link secondary">
                  Visit website →
                </a>
                `
                : ""
            }
          <div class="technologies">
            ${project.tech}
          </div>
        </div>
    `;
    sengContainer.appendChild(card);

});

// Displaying my Hardware Projects
const hardwareProjects = [
  {
    title: "Tester",
    image: "./images/sunset1.jpg",
    description: "I'm just testing.",
    page: "./projects/tester.html",
    tech: "HTML, CSS, JavaScript"
    }
  ];

const hardwareContainer = document.getElementById("hardwareProjects-container");

hardwareProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <img
            src="${project.image}"
            alt="${project.title}"
            class="project-image"
        >

        <div class="project-content">

            <h2 class="project-title">
                ${project.title}
            </h2>

            <p class="project-description">
                ${project.description}
            </p>

            ${
                project.page
                    ? `
                    <a
                        href="${project.page}"
                        class="project-link secondary"
                    >
                        Read more →
                    </a>
                    `
                    : ""
            }
            <div class="technologies">
                ${project.tech}
            </div>
        </div>
    `;
    hardwareContainer.appendChild(card);
});
