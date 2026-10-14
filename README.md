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
│   ├── package.json
│   └── server.js
└── package.json            # Runs client and server together
```

The API includes `GET /api/health`, `GET /api/products`,
`GET /api/products/:id`, and `POST /api/compare`. Product and comparison data
are currently held in memory; restarting the server resets them.

The main navigation includes the home page, product catalog, customer service,
sign-in, registration, about, and contact pages, as well as product comparison
and the shopping cart. Sign-in and registration are display-only placeholders;
authentication and contact handling are not connected yet.
