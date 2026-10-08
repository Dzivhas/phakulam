/**
 * Phakula M Attorneys - Core Unified JavaScript
 * Functionality: Mobile Navigation, Tab Switching, Form Validation & POPIA Compliance Check
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Drawer Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // 2. Active Navigation Highlight based on URL
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else if (currentPath !== '' && linkPath !== 'index.html' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });

    // 3. Appointment Form Validation & Submission
    const appointmentForm = document.getElementById('appointmentForm');
    const modal = document.getElementById('feedbackModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const practiceArea = document.getElementById('practiceArea').value;
            const popiaConsent = document.getElementById('popiaConsent').checked;

            // Simple South African Phone Format check (e.g., 10 digits starting with 0)
            const saPhoneRegex = /^0[0-9]{9}$/;
            const cleanedPhone = phone.replace(/\s+/g, '');

            if (!fullName || !email || !practiceArea) {
                alert('Please complete all required form fields.');
                return;
            }

            if (!saPhoneRegex.test(cleanedPhone)) {
                alert('Please enter a valid 10-digit South African contact number (e.g., 0813637247).');
                return;
            }

            if (!popiaConsent) {
                alert('You must accept the POPIA data processing consent to submit your request.');
                return;
            }

            // Display Confirmation Modal
            if (modal) {
                modal.style.display = 'flex';
            }
            appointmentForm.reset();
        });
    }

    // 4. Contact Form Validation & Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cName = document.getElementById('cName').value.trim();
            const cPhone = document.getElementById('cPhone').value.trim();
            const cEmail = document.getElementById('cEmail').value.trim();

            if (!cName || !cPhone || !cEmail) {
                alert('Please complete all required fields.');
                return;
            }

            if (modal) {
                modal.style.display = 'flex';
            }
            contactForm.reset();
        });
    }

    // 5. Close Modal Handler
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// 6. Tab Switching Functionality for Compliance Page
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active-content'));

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active-content');
    }
    evt.currentTarget.classList.add('active');
}