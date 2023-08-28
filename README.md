# DocLabeler - Database Setup and Installation Guide

## Introduction

Welcome to the DocLabeler documentation! This guide will walk you through the process of setting up the database and installing the application. DocLabeler is a tool that allows users to label documents for training NLP-based machine learning models. Here, you'll find comprehensive steps to ensure a smooth setup process.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js (version 16+)
- npm (Node Package Manager)
- Web Browser
- (Optional) PostgreSQL if you choose to use it as the database system

## Setup

Follow the steps below to get DocLabeler up and running on your local machine.

### Clone the Repository:

```bash
git clone https://github.com/michaelbelete/DocLabler.git
cd DocLabler
```

### Install Dependencies:

```bash
npm install
```

### Rename `.env.example`:

Duplicate the `.env.example` file in the project root directory and rename the copy to `.env`

### Database Configuration

For the database configuration you can choose between PostgreSQL or SQLite. In this guide i will be showing you how to set it up in both but if you want to use other databases check out this [Guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql#:~:text=The%20connection%20URL%20for%20a,format%20for%20the%20connection%20URL.)

#### 1. Configure PostgreSQL (if using it as the database):

Modify the `DATABASE_URL` in the `.env` file to match your PostgreSQL database connection URL/string.

If you want to know what a Postgresql connection URL/string is checkout this [Guide](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)

#### 2. SQLite Setup (if preferred):

If you prefer SQLite instead od PostgreSQL, Open the `prisma/schema.prisma` file and uncomment the section you see below for using SQLite:

```prisma
// For using SQLite
datasource db {
  provider = "SQLite"
  url      = env("DATABASE_URL")
}
```

Then Comment out or remove the PostgreSQL datasource section.

If you didn't create the SQLite database skip to **Running migrations** since prisma will handle the database creation, but if you have created a SQLite database update the `DATABASE_URL` in the `.env` file to point to your SQLite database file location.

### Running Migrations:

After configuring the database, This command below creates the required database tables based on the schema defined in `prisma/schema.prisma`.

```bash
npx prisma db push
```

### Seeding Initial Data:

If you wish to populate the database with initial data, you can use Prisma's seed feature:

```bash
npm run seed
```

This command populates the database with initial data from a sample dataset for testing and demonstration.

### Running the Application:

```bash
npm run dev
```

### Access the Application:

Open your web browser and navigate to http://localhost:5173.
The url may change so check the terminal before accessing it in the browser

## Frameworks/Languages Used

- SvelteKit
- TypeScript
- Tailwind CSS and Tailwind UI
- Prisma

## Author

### [Michael Belete](https://www.linkedin.com/in/michael-belete-8600a3176/)

By following these instructions, you should have successfully set up the DocLabeler application and its database. Feel free to reach out if you have any questions or encounter any issues during the setup process. Happy labeling and coding!
