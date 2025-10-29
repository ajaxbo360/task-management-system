# Task Management System

![CI/CD](https://github.com/YOUR_USERNAME/task-management-system/actions/workflows/ci.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-47%25-yellow)
![Tests](https://img.shields.io/badge/tests-11%20passed-success)

## 🚀 Full-Stack Task Management Application

Built with:

- **Backend:** Node.js, Express, TypeScript, MongoDB
- **Frontend:** React, TypeScript, Material-UI, Redux Toolkit
- **Testing:** Jest, Supertest, React Testing Library
- **Quality:** ESLint, Prettier
- **CI/CD:** GitHub Actions

## 📊 Features

- ✅ User authentication (JWT)
- ✅ Task CRUD operations
- ✅ Task filtering by status/priority
- ✅ Protected routes
- ✅ 47% test coverage
- ✅ Automated CI/CD pipeline

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test                 # Run tests
npm run test:coverage    # With coverage
npm run test:watch       # Watch mode

# Quality checks
npm run lint            # Check code
npm run format          # Format code
npm run quality         # Run all checks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB

### Installation

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/task-management-system.git
cd task-management-system

# Install backend
cd backend
npm install
cp .env.example .env  # Configure environment

# Install frontend
cd ../frontend
npm install

# Run development
cd ../backend && npm run dev   # Backend on :5000
cd ../frontend && npm run dev  # Frontend on :5173
```

## 📝 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## 📊 Project Structure

```
task-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   └── utils/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── services/
│   └── package.json
└── .github/
    └── workflows/
        └── ci.yml
```

## 🤝 Contributing

Pull requests are welcome! Please ensure:

- ✅ All tests pass
- ✅ Code is linted and formatted
- ✅ Coverage doesn't decrease

## 📄 License

MIT
