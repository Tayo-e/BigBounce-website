const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", ()=>{
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line") 
});

navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance:"50px",
    origin:"bottom",
    duration:"1000",
};

//This is for the Header
ScrollReveal().reveal(".header__container p", {
    ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOption,
    delay:500,
});

//This is my about Setion 
ScrollReveal().reveal(".about__image img", {
    ...scrollRevealOption,
    origin:"left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
    ...scrollRevealOption,
    delay:500,
});

ScrollReveal().reveal(".about__content .section__header", {
    ...scrollRevealOption,
    delay:1000,
});

ScrollReveal().reveal(".about__content .section__description", {
    ...scrollRevealOption,
    delay:1500,
});

ScrollReveal().reveal(".about__btn", {
    ...scrollRevealOption,
    delay:2000,
});

//For the decorations and items 
ScrollReveal().reveal(".about__btn", {
    ...scrollRevealOption,
    Interval:500,
});

//item container
ScrollReveal().reveal(".item__card", {
    ...scrollRevealOption,
    Interval:500,
});

//Service container
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});

//The number counter i created 
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;

        // Determine how much to increment the count by
        const increment = target / 200; // Adjusted for a smoother count

        if (c < target) {
            // Update counter's innerText
            counter.innerText = `${Math.ceil(c + increment)}`;
            // Repeat the update after a short delay
            setTimeout(updateCounter, 20); // Adjust delay for a smoother count
        } else {
            counter.innerText = `${target}+`;
        }
    };

    updateCounter();
});

//this is for the faqs
const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
  const question = faq.querySelector(".question");
  const answer = faq.querySelector(".answer");

  question.addEventListener("click", () => {
    if (faq.classList.contains("active")) {
      faq.classList.remove("active");
      answer.style.maxHeight = null;
      answer.style.opacity = 0;
    } else {
      // Close other active blocks
      faqs.forEach(otherFaq => {
        if (otherFaq.classList.contains("active")) {
          otherFaq.classList.remove("active");
          otherFaq.querySelector(".answer").style.maxHeight = null;
          otherFaq.querySelector(".answer").style.opacity = 0;
        }
      });

      faq.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = 1;
    }
  });
});

// Bouncer image slide
const sliders = document.querySelectorAll('.bouncer__slider');
const blns = document.querySelectorAll('.bln');
let currentSlide = 0;

const manualNav = function(manual) {
    sliders.forEach((bouncer__slider, index) => {
        bouncer__slider.classList.remove('active');
        blns[index].classList.remove('active');
    });


    sliders[manual].classList.add('active');
    blns[manual].classList.add('active');

    setTimeout(() => {
        sliders[manual].classList.remove('active');
        setTimeout(() => {
            sliders[manual].classList.add('active');
        }, 10); // Short delay to trigger the reflow
    }, 10);
};

blns.forEach((bln, i) => {
    bln.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
    });
});

// Automatic navigation for images
var repeat = function() {
    let active = document.getElementsByClassName('active');
    let i = currentSlide;

    var repeater = function() {
        setTimeout(function() {
            [...active].forEach((activeSlider) => {
                activeSlider.classList.remove('active');
            });

            i = (i + 1) % sliders.length; // Ensures i wraps around when it reaches the end
            sliders[i].classList.add('active');
            blns[i].classList.add('active');

            setTimeout(() => {
                sliders[i].classList.remove('active');
                setTimeout(() => {
                    sliders[i].classList.add('active');
                }, 10); // Short delay to trigger the reflow
            }, 10);

            repeater();
        }, 7000); // Adjusted to 3 seconds for visibility
    };
    repeater();
};

repeat();



// SUCCESS MESSAGE !
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Create FormData object
    const formData = new FormData(event.target);

    // Send form data using Fetch API
    fetch(event.target.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Display success message
            document.getElementById('responseMessage').style.display = 'block';
            // Optionally, hide the form after successful submission
            event.target.reset();
        } else {
            // Handle errors
            alert('There was a problem with your submission.');
        }
    })
    .catch(error => {
        // Handle network errors
        console.error('Error:', error);
        alert('There was a problem with your submission.');
    });
});
