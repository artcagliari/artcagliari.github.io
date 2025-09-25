
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');

    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('show'));

    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);

    content.classList.add('show');
}

const currentActiveTab = document.querySelector('.tab-btn.active');
tabClicked(currentActiveTab);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.portfolio-item, .skill-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});


const codeLines = document.querySelectorAll('.code-text');
let currentLine = 0;

function typeCode() {
    if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        const text = line.textContent;
        line.textContent = '';
        line.style.borderRight = '2px solid #64b5f6';
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                line.style.borderRight = 'none';
                currentLine++;
                setTimeout(typeCode, 300);
            }
        };
        typeChar();
    }
}

window.addEventListener('load', () => {
    setTimeout(typeCode, 1000);
});


const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;
    
        setTimeout(() => {
        submitBtn.innerHTML = '<span>Enviado!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 50%, #1e88e5 100%)';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

style.textContent = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(100, 181, 246, 0.3);
        border: 2px solid #64b5f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    }
    
    @media (hover: none) {
        .cursor {
            display: none;
        }
    }
`;
document.head.appendChild(style);


function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(100, 181, 246, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}


createParticles();


function animateNumbers() {
    const numbers = document.querySelectorAll('.number-counter');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current);
            }
        }, 20);
    });
}


const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.cssText = `
    position: fixed;
    top: 50%;
    right: 20px;
    width: 50px;
    height: 50px;
    background: rgba(100, 181, 246, 0.2);
    border: 2px solid rgba(100, 181, 246, 0.3);
    border-radius: 50%;
    color: #64b5f6;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
`;

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

document.body.appendChild(themeToggle);


function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}


const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
});

