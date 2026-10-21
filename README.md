# Online Computers

A full-stack starter store built with React, Vite, Node.js, and Express.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install

Run these commands from the project root:

```sh
npm install
npm install --prefix server
npm install --prefix client
```

## Run the whole project

In the VS Code terminal, from the project root:

```sh
npm run dev
```

The React app is available at <http://localhost:5173> and the API at
<http://localhost:5000/api>.

## Project structure

```text
.
├── client/                 # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express API
│   ├── controller/
│   │   ├── category.js     # Category request handlers
│   │   └── product.js      # Product request handlers
│   ├── data/
│   │   ├── category.json  # Categories
│   │   └── product.json   # Products
│   ├── lib/
│   │   ├── asyncHandler.js # Async Express error forwarding
│   │   └── prisma.js       # Shared Prisma client
│   ├── prisma/
│   │   ├── schema.prisma   # MySQL database schema
│   │   └── seed.js         # Imports the JSON catalog into MySQL
│   ├── route/
│   │   ├── category.js    # Category endpoints
│   │   └── product.js     # Product and comparison endpoints
│   ├── .env.example       # MySQL connection string template
│   ├── package.json
│   └── server.js
└── package.json            # Runs client and server together
```

The API includes `GET /api/health`, `GET /api/products`,
`GET /api/products/:id`, `GET /api/categories`, `GET /api/categories/:id`, and
`POST /api/compare`. The API reads products and categories from MySQL through
Prisma. The JSON files in `server/data/` provide the initial data for seeding.

The main navigation includes the home page, product catalog, customer service,
sign-in, registration, about, and contact pages, as well as product comparison
and the shopping cart. Sign-in and registration are display-only placeholders;
authentication and contact handling are not connected yet.

## MySQL database

The Prisma schema is in `server/prisma/schema.prisma`. It defines products,
categories, users, addresses, carts, and orders. To set up another environment:

1. Start MySQL and create a database named `online_computers`.
2. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL` to your
   MySQL connection string.
3. Install dependencies and start the app from the project root:

   ```sh
   npm install
   npm install --prefix server
   npm install --prefix client
   npm run dev
   ```

Starting the server automatically applies pending migrations and imports the
categories and products from `server/data/` into MySQL. The seed uses upserts,
so restarting the app updates the catalog without creating duplicate rows. To
run the local MySQL server separately, use:

```powershell
npm --prefix server run db:start
```

Product and category API requests read from MySQL through Prisma.
The API connects to MySQL when it starts and exits with an explicit error if
`DATABASE_URL` is missing or the database is unavailable. The health endpoint
also checks the database connection.

Use `npm --prefix server run db:migrate` for subsequent schema changes.
