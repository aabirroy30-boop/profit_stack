-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────
-- USERS TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- CUSTOMERS TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    phone       VARCHAR(20) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- PRODUCTS TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category    VARCHAR(100),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- SALES TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sales (
    id            SERIAL PRIMARY KEY,
    customer_id   INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    product_id    INTEGER REFERENCES products(id) ON DELETE SET NULL,
    quantity      INTEGER NOT NULL CHECK (quantity > 0),
    total_amount  NUMERIC(10, 2) NOT NULL,
    sale_date     DATE DEFAULT CURRENT_DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- PAYMENTS TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id             SERIAL PRIMARY KEY,
    sale_id        INTEGER REFERENCES sales(id) ON DELETE CASCADE,
    amount         NUMERIC(10, 2) NOT NULL,
    method         VARCHAR(50) CHECK (method IN ('cash', 'card', 'upi', 'bank_transfer', 'other')),
    status         VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    paid_at        TIMESTAMP,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- REPORTS TABLE
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    type          VARCHAR(50) CHECK (type IN ('sales', 'revenue', 'customers', 'products', 'payments')),
    generated_by  INTEGER REFERENCES users(id) ON DELETE SET NULL,
    file_path     VARCHAR(255),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- INDEXES FOR PERFORMANCE
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sales_customer    ON sales(customer_id);
CREATE INDEX IF NOT EXISTS idx_sales_product     ON sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_date        ON sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_payments_sale     ON payments(sale_id);
CREATE INDEX IF NOT EXISTS idx_payments_status   ON payments(status);
CREATE INDEX IF NOT EXISTS idx_users_email       ON users(email);
CREATE INDEX IF NOT EXISTS idx_customers_email   ON customers(email);