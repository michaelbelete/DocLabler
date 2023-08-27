# DocLabeler - Database Setup and Installation Guide

## Introduction

Welcome to the DocLabeler documentation! This guide will walk you through the process of setting up the database and installing the application. DocLabeler is a tool that allows users to label documents for training NLP-based machine learning models. Here, you'll find comprehensive steps to ensure a smooth setup process.

## Prerequisites
Before you begin, ensure you have the following prerequisites installed on your system:

* Node.js (version 16+)
* npm (Node Package Manager)
* Web Browser
* (Optional) PostgreSQL if you choose to use it as the database system

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

### Configure PostgreSQL (if using it as the database):

Modify the `DATABASE_URL` in the `.env` file to match your PostgreSQL database connection settings.

## SQLite Setup (if preferred):

Open the prisma/schema.prisma file.

Uncomment the section for using SQLite:

```prisma
// For using SQLite
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
Comment out or remove the PostgreSQL datasource section if present.

Update the DATABASE_URL in the .env file to point to your SQLite database file location.

### Running Migrations:

After configuring the database, execute Prisma migrations to establish the schema:

```bash
npx prisma db push
```

This command creates the required database tables based on the schema defined in prisma/schema.prisma.

### Seeding Initial Data:

If you wish to populate the database with initial data, you can use Prisma's seed feature:

```bash
npm run seed
```
This command populates the database with initial data for testing and demonstration.

### Running the Application:

```bash
npm run dev
```

### Access the Application:

Open your web browser and navigate to http://localhost:5173.

## Frameworks/Languages Used
* SvelteKit
* TypeScript
* Tailwind CSS and Tailwind UI
* Prisma

## Author
> Michael Belete

By following these instructions, you should have successfully set up the DocLabeler application and its database. Feel free to reach out if you have any questions or encounter any issues during the setup process. Happy labeling and coding!
