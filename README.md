Here's the merged **README** with all sections combined, cleaned up, and formatted for clarity:

---

# Pet Adoption Finder 🐾

A user-friendly web application for discovering adoptable pets! Search for pets by type, breed, and location, view pet details, and save favorites. **Upcoming updates** will add powerful new features, including user authentication, a favorites management system, and a full backend built with Node.js and Express.

## Features

- **Search Pets**: Easily filter pets by type, breed, and location to find the perfect match.
- **Pet Details**: View pet profiles with additional info and a photo carousel.
- **Favorite Pets**: Save pets to a local favorites list for easy access.
- **Responsive Design**: Optimized for viewing on desktop and mobile devices.

## Upcoming Features

### Full Backend (Node.js + Express) 🚀

- **Custom API**: Handle pet data, favorites, and adoption requests.
- **Database Integration**: Store user data, pets, and favorites in a database.
- **RESTful Endpoints**: Manage user profiles, search and filter pets, and submit adoption requests.

### User Authentication 🔒

- **JWT-based Authentication**: Securely log in and register users.
- **User Profiles**: Allow users to create accounts, log in, and save pets to their favorites across sessions.
- **"My Account" Section**: View saved pets and track adoption requests.

### Advanced Search and Filtering 🐶

- **Expanded Filters**: Search by animal age, size, and location.
- **Backend-powered Search**: Server-side search and filtering for more precise results.
- **Pagination and Infinite Scrolling**: Load pets gradually to enhance app performance.

### Improved UI with Redux Toolkit 🛠️

- **Redux Toolkit**: Manage application state, including search parameters, favorite pets, and selected pet details.
- **Enhanced Loading and Error States**: Provide loading spinners and error messages for seamless UX.
- **Redux-Powered Favorites**: Store and sync user favorites, managed locally and on the backend.

### Adoption Requests with Modals and Confirmation 💌

- **Confirmation Modal**: Enhance user experience with adoption request confirmation.
- **Custom Portals**: Render modals outside the main DOM hierarchy for better control.

### Admin Dashboard 📊

- **Admin Interface**: Manage pet listings, add new pets, and view adoption requests.
- **Admin Access Control**: Restrict dashboard access to authenticated admins only.

---

## Installation

Follow these steps to set up the project locally.

### 1. **Clone the Repository**

Clone the project to your local machine:

```bash
git clone https://github.com/shironzi/learning-reactJS.git
cd pet-adoption-finder
```

### 2. **Install Dependencies**

#### Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd client
npm install
```

#### Backend (Coming Soon)

When the backend is added, you will also install dependencies for the server:

```bash
cd ../server
npm install
```

### 3. **Environment Variables**

Create a `.env` file in the `server` directory and add the necessary environment variables for database and JWT configuration:

```plaintext
# .env file in server directory
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

For frontend API calls, you can set a `REACT_APP_API_URL` in a `.env` file in the `client` directory:

```plaintext
# .env file in client directory
REACT_APP_API_URL=http://localhost:5000
```

### 4. **Running the Application**

#### Start the Backend Server (Coming Soon)

To start the backend server in development mode:

```bash
cd server
npm run dev
```

The backend will run at `http://localhost:5000`.

#### Start the Frontend Server

To start the frontend React app:

```bash
cd client
npm start
```

The frontend will run at `http://localhost:3000`.

---

### 5. **View the Application**

Once both servers are running, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Run Locally

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Tech Stack

- **React**: Core UI library for building user interfaces
- **Redux Toolkit**: For managing global application state
- **React Router**: Enables client-side routing
- **React Query**: Handles asynchronous data fetching and caching
- **CSS Modules** or **Styled Components**: Modularized styling for components

---

## Contributing

Contributions are always welcome! Please follow the `code of conduct` and `contributing guidelines` for this project.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

This README now combines all key information into one well-organized document that can easily be updated as new features are added! Let me know if you'd like further customization or additions.
