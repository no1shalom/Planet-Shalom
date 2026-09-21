console.log("JavaScript loaded!");
 function updateTime() {
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime;
    }
    setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("AboutMe"));
dragElement(document.getElementById("TheArchive"));
dragElement(document.getElementById("Links"));
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

// Keep windows within the actually-visible area when the keyboard opens/closes
if (window.visualViewport) {
  const setVvh = () => {
    document.documentElement.style.setProperty(
      '--vvh', `${window.visualViewport.height}px`
    );
  };
  window.visualViewport.addEventListener('resize', setVvh);
  setVvh();
}

document.addEventListener('focusin', (e) => {
  if (e.target.matches('input, textarea')) {
    setTimeout(() => {
      e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 300); // give the keyboard time to finish animating in
  }
});

// ---Window Elements---
const welcomeScreen = document.querySelector("#welcome");
const aboutMeScreen = document.querySelector("#AboutMe");
const archiveScreen = document.querySelector("#TheArchive");
const linksScreen = document.querySelector("#Links");
const contactMeScreen = document.querySelector("#ContactMe");


// Store all application windows here
const windows = [
  welcomeScreen,
  aboutMeScreen,
  archiveScreen,
  linksScreen,
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

const desktopIcons = document.querySelector(".desktop-apps");

// Open one window and close the rest
function openWindow(windowElement) {
  closeAllWindows();
  windowElement.style.display = "flex";

  // Icons only show alongside the Welcome window
  if (desktopIcons) {
    desktopIcons.style.display = (windowElement === welcomeScreen) ? "grid" : "none";
  }
}

// Connect a pair of buttons to a window
function connectWindow(openButton, closeButton, windowElement, isHome = false) {
  openButton.addEventListener("click", () => {
    openWindow(windowElement);
  });

  closeButton.addEventListener("click", () => {
    if (isHome) {
      // Closing Welcome itself just hides it — no window to "return" to
      closeWindow(windowElement);
    } else {
      // Closing any app returns to Welcome + icons together
      openWindow(welcomeScreen);
    }
  });
}

// Show the Welcome window when the page loads
openWindow(welcomeScreen);

// Connect Windows
connectWindow(
  document.querySelector("#welcomeopen"),
  document.querySelector("#welcomeclose"),
  welcomeScreen,
  true
);

connectWindow(
  document.querySelector("#AboutMeopen"),
  document.querySelector("#AboutMeclose"),
  aboutMeScreen
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
  document.querySelector("#ContactMeopen"),
  document.querySelector("#ContactMeclose"),
  contactMeScreen
);

// Displaying my Software Projects
const sengProjects = [
  {
    title: "Planet Shalom",
    image: "./projects/Planet_Shalom.png",
    description: "My portfolio as a web-based operating system.",
    github: "https://github.com/no1shalom/Planet-Shalom",
    website: "https://no1shalom.github.io/Planet-Shalom/",
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
                  ${
                    project.website
                    ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer" class="project-title-link">${project.title}</a>`
                    : project.title
                  }
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
    page: "./projects/tester.html"
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
                ${ project.page
                    ? `<a href="${project.page}" class="project-title-link">${project.title}</a>`
                    : project.title
                  }
            </h2>

            <p class="project-description">
                ${project.description}
            </p>
    `;
    hardwareContainer.appendChild(card);
});


// Contact form -> opens the visitor's email client with everything pre-filled
const contactForm = document.getElementById("contactForm");
const contactStatus = contactForm ? contactForm.querySelector(".contact-status") : null;

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    contactForm.classList.add("sending"); // your existing spinner effect

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contactForm.querySelector('[name="access_key"]').value,
          name: document.getElementById("cm-name").value,
          email: document.getElementById("cm-email").value,
          message: document.getElementById("cm-msg").value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (contactStatus) contactStatus.querySelector("p").textContent = "Message sent! I'll get back to you soon.";
      } else {
        if (contactStatus) contactStatus.querySelector("p").textContent = "Something went wrong — please try again.";
      }
    } catch (err) {
      if (contactStatus) contactStatus.querySelector("p").textContent = "Something went wrong — please try again.";
    }

    setTimeout(() => {
      contactForm.classList.remove("sending");
      contactForm.reset();
    }, 2500);
  });
}

// Speaker for background music
const audio = document.getElementById("natureAudio");
const speaker = document.getElementById("speakerIcon");
const tip = document.getElementById("soundTip");
audio.volume = 0.15;

// Show tooltip when website loads
window.addEventListener("load", () => {
  tip.style.opacity = "1";
  setTimeout(() => {
    tip.style.opacity = "0";
  }, 6000);
});

// Show tooltip when hovering
speaker.addEventListener("mouseenter", () => {
  tip.style.opacity = "1";
});

speaker.addEventListener("mouseleave", () => {
  tip.style.opacity = "0";
});

// Toggle audio
speaker.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    speaker.classList.remove("fa-volume-xmark");
    speaker.classList.add("fa-volume-high");
  }
  else{
    audio.pause();
    speaker.classList.remove("fa-volume-high");
    speaker.classList.add("fa-volume-xmark");
  }
});

