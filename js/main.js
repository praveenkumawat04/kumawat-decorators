/*========== SHOW MENU ==========*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*========== REMOVE MENU MOBILE ==========*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*========== CHANGE BACKGROUND HEADER ==========*/
function scrollHeader() {
    const header = document.getElementById('header');
    if(this.scrollY >= 80) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*========== SCROLL SECTIONS ACTIVE LINK ==========*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 80,
              sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*========== SHOW SCROLL UP ==========*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-top');
    if(this.scrollY >= 560) scrollUp.classList.add('show');
    else scrollUp.classList.remove('show');
}
window.addEventListener('scroll', scrollUp);

/*========== COUNTER ANIMATION ==========*/
const counters = document.querySelectorAll('.stats__number');

counters.forEach(counter => {
    counter.innerText = '0';
    
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        
        if(count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCounter, 10);
        } else {
            counter.innerText = target;
        }
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    });
    
    observer.observe(counter);
});

/*========== PROJECT FILTER ==========*/
const filterBtns = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project__card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/*========== FAQ ACCORDION ==========*/
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if(otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

/*========== SWIPER TESTIMONIALS ==========*/
const swiper = new Swiper('.testimonials__container', {
    loop: true,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1,
        },
    }
});

/*========== AOS ANIMATION ==========*/
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

/*========== CONTACT FORM ==========*/
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you can add your form submission logic
        // For now, we'll just show an alert
        alert('Thank you for your enquiry! We will contact you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send to WhatsApp
        const phone = '917073572821';
        const message = `New Enquiry from Website:%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0ALocation: ${data.location}%0AProject Type: ${data.project_type}%0ABudget: ${data.budget}%0AMessage: ${data.message}`;
        
        // Uncomment to redirect to WhatsApp
        // window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
}

/*========== SMOOTH SCROLL ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});