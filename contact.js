// Contact form handling
const contactForm = document.getElementById('contact-form');

// Form validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (formData.get('name').trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }

    // Subject validation
    if (formData.get('subject').trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }

    // Message validation
    if (formData.get('message').trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

// Show notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.classList.add(
        'fixed',
        'bottom-4',
        'right-4',
        'px-6',
        'py-3',
        'rounded-lg',
        'shadow-lg',
        'transform',
        'transition-all',
        'duration-300'
    );

    if (isError) {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-green-500', 'text-white');
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-y-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showNotification(errors[0], true);
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="loading-spinner mr-2"></div>
            Sending...
        </div>
    `;

    try {
        // Simulate API call (replace with actual API endpoint in production)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Clear form
        contactForm.reset();

        // Show success message
        showNotification('Message sent successfully!');
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', true);
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Real-time form validation
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        const formData = new FormData();
        formData.append(input.name, input.value);
        
        const errors = validateForm(formData);
        
        // Add or remove error styles
        if (errors.length > 0) {
            input.classList.add('border-red-500');
            input.classList.remove('border-green-500');
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-green-500');
        }
    });
});