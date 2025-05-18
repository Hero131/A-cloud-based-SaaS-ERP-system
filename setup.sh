#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up ERP Application...${NC}"

# Backend setup
echo -e "\n${GREEN}Setting up backend...${NC}"
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..

# Frontend setup
echo -e "\n${GREEN}Setting up frontend...${NC}"
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..

# Create .env files if they don't exist
echo -e "\n${GREEN}Creating environment files...${NC}"

# Backend .env
if [ ! -f backend/.env ]; then
    cat > backend/.env << EOL
POSTGRES_USER=erp_user
POSTGRES_PASSWORD=erp_password
POSTGRES_DB=erp_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
JWT_SECRET=local_development_secret
JWT_EXPIRES_IN=1d
EOL
    echo "Created backend/.env"
fi

# Frontend .env
if [ ! -f frontend/.env ]; then
    cat > frontend/.env << EOL
REACT_APP_API_URL=http://localhost:5000/api
EOL
    echo "Created frontend/.env"
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\nTo start the application:"
echo -e "1. Start PostgreSQL database: ${BLUE}docker-compose up -d postgres${NC}"
echo -e "2. Start backend: ${BLUE}cd backend && npm run dev${NC}"
echo -e "3. Start frontend: ${BLUE}cd frontend && npm start${NC}" 