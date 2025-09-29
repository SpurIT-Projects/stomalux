// Main JavaScript for СТОМАЛЮКС Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScrolling();
    setupFormHandling();
    setupAnimations();
    setupScrollToTop();
    setupModalHandlers();
    setupLazyLoading();
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-2xl text-dental-blue';
            } else {
                icon.className = 'fas fa-times text-2xl text-dental-blue';
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-2xl text-dental-blue';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-2xl text-dental-blue';
            }
        });
    }
}

// Scroll Effects Setup
function setupScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Form Handling Setup
function setupFormHandling() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmission(this);
        });
    }
}

// Handle Appointment Form Submission
function handleAppointmentSubmission(form) {
    const formData = new FormData(form);
    const appointmentData = {
        name: document.getElementById('patient-name').value,
        phone: document.getElementById('patient-phone').value,
        service: document.getElementById('service-select').value,
        message: document.getElementById('patient-message').value,
        timestamp: new Date().toISOString()
    };
    
    // Show loading
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Заявка отправлена! Наш администратор свяжется с вами в течение 30 минут.');
        form.reset();
    }, 1500);
    
    // In a real application, you would send this data to your server
    console.log('Appointment Data:', appointmentData);
}

// Animation Setup
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .review-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Top Setup
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Modal Handlers Setup
function setupModalHandlers() {
    // This would be used for service modals, doctor modals, etc.
    // For now, we'll create placeholder functions
}

// Open Appointment Modal
function openAppointmentModal() {
    // Scroll to contact form
    scrollToSection('contacts');
    
    // Focus on the first form field
    setTimeout(() => {
        const nameField = document.getElementById('patient-name');
        if (nameField) {
            nameField.focus();
        }
    }, 500);
}

// Open Service Modal (placeholder)
function openServiceModal(serviceType) {
    showInfoMessage(`Информация об услуге "${serviceType}" будет доступна в ближайшее время. Для записи звоните: +375 17 200-55-92`);
}

// Open Doctor Modal (placeholder)
function openDoctorModal(doctorId) {
    showInfoMessage('Подробная информация о враче будет доступна в ближайшее время. Для записи звоните: +375 17 200-55-92');
}

// Open Review Modal (placeholder)
function openReviewModal() {
    showInfoMessage('Форма для оставления отзыва будет доступна в ближайшее время. Вы можете оставить отзыв по телефону: +375 17 200-55-92');
}

// Lazy Loading Setup
function setupLazyLoading() {
    // Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Utility Functions

// Show Loading Overlay
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

// Hide Loading Overlay
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

// Show Success Message
function showSuccessMessage(message) {
    createNotification(message, 'success');
}

// Show Info Message
function showInfoMessage(message) {
    createNotification(message, 'info');
}

// Show Error Message
function showErrorMessage(message) {
    createNotification(message, 'error');
}

// Create Notification
function createNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300 translate-x-full`;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    // Set content
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                <span>${message}</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Format as Belarusian phone number
    if (value.length > 0) {
        if (value.startsWith('375')) {
            value = value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5');
        } else if (value.startsWith('80')) {
            value = value.replace(/(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
        }
    }
    
    input.value = value;
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    // Validate phone number
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^\+?375\s?\d{2}\s?\d{3}-?\d{2}-?\d{2}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            phoneField.classList.add('border-red-500');
            isValid = false;
        }
    }
    
    return isValid;
}

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // In a real application, you would send this to your analytics service
    console.log('Event tracked:', eventName, eventData);
}

// SEO and Performance Functions
function updateMetaDescription(description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = description;
    }
}

// Page Visibility API for performance tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden');
    } else {
        trackEvent('page_visible');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    trackEvent('page_loaded', { loadTime: Math.round(loadTime) });
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    trackEvent('javascript_error', {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno
    });
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openAppointmentModal = openAppointmentModal;
window.openServiceModal = openServiceModal;
window.openDoctorModal = openDoctorModal;
window.openReviewModal = openReviewModal;