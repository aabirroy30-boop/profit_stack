# ◈ Profit Stack — Business Insight Web Application

## Tech Stack
- **Frontend**: HTML, CSS, Vanilla JS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

---

## Quick Start

### 1. Prerequisites
- Node.js v18+
- PostgreSQL v14+
- VS Code (recommended)

### 2. Clone & Install
```bash
# In project root folder
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 4. Setup Database
```bash
# Create DB in PostgreSQL
psql -U postgres -c "CREATE DATABASE profitstack;"

# Run schema
psql -U postgres -d profitstack -f database/schema.sql

# Load seed data
psql -U postgres -d profitstack -f database/seed.sql
```

### 5. Run the App
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

### 6. Open in Browser