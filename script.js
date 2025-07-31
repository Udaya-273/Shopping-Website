// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');

// Create mobile menu content
mobileMenu.innerHTML = `
    <a href="index.html" class="block py-2 px-4 text-sm hover:bg-gray-100">Home</a>
    <a href="shop.html" class="block py-2 px-4 text-sm hover:bg-gray-100">Shop</a>
    <a href="about.html" class="block py-2 px-4 text-sm hover:bg-gray-100">About</a>
    <a href="contact.html" class="block py-2 px-4 text-sm hover:bg-gray-100">Contact</a>
`;

// Insert mobile menu after navigation
const nav = document.querySelector('nav');
nav.parentNode.insertBefore(mobileMenu, nav.nextSibling);

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-card');
        const productData = {
            id: product.dataset.id,
            name: product.querySelector('h3').textContent,
            price: product.querySelector('.price').textContent,
            image: product.querySelector('img').src
        };

        cartItems.push(productData);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Show notification
        showNotification('Product added to cart!');
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add(
        'fixed',
        'bottom-4',
        'right-4',
        'bg-green-500',
        'text-white',
        'px-6',
        'py-3',
        'rounded-lg',
        'shadow-lg',
        'transform',
        'transition-all',
        'duration-300',
        'translate-y-0',
        'opacity-100'
    );
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Smooth scroll to top
const scrollToTop = document.createElement('button');
scrollToTop.classList.add(
    'fixed',
    'bottom-4',
    'right-4',
    'bg-blue-500',
    'text-white',
    'p-2',
    'rounded-full',
    'shadow-lg',
    'hover:bg-blue-600',
    'transition-all',
    'duration-300',
    'opacity-0',
    'invisible'
);
scrollToTop.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;

document.body.appendChild(scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.remove('opacity-0', 'invisible');
    } else {
        scrollToTop.classList.add('opacity-0', 'invisible');
    }
});

// Scroll to top when clicked
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});