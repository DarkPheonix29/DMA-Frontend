# React Frontend - Developer Guide

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  The page will reload when you make changes.\
  You may also see any lint errors in the console.

- `npm test` - Launches the test runner in the interactive watch mode.

- `npm run build` - Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.\
  The build is minified and the filenames include the hashes.

- `npm run eject` - **Note: this is a one-way operation. Once you `eject`, you can't go back!**\
  If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

# Application Structure

We follow a **component-based structure** to ensure scalability, reusability and ease of testing.

## Components

Each UI element is a **component**. Smaller components are composed into larger ones:

> Example: A `Navbar` component is created and used inside the `Home` page component, which is then rendered by `App.js`.

```
src/
├── components/             # Reusable UI components
│   ├── Menu/
│   │   ├── MenuList.jsx
│   │   └── MenuItem.jsx
│   ├── Start/
│   │   ├── CategoryButton.jsx
│   │   └── CategoryList.jsx
│   └── RequestWaiter.jsx
├── pages/                  # Pages or views
│   └── Home.jsx
├── services/               # API service modules
│   └── TableService.js
├── App.js
└── index.js
```

# Naming Conventions

- **File & Component Names:** `PascalCase` (e.g., `CategoryList.jsx`)
- **Functions & Variables:** `camelCase` (e.g., `handleClick`, `userList`)
- **CSS Classes (if not Tailwind):** `kebab-case`
- **Hooks:** Start custom hooks with `use` (e.g., useAuth)

# React Best Practices

- Use **functional components** and **hooks** (`useState`, `useEffect`, etc)
- **One component = One responsibility**
- Group logic with related UI as much as possible
- Keep component files under ~200 lines for clarity

# Tailwind CSS Conventions

- Use **utility-first** styling.
- Structure classes with intention:

```
<div className="p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-xl font-bold">Hello</h1>
</div>
```

- Prefer **custom utility classes** via Tailwind `Theme` over inline styles or vanilla CSS
