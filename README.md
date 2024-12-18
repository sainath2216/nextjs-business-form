# Business Partner KYC Portal

A Next.js application for managing business partner KYC processes with form submissions and data management.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.17.0 or higher)
- PostgreSQL (v14 or higher)
- npm (comes with Node.js)

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd business-partner-kyc
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

1. Install PostgreSQL if not already installed:
   - [PostgreSQL Downloads](https://www.postgresql.org/download/)
   - Remember your PostgreSQL username and password during installation

2. Create a new PostgreSQL database:
```sql
CREATE DATABASE businessForm;
```

3. Configure Environment Variables:
   - Create a `.env` file in the root directory
   - Add the following (replace values with your PostgreSQL configuration):
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/businessForm"
```

4. Run Database Migrations:
```bash
npx prisma migrate dev
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
business-partner-kyc/
├── app/                    # Next.js app directory
├── prisma/                 # Database schema and migrations
│   └── schema.prisma      # Prisma schema file
├── public/                 # Static files
├── components/            # React components
├── .env                   # Environment variables (create this)
└── package.json          # Project dependencies
```

## Database Schema

The application uses a PostgreSQL database with the following main entities:

- FormSubmission: Stores business partner information including:
  - General Details
  - Bank Details
  - GST Details
  - Contact Information
  - Address Details
  - Turnover Declaration

## Available Scripts

```bash
# Development
npm run dev         # Start development server

# Production
npm run build      # Build the application
npm start          # Start production server

# Database
npx prisma studio  # Open Prisma Studio to manage data
npx prisma migrate dev  # Run database migrations
```

## Tech Stack

- **Frontend**: Next.js 15.0.4
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: 
  - Radix UI
  - Shadcn/ui
  - TailwindCSS
- **Form Management**: React Hook Form with Zod
- **State Management**: Zustand

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify PostgreSQL is running
   - Check credentials in `.env` file
   - Ensure database exists

2. **Installation Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and run `npm install` again

3. **Port Conflicts**
   - Default port is 3000
   - Change port: `npm run dev -- -p 3001`

### Getting Help

If you encounter any issues:
1. Check the error logs
2. Verify all prerequisites are installed
3. Ensure all environment variables are set correctly

## License

[Your License Here]

## Contributing

[Your Contributing Guidelines]
