const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email format.' });
  next();
};

const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;
  if (!name || price === undefined || stock === undefined)
    return res.status(400).json({ error: 'Name, price, and stock are required.' });
  if (isNaN(price) || price < 0)
    return res.status(400).json({ error: 'Price must be a non-negative number.' });
  if (isNaN(stock) || stock < 0)
    return res.status(400).json({ error: 'Stock must be a non-negative integer.' });
  next();
};

const validateCustomer = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email format.' });
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone))
    return res.status(400).json({ error: 'Phone must be a 10-digit number.' });
  next();
};

const validateSale = (req, res, next) => {
  const { customer_id, product_id, quantity } = req.body;
  if (!customer_id || !product_id || !quantity)
    return res.status(400).json({ error: 'customer_id, product_id, and quantity are required.' });
  if (isNaN(quantity) || quantity <= 0)
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  next();
};

module.exports = { validateLogin, validateProduct, validateCustomer, validateSale };