# Budget Tracking Application

This project is a Budget Tracking Application built with a MERN (MongoDB, Express, React, Node.js) stack. It enables users to manage their monthly budgets, track expenses, and visualize their financial trends. Below, you'll find an overview of the project, its features, and the technology stack used.

## Features

### User Authentication and Authorization

- **Sign In and Sign Up**: Users can register and log in to the application.
- **JWT-based Authentication**: Authentication is implemented using JSON Web Tokens (JWT).
- **User Registration**: During registration, users are prompted to provide their email, name, password, and a budget limit.

### Monthly Budget Management

- **Edit Budget Limit**: Users can edit their budget limit.
- **Add Budget Entries**: Users can add new budget entries, including date/time, transaction name, and budget amount.
- **List Entries**: Users can view a list of all their budget entries.
- **Edit Entries**: Users have the option to edit existing entries.
- **Delete Entries**: Users can delete budget entries.
- **Budget Exceedance Indicator**: The application provides notifications when users exceed their monthly budget.

### Date Filtering

- **Date Filtering**: Users can filter budget entries by selecting dates using a calendar or date picker. The default date is the current date.

### Reporting

- **Budget Trends**: Users can view budget trends for different timeframes, including the last month, last 6 months, and last 12 months.
- **Exceedance Visualization**: The application visualizes where users have exceeded their budget limits within the same chart.

## Technology Stack

This project is structured as a monorepo and leverages the following technologies:

- **Nx**: Nx is used for project creation and management. It provides a monorepo structure for the application.
- **Express**: The API (backend) of the application is built using Express, a Node.js framework.
- **TypeScript**: The codebase is written in TypeScript, ensuring type safety and maintainability.
- **MongoDB**: The database used is MongoDB, and Mongoose is utilized for database operations.
- **React**: The frontend is built with React, a popular JavaScript library for building user interfaces.
- **Material-UI**: Material-UI is used for creating a visually appealing and responsive user interface.
- **React Router**: React Router is employed for client-side routing.
- **Redux Toolkit**: Redux Toolkit is used for state management within the React application.
- **RTK Query**: RTK Query is utilized to handle API calls and simplify data fetching.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root of the directory and run `npm install` to install both frontend and backend dependencies.
3. Start the API by running `nx serve api` in the terminal.
4. Start the React app by running `nx serve client` in the terminal.

Certainly, here's the updated project structure section in your README:

## Project Structure

The project follows a monorepo structure managed by Nx. Each application (frontend and backend) is organized as follows:

- **Frontend (React Application)**:
  - Located in `apps/client`
  - Contains the React application responsible for the user interface.
  - You can find its "project.json" file with scripts and configuration specific to the React app in this directory.

- **Backend (Express API)**:
  - Located in `apps/api`
  - Houses the Express API responsible for handling server-side logic and database operations.
  - You can find its "project.json" file with scripts and configuration specific to the Express API in this directory.

This structure ensures clear separation and organization of the frontend and backend components of the project, making it easier to manage and maintain.
