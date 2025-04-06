# Task Management Application

A full-stack task management application built with TypeScript, React, Node.js, Express, and SQL.

## Features

- User authentication (register/login)
- Private task management
- CRUD operations for tasks
- Responsive design
- SQL database integration

## Tech Stack

- Frontend: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQL
- Authentication: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up the database:
   - Create a SQL database
   - Update the database configuration in `server/.env`

4. Start the development servers:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Testing

Run tests for both client and server:
```bash
npm test
```

## Project Structure

```
task-management-app/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── package.json           # Root package.json
└── README.md             # This file
``` # Task_management_system
