/* Starting product catalog. Used on a browser's first visit and after "Reset catalog" in admin.
   Photos are in assets/img/products/<slug>/1.jpg, 2.jpg, ... */
window.CATEGORIES = { tops: 'Tops', outerwear: 'Outerwear', sets: 'Sets', kids: 'Kids' };
/* Raise this whenever SEED_PRODUCTS changes. store.js compares it with the version saved in
   the browser and reloads the catalog if it's older. */
window.SEED_VERSION = 2;

/* Made-up customers so the admin Customers tab isn't empty. Loaded once, only when the
   browser has no customers saved yet. */
window.SEED_CUSTOMERS = [
  { name: 'Maria Santos', email: 'maria.santos@example.com', phone: '0917 000 0101', address: 'Angeles City, Pampanga', orderCount: 3, totalSpent: 2250 },
  { name: 'Juan Dela Cruz', email: 'juan.delacruz@example.com', phone: '0917 000 0102', address: 'Mabalacat, Pampanga', orderCount: 1, totalSpent: 850 },
  { name: 'Angela Reyes', email: 'angela.reyes@example.com', phone: '0917 000 0103', address: 'San Fernando, Pampanga', orderCount: 2, totalSpent: 1300 },
  { name: 'Paolo Mercado', email: 'paolo.mercado@example.com', phone: '0917 000 0104', address: 'Angeles City, Pampanga', orderCount: 1, totalSpent: 400 },
  { name: 'Bea Villanueva', email: 'bea.villanueva@example.com', phone: '0917 000 0105', address: 'Porac, Pampanga', orderCount: 4, totalSpent: 3100 }
];

window.SEED_PRODUCTS = [
  { slug: 'all-black-set', name: 'All Black Set', category: 'sets', price: 1800, stock: 6, featured: true, photos: 2,
    description: 'Head-to-toe black set: relaxed top and matching pants for an easy, all-black fit.' },
  { slug: 'ashgray-polo-denim', name: 'Ash-Gray Polo & Denim', category: 'sets', price: 1300, stock: 10, featured: false, photos: 2,
    description: 'Ash-gray polo paired with denim jeans, a simple combo that works for most occasions.' },
  { slug: 'ashgray-polo', name: 'Ash-Gray Polo', category: 'tops', price: 580, stock: 15, featured: false, photos: 1,
    description: 'Ash-gray polo shirt with a clean collar, easy to dress up or down.' },
  { slug: 'basic-black-tee', name: 'Basic Black Tee', category: 'tops', price: 350, stock: 30, featured: false, photos: 2,
    description: 'A no-fuss black tee built for everyday wear and easy layering.' },
  { slug: 'bigfoot-sighting-tee', name: '"Bigfoot Sighting" Graphic Tee', category: 'tops', price: 480, stock: 12, featured: false, photos: 1,
    description: 'White tee with a playful "Bigfoot Sighting" graphic print for an easy conversation starter.' },
  { slug: 'black-polo', name: 'Black Polo', category: 'tops', price: 600, stock: 18, featured: true, photos: 2,
    description: 'Ribbed black polo with a relaxed drape, dressed up easily with a chain or kept simple.' },
  { slug: 'black-sweater', name: 'Black Sweater', category: 'tops', price: 650, stock: 14, featured: false, photos: 2,
    description: 'Black crew-neck sweater with a soft, relaxed fit for cooler days.' },
  { slug: 'cscsoc-merch-2025', name: 'CSC-SOC Merch 2025', category: 'tops', price: 520, stock: 20, featured: false, photos: 2,
    description: 'Limited-run CSC-SOC 2025 organization tee, made for members and supporters.' },
  { slug: 'coat-jacket-black', name: 'Coat-Jacket Black', category: 'outerwear', price: 1450, stock: 8, featured: false, photos: 2,
    description: 'Black coat-jacket hybrid for a sharp layer over any outfit, casual or dressed-up.' },
  { slug: 'dino-onesie', name: 'Dino Onesie', category: 'sets', price: 950, stock: 7, featured: false, photos: 2,
    description: 'Full dinosaur-hood onesie for lazy days, sleepovers, or just being a little silly.' },
  { slug: 'dirty-white-polo', name: 'Dirty White Double-Breast Pockets Polo', category: 'tops', price: 700, stock: 11, featured: false, photos: 2,
    description: 'Off-white polo with double breast pockets and a worn-in, vintage-inspired wash.' },
  { slug: 'gray-hoodie', name: 'Gray Hoodie', category: 'outerwear', price: 880, stock: 16, featured: true, photos: 4,
    description: 'Heavyweight gray hoodie with a relaxed, oversized fit for everyday comfort.' },
  { slug: 'green-polo', name: 'Green Polo Shirt', category: 'tops', price: 420, stock: 22, featured: false, photos: 2,
    description: 'Forest-green polo shirt, a versatile piece for both casual and smart-casual looks.' },
  { slug: 'la-polo', name: '"LA" Polo', category: 'tops', price: 620, stock: 13, featured: false, photos: 2,
    description: 'Light-blue polo with an "LA" chest print, styled easily with denim or shorts.' },
  { slug: 'light-brown-polo', name: 'Light Brown Polo', category: 'tops', price: 560, stock: 17, featured: false, photos: 2,
    description: 'Light brown short-sleeve polo with a neutral tone that pairs with almost anything.' },
  { slug: 'mint-polo', name: 'Mint Polo Shirt', category: 'tops', price: 460, stock: 19, featured: false, photos: 2,
    description: 'Soft mint polo shirt for a fresh pop of color in a casual fit.' },
  { slug: 'sparkly-coat', name: 'Sparkly Coat', category: 'outerwear', price: 1850, stock: 4, featured: false, photos: 2,
    description: 'Statement coat with a subtle sparkle finish, worn open over a plain tee.' },
  { slug: 'chiikawa-kids-polo', name: 'Special Edition Chiikawa Polo (Kids)', category: 'kids', price: 520, stock: 10, featured: false, photos: 3,
    description: 'Kids-sized polo in a special-edition Chiikawa print, sized for younger fans.' },
  { slug: 'superior-collared-shirt', name: 'Superior Quality Collared Shirt', category: 'tops', price: 680, stock: 12, featured: false, photos: 2,
    description: 'Raglan-sleeve collared shirt with a graphic front, built with a sturdier, heavier fabric.' },
  { slug: 'superior-collared-floral-jacket', name: 'Superior Quality Collared Shirt + Floral Jacket', category: 'sets', price: 1550, stock: 6, featured: false, photos: 2,
    description: 'The Superior Quality Collared Shirt bundled with a floral print jacket for an instant layered look.' },
  { slug: 'white-olive-collared-sweater', name: 'White & Olive Collared Sweater', category: 'tops', price: 720, stock: 9, featured: false, photos: 1,
    description: 'White sweater with an olive collar panel, layered here over a plain polo.' },
  { slug: 'white-hoodie', name: 'White Hoodie', category: 'outerwear', price: 860, stock: 15, featured: false, photos: 2,
    description: 'Clean white hoodie with a roomy hood and kangaroo pocket.' },
  { slug: 'white-tee-emblem', name: 'White Tee w/ Emblem', category: 'tops', price: 420, stock: 24, featured: false, photos: 2,
    description: 'White tee with a small emblem print on the chest, kept simple and easy to layer.' },
  { slug: 'white-purple-windbreaker', name: 'White-Purple Windbreaker', category: 'outerwear', price: 900, stock: 11, featured: true, photos: 1,
    description: 'Lightweight zip-up windbreaker in white and purple color-blocking, built for transitional weather.' }
];
