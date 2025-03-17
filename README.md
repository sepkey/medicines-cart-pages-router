# Medicines Store

This is a React TypeScript app for a medication shopping pages. It utilizes modern React technologies, follows best practices for modularity and maintainability.


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
- [Technologies](#technologis)

## Prerequisites
- [Node](https://nodejs.org/en): >=20
- [Nextjs](https://nextjs.org): >=14

## Installation
Follow the instructions:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install packeges:
   ```bash
   npm install
   ```

3. Run the App server:
   ```bash
   npm run dev
   ```

4. Run the json server for data fetching:
   ```bash
   npm install -g json-server
   ```

    ```bash
   json-server --watch db.json --port 3001
   ```


## Features

- **Medicines List**: Fetch and display medicines list from a json-server
- **Add and remove Items**: Add the items to the cart and delete it from the server.
- **Pagination**: Smooth navigation through medicines list with  server-side pagination using search params.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Feature-based Structure**: Organize the codebase into a feature-based folder structure, making it easier to scale.


## Technologies

- **Languages and Libraries**: Nextjs(Pages router) - Typescript
- **Global State Management**: Zustand
- **UI and Theming**: Shadcn UI - Tailwind CSS
- **Internationalization**: Next-Intl
- **Static Code Analysis** : Eslint - Prettier

