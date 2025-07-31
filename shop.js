// Sample product data (in a real application, this would come from a backend API)
const products = [
    {
        id: 1,
        name: 'Premium Watch',
        description: 'Elegant timepiece for any occasion',
        price: 299,
        category: 'electronics',
        image: 'https://via.placeholder.com/400x300'
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        description: 'High-quality sound with noise cancellation',
        price: 199,
        category: 'electronics',
        image: 'https://via.placeholder.com/400x300'
    },
    {
        id: 3,
        name: 'Cotton T-Shirt',
        description: 'Comfortable casual wear',
        price: 29,
        category: 'fashion',
        image: 'https://via.placeholder.com/400x300'
    },
    // Add more products as needed
];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const loadMoreBtn = document.getElementById('load-more');

// State
let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [...products];

// Filter products
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }

        // Price filter
        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange.split('-').map(Number);
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        }

        return true;
    });

    // Sort products
    sortProducts();

    // Reset pagination and display
    currentPage = 1;
    displayProducts();
}

// Sort products
function sortProducts() {
    const sortValue = sortBy.value;

    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default: // 'featured'
            filteredProducts = [...products];
            break;
    }

    displayProducts();
}

// Display products
function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Clear existing products
    if (currentPage === 1) {
        productsGrid.innerHTML = '';
    }

    // Add products to grid
    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        productCard.dataset.id = product.id;
        productCard.dataset.category = product.category;
        productCard.dataset.price = product.price;

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="price text-2xl font-bold text-blue-600">$${product.price}</span>
                    <button class="add-to-cart bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });

    // Update load more button visibility
    loadMoreBtn.style.display = endIndex >= filteredProducts.length ? 'none' : 'inline-block';
}

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
sortBy.addEventListener('change', sortProducts);

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    displayProducts();
});

// Initialize
displayProducts();