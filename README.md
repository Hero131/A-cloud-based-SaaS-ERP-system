# Cloud-Based ERP Application

A modern Enterprise Resource Planning (ERP) system built with Node.js, Express, and PostgreSQL, featuring a React frontend.

## Features

- User authentication and authorization
- Branch management
- Product inventory management
- Customer relationship management
- Sales tracking and reporting
- Multi-branch support
- Role-based access control

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication

### Frontend
- React
- Material-UI
- Redux Toolkit
- React Router

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cloud-based-erp-application
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
   - Copy `backend/1.env` to `backend/.env`
   - Update the database credentials and other configurations

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=erp_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=90d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 