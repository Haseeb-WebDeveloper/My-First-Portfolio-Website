document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const crossToggle = document.getElementById('cross-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    // Initial state
    menuToggle.classList.remove('hidden');
    crossToggle.classList.add('hidden');
    mobileMenu.classList.add('hidden');
  
    // When menu is clicked
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.add('hidden');
      crossToggle.classList.remove('hidden');
      mobileMenu.classList.remove('hidden');
    });
  
    // When cross button is clicked
    crossToggle.addEventListener('click', function () {
      crossToggle.classList.add('hidden');
      menuToggle.classList.remove('hidden');
      mobileMenu.classList.add('hidden');
    });
  
    // When nav links are clicked 
    const navLinks = document.querySelectorAll('#mobile-nav-links');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        crossToggle.classList.add('hidden');
        menuToggle.classList.remove('hidden');
        mobileMenu.classList.add('hidden');
      });
    });
  });
  
  
  
  
  
  
  
  // background circle move start
          const circle = document.querySelector('.circle');
          const section = document.querySelector('.scroll-section');
          let mouseX = 0, mouseY = 0; // Coordinates for the mouse position
          let circleX = 0, circleY = 0; // Coordinates for the circle position
          let followingCursor = false; // Flag to check if the circle should follow the cursor
          let randomMoveInterval; // Interval for random movement
          circle.classList.add("hidden");
  
          document.addEventListener('mousemove', (e) => {
              if (followingCursor) {
                  // Get the position of the section relative to the viewport
                  const rect = section.getBoundingClientRect();
                  // Calculate the new mouseX and mouseY to center the circle on the cursor
                  mouseX = e.clientX - rect.left - circle.offsetWidth / 2;
                  mouseY = e.clientY - rect.top - circle.offsetHeight / 2;
              }
          });
  
          section.addEventListener('mouseenter', () => {
              followingCursor = true; // Start following the cursor
              clearInterval(randomMoveInterval); // Stop random movement
              // Set faster transition for following the cursor
              circle.style.transition = 'transform .7s ease-out';
              circle.classList.remove("hidden");
          });
  
          section.addEventListener('mouseleave', () => {
              followingCursor = false; // Stop following the cursor
              // Set slower transition for random movement
              circle.style.transition = 'transform 5s ease-out';
              randomMoveInterval = setInterval(moveCircleRandomly, 2000); // Start random movement
              circle.classList.add("hidden");
          });
  
          // Function to get a random position within the section
          function getRandomPosition() {
              const rect = section.getBoundingClientRect();
              const x = Math.floor(Math.random() * (rect.width - circle.offsetWidth));
              const y = Math.floor(Math.random() * (rect.height - circle.offsetHeight));
              return { x, y };
          }
  
          // Function to move the circle to a random position
          function moveCircleRandomly() {
              const { x, y } = getRandomPosition();
              circle.style.transform = `translate(${x}px, ${y}px)`;
              circle.style.transition = 'transform 5s ease-out';
          }
  
          // Function to move the circle smoothly towards the cursor
          function moveCircle() {
              if (followingCursor) {
                  circle.classList.add("lg:flex");
                  circle.classList.remove("lg:hidden");
                  // Smoothly update the circle's position towards the mouse position
                  circleX += (mouseX - circleX) * 0.05; // Adjust the speed with the factor
                  circleY += (mouseY - circleY) * 0.05;
                  circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
                 
              }
              requestAnimationFrame(moveCircle); // Continue the animation
          }
  
          // Start the random movement initially
          randomMoveInterval = setInterval(moveCircleRandomly, 2000);
          // Start the smooth movement function
          moveCircle();
  
          //background circle movement end
  
  
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Circle animation logic
    const circle = document.getElementById("circle01"); 
  
    // Form submission logic
    const contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", function (event) {
      // Perform client-side validation if needed
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
  
      let isValid = true;
  
      // Reset error messages
      nameError.classList.add("hidden");
      emailError.classList.add("hidden");
  
      // Validate full name
      if (fullName.trim() === "") {
        nameError.classList.remove("hidden");
        isValid = false;
      }
  
      // Validate email
      const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        emailError.classList.remove("hidden");
        isValid = false;
      }
  
      // If validation fails, prevent form submission
      if (!isValid) {
        event.preventDefault();
      }
  
      // If validation passes, form will submit
    });
  });
  
  
  
  
  
  
  
  // Select all heart buttons
//   document.getElementById('likeButton').addEventListener('click', function() {
//     const heart = document.getElementById('heartSVG');
//     heart.classList.toggle('text-red-500');
//   });
  
  
  
//   function limitCharacters(elementId, maxChars) {
//     var element = document.querySelectorAll('#elementId');
//     var content = element.textContent;

//     if (content.length > maxChars) {
//         element.textContent = content.substring(0, maxChars) + "...";
//     } else {
//         element.textContent = content;
//     }
// }

// // Usage
// limitCharacters('textPara', 113);
// limitCharacters('port-title', 82); // Limit the content to 81 characters
  
  
  
  
  // locomotive smooth sroll initilization
  // document.addEventListener('DOMContentLoaded', () => {
  //   const scroll = new LocomotiveScroll({
  //     el: document.querySelector('[data-scroll-container]'),
  //     smooth: true
  //   });
  
  //   scroll.on('scroll', AOS.refresh);
  
  //   // AOS.init({
  //   //   duration: 1000,
  //   //   delay: 500,
  //   //   offset: 200,
  //   //   easing: 'ease-in-out',
  //   //   mirror: true
  //   // });
  // });
  