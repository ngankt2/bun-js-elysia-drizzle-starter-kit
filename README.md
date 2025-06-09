# Bun + Elysia + Drizzle Starter Kit

A modern backend starter kit powered by [Bun](https://bun.sh) runtime, [Elysia](https://elysiajs.com) web framework, [Drizzle ORM](https://orm.drizzle.team), and [PostgreSQL](https://www.postgresql.org) database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh) (latest version)
- [Node.js](https://nodejs.org) (optional, for compatibility with some tools)
- [PostgreSQL](https://www.postgresql.org/download/) (database server running locally or remotely)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone git@github.com:ngankt2/bun-js-elysia-drizzle-starter-kit.git
cd bun-js-elysia-drizzle-starter-kit
```

### 2. Install Dependencies

Install the project dependencies using Bun:

```bash
bun install
```

This will install all required dependencies listed in `package.json`, including `elysia`, `drizzle-orm`, `pg`, and development tools like `drizzle-kit`.

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the necessary environment variables. Example:

```env
DATABASE_URL=postgres://user:password@localhost:5432/database_name
PORT=3000
```

Replace `user`, `password`, and `database_name` with your PostgreSQL credentials and database name.

### 4. Set Up the Database

#### Generate Database Migrations

To generate migration files for your database schema:

```bash
bun run db:generate
```

This uses `drizzle-kit` to create migration files based on your schema defined in `drizzle.config.ts`.

#### Apply Migrations to the Database

Push the schema changes to your PostgreSQL database:

```bash
bun run db:push
```

This applies the migrations to your database without generating migration files (useful for rapid development).

#### Explore the Database

You can use Drizzle Studio to interact with your database:

```bash
bun run db:studio
```

This starts a web-based interface to explore and manage your database.

### 5. Run the Application

#### Development Mode

To start the server in development mode with hot-reloading:

```bash
bun run dev
```

This runs the application with `--watch` to automatically reload on code changes.

#### Production Mode

To run the server in production mode:

```bash
bun run prod
```

The server will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### 6. API Documentation

The project includes `@elysiajs/swagger` for automatic API documentation. Once the server is running, visit:

```
http://localhost:3000/swagger
```

This provides an interactive Swagger UI to explore and test your API endpoints.

## Project Structure

```
├── src
│   ├── index.ts          # Main entry point for the application
│   └── ...               # Other application files (e.g., routes, models)
├── drizzle.config.ts     # Drizzle ORM configuration
├── .env                  # Environment variables (not tracked in git)
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Available Scripts

- `bun run dev`: Run the application in development mode with hot-reloading.
- `bun run prod`: Run the application in production mode.
- `bun run db:generate`: Generate database migration files.
- `bun run db:push`: Apply schema changes directly to the database.
- `bun run db:studio`: Launch Drizzle Studio to manage the database.

## Dependencies

- **Elysia**: A fast and modern web framework for Bun.
- **Drizzle ORM**: A lightweight and performant ORM for TypeScript.
- **PostgreSQL**: The database used for persistent storage.
- **Swagger**: Auto-generated API documentation.

## Troubleshooting

- **Database Connection Issues**: Ensure your PostgreSQL server is running and the `DATABASE_URL` in `.env` is correct.
- **Port Conflicts**: If port `3000` is in use, update the `PORT` variable in `.env`.
- **Bun Compatibility**: Ensure you are using the latest version of Bun to avoid compatibility issues.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License.