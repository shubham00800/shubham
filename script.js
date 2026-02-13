const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});

// Modal: open/close and form handling for 'HIRE ME'
const hireBtn = document.getElementById('hireBtn');
const contactModal = document.getElementById('contactModal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const emailBtn = document.getElementById('emailBtn');

function openModal(){
    if(!contactModal) return;
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
}

function closeModal(){
    if(!contactModal) return;
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
}

hireBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal();
});

modalClose?.addEventListener('click', closeModal);
contactModal?.addEventListener('click', (e)=>{
    if(e.target === contactModal) closeModal();
});

document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeModal();
});

contactForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Simple UI-only send simulation
    contactForm.style.display = 'none';
    contactSuccess.hidden = false;

    setTimeout(()=>{
        closeModal();
        contactForm.style.display = '';
        contactSuccess.hidden = true;
        contactForm.reset();
    }, 1800);
});

// Open user's mail client with prefilled fields
emailBtn?.addEventListener('click', ()=>{
    if(!contactForm) return;
    const name = contactForm.elements['name']?.value.trim() || '';
    const email = contactForm.elements['email']?.value.trim() || '';
    const message = contactForm.elements['message']?.value.trim() || '';

    if(!email || !message){
        alert('Please provide your email and a message before sending via email.');
        return;
    }

    const subject = encodeURIComponent((name ? name + ' - ' : '') + 'Hiring enquiry');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const to = 'rohit@gmail.com';

    // Open mail client
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    closeModal();
});
