-- ─────────────────────────────────────────
-- SEED ADMIN & USER
-- Passwords: admin123 / user123 (bcrypt hashed)
-- ─────────────────────────────────────────
INSERT INTO users (name, email, password, role) VALUES
(
  'Admin User',
  'admin@profitstack.com',
  '$2a$10$Rrb4FcMtVGDLgNzSzPL5ROGWAl3bMHSZj0hX3VWaWkC5kHfSS5fuy',
  'admin'
),
(
  'John Doe',
  'john@profitstack.com',
  '$2a$10$YyPmBxoSGcT/YCNS55e4A.pMgGQtSuD9bVOYqNBZ9MqPm9bJVt1Yi',
  'user'
)
ON CONFLICT (email) DO NOTHING;

-- ─────────────────────────────────────────
-- SEED CUSTOMERS
-- ─────────────────────────────────────────
INSERT INTO customers (name, email, phone) VALUES
('Alice Johnson',  'alice@example.com',  '9876543210'),
('Bob Smith',      'bob@example.com',    '9123456780'),
('Carol White',    'carol@example.com',  '9012345678'),
('David Brown',    'david@example.com',  '9988776655'),
('Eva Green',      'eva@example.com',    '9871234560')
ON CONFLICT (email) DO NOTHING;

-- ─────────────────────────────────────────
-- SEED PRODUCTS
-- ─────────────────────────────────────────
INSERT INTO products (name, description, price, stock, category) VALUES
('Laptop Pro 15',    'High performance laptop',        75000.00, 30, 'Electronics'),
('Wireless Mouse',   'Ergonomic wireless mouse',        1500.00, 150,'Electronics'),
('Office Chair',     'Adjustable ergonomic chair',     12000.00, 25, 'Furniture'),
('Standing Desk',    'Height adjustable desk',         25000.00, 15, 'Furniture'),
('USB-C Hub',        '7-in-1 USB-C hub',               3500.00, 80, 'Accessories'),
('Monitor 27"',      '4K IPS display monitor',        35000.00, 20, 'Electronics'),
('Keyboard Mech',   'Mechanical RGB keyboard',         6000.00, 60, 'Electronics'),
('Webcam HD',        '1080p HD webcam',                4500.00, 45, 'Accessories');

-- ─────────────────────────────────────────
-- SEED SALES (last 6 months)
-- ─────────────────────────────────────────
INSERT INTO sales (customer_id, product_id, quantity, total_amount, sale_date) VALUES
(1, 1, 1,  75000.00, CURRENT_DATE - INTERVAL '150 days'),
(2, 2, 3,   4500.00, CURRENT_DATE - INTERVAL '130 days'),
(3, 3, 2,  24000.00, CURRENT_DATE - INTERVAL '110 days'),
(4, 5, 4,  14000.00, CURRENT_DATE - INTERVAL '90 days'),
(5, 6, 1,  35000.00, CURRENT_DATE - INTERVAL '75 days'),
(1, 7, 2,  12000.00, CURRENT_DATE - INTERVAL '60 days'),
(2, 4, 1,  25000.00, CURRENT_DATE - INTERVAL '45 days'),
(3, 8, 3,  13500.00, CURRENT_DATE - INTERVAL '30 days'),
(4, 1, 1,  75000.00, CURRENT_DATE - INTERVAL '15 days'),
(5, 2, 5,   7500.00, CURRENT_DATE - INTERVAL '5 days');

-- ─────────────────────────────────────────
-- SEED PAYMENTS
-- ─────────────────────────────────────────
INSERT INTO payments (sale_id, amount, method, status, paid_at) VALUES
(1,  75000.00, 'bank_transfer', 'completed', CURRENT_TIMESTAMP - INTERVAL '150 days'),
(2,   4500.00, 'upi',           'completed', CURRENT_TIMESTAMP - INTERVAL '130 days'),
(3,  24000.00, 'card',          'completed', CURRENT_TIMESTAMP - INTERVAL '110 days'),
(4,  14000.00, 'cash',          'completed', CURRENT_TIMESTAMP - INTERVAL '90 days'),
(5,  35000.00, 'card',          'completed', CURRENT_TIMESTAMP - INTERVAL '75 days'),
(6,  12000.00, 'upi',           'completed', CURRENT_TIMESTAMP - INTERVAL '60 days'),
(7,  25000.00, 'bank_transfer', 'pending',   NULL),
(8,  13500.00, 'cash',          'completed', CURRENT_TIMESTAMP - INTERVAL '30 days'),
(9,  75000.00, 'card',          'pending',   NULL),
(10,  7500.00, 'upi',           'completed', CURRENT_TIMESTAMP - INTERVAL '5 days');