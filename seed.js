/* Seeds products, customers and the promo from public/assets/js/data.js.
   Used automatically by server.js when the DB is empty.
   Manual: `npm run seed` (only fills empty collections) or `npm run seed:reset` (wipes products first). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { Product, Customer, Promo } = require('./models');

function loadSeedFile() {
  const code = fs.readFileSync(path.join(__dirname, 'public/assets/js/data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window;
}

async function seed({ reset = false } = {}) {
  const w = loadSeedFile();
  if (reset) await Product.deleteMany({});
  let added = { products: 0, customers: 0, promo: 0 };

  if (await Product.countDocuments() === 0) {
    await Product.insertMany(w.SEED_PRODUCTS.map(p => ({
      id: p.slug, name: p.name, category: p.category, price: p.price, stock: p.stock,
      featured: p.featured, description: p.description,
      images: Array.from({ length: p.photos }, (_, i) => `assets/img/products/${p.slug}/${i + 1}.jpg`)
    })));
    added.products = w.SEED_PRODUCTS.length;
  }
  if (await Customer.countDocuments() === 0) {
    await Customer.insertMany(w.SEED_CUSTOMERS);
    added.customers = w.SEED_CUSTOMERS.length;
  }
  if (!(await Promo.findOne({ key: 'main' }))) {
    await Promo.create({ key: 'main', code: '15FF', pct: 15, validUntil: '2026-10-15' });
    added.promo = 1;
  }
  return added;
}

module.exports = { seed };

if (require.main === module) {
  require('dotenv').config();
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => seed({ reset: process.argv.includes('--reset') }))
    .then(r => { console.log('Seeded:', r); return mongoose.disconnect(); })
    .catch(e => { console.error(e.message); process.exit(1); });
}
