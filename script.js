// This file is currently empty. We can add interactivity later.

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Falling hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.falling-hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Create hearts every 300ms
setInterval(createHeart, 300);

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll-triggered animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// Add hover effect for images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Special Slideshow
const specialButton = document.getElementById('specialButton');
const slideshow = document.getElementById('slideshow');
const slideshowImage = document.getElementById('slideshowImage');
const slideshowAudio = document.getElementById('slideshowAudio');
const slideshowCaption = document.querySelector('.slideshow-caption');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const closeBtn = document.querySelector('.close-btn');

// Array of image URLs and captions - replace these with your actual content
const slideshowContent = [{
        image: 'https://source.unsplash.com/random/800x600?friends1',
        caption: 'Our first adventure together'
    },
    {
        image: 'https://source.unsplash.com/random/800x600?friends2',
        caption: 'Laughing until we cry'
    },
    {
        image: 'https://source.unsplash.com/random/800x600?friends3',
        caption: 'Making memories that last forever'
    },
    {
        image: 'https://source.unsplash.com/random/800x600?friends4',
        caption: 'Through thick and thin'
    },
    {
        image: 'https://source.unsplash.com/random/800x600?friends5',
        caption: 'Besties for life'
    },
    {
        image: 'https://source.unsplash.com/random/800x600?friends6',
        caption: 'Our friendship story continues'
    }
];

let currentImageIndex = 0;
let slideshowInterval;
let isAutoPlaying = true;

function updateSlideshow() {
    slideshowImage.src = slideshowContent[currentImageIndex].image;
    slideshowCaption.textContent = slideshowContent[currentImageIndex].caption;
}

function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % slideshowContent.length;
    updateSlideshow();
}

function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + slideshowContent.length) % slideshowContent.length;
    updateSlideshow();
}

function startAutoPlay() {
    if (isAutoPlaying) {
        slideshowInterval = setInterval(nextSlide, 30000); // 30 seconds per image
    }
}

specialButton.addEventListener('click', () => {
    slideshow.style.display = 'flex';
    slideshowAudio.play();
    currentImageIndex = 0;
    updateSlideshow();
    isAutoPlaying = true;
    startAutoPlay();
});

prevBtn.addEventListener('click', () => {
    clearInterval(slideshowInterval);
    prevSlide();
    isAutoPlaying = false; // Stop auto-play when manually navigating
});

nextBtn.addEventListener('click', () => {
    clearInterval(slideshowInterval);
    nextSlide();
    isAutoPlaying = false; // Stop auto-play when manually navigating
});

closeBtn.addEventListener('click', () => {
    slideshow.style.display = 'none';
    slideshowAudio.pause();
    clearInterval(slideshowInterval);
    isAutoPlaying = false;
});

// Close slideshow when clicking outside the image
slideshow.addEventListener('click', (e) => {
    if (e.target === slideshow) {
        slideshow.style.display = 'none';
        slideshowAudio.pause();
        clearInterval(slideshowInterval);
        isAutoPlaying = false;
    }
});

// Ensure audio keeps playing even if slideshow completes
slideshowAudio.addEventListener('ended', () => {
    slideshowAudio.play();
});

// Add support for closing image popup with back button if opened from script.js
window.addEventListener('DOMContentLoaded', function() {
    // If popup is open and user presses back, close popup
    window.addEventListener('popstate', function handler(e) {
        if (document.querySelector('.image-popup')) {
            document.querySelector('.image-popup').remove();
            window.removeEventListener('popstate', handler);
        }
    });
});