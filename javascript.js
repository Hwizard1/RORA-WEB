const defaultConfig = {
    company_name: "RORA",
    logo_url: "",
    tagline: "Innovation Meets Excellence",
    hero_description: "Your trusted partner in Agriculture, Construction, Tourism, Arts & Design, Real Estate, and Retail. Delivering quality services with professionalism and integrity.",
    phone_number: "+1 234 567 8900",
    email_address: "info@rora.com",
    whatsapp_number: "+1234567890",
    background_color: "#f8f9fa",
    primary_color: "#1a1a2e",
    accent_color: "#d4af37",
    button_color: "#25D366"
};

// Initialize functionality
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    updateGallery(defaultConfig);
    updateSocialIcons();
    // In a real environment, onConfigChange would be triggered by the SDK
    onConfigChange(defaultConfig); 
});

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

function onConfigChange(config) {
    document.getElementById('company-name').textContent = config.company_name;
    document.getElementById('tagline').textContent = config.tagline;
    document.getElementById('hero-description').textContent = config.hero_description;
    document.getElementById('phone-number').textContent = config.phone_number;
    document.getElementById('email-address').textContent = config.email_address;
    
    const whatsappUrl = `https://wa.me/${config.whatsapp_number.replace(/[^0-9]/g, '')}`;
    document.getElementById('whatsappBtn').href = whatsappUrl;
    document.getElementById('ctaWhatsappBtn').href = whatsappUrl;
}

function updateGallery(config) {
    const galleryGrid = document.getElementById('galleryGrid');
    const placeholderIcons = ['🌾', '🏗️', '🗺️', '🎨', '🏘️', '🛒'];
    
    galleryGrid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<div class="gallery-placeholder">${placeholderIcons[i]}</div>`;
        galleryGrid.appendChild(item);
    }
}

function updateSocialIcons() {
    const socialContainer = document.getElementById('socialIcons');
    const icons = [
        { label: 'f', url: '#' },
        { label: '📷', url: '#' },
        { label: 'in', url: '#' }
    ];
    
    socialContainer.innerHTML = icons.map(social => 
        `<a href="${social.url}" class="social-icon">${social.label}</a>`
    ).join('');
}