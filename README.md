# MiniDB — A Simple Relational Database Management System

MiniDB is a **lightweight relational database engine** implemented in **TypeScript**.  
It supports multiple databases, tables with CRUD operations, primary/unique keys, joins, and persistent storage.  
Additionally, it comes with a **Next.js frontend** for running SQL commands interactively in the browser.

---

## Features

- Multiple database support (`CREATE DATABASE`, `USE`, `DROP DATABASE`)
- Table management (`CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`)
- Column constraints: `PRIMARY KEY`, `UNIQUE`
- Basic **JOINs** between tables
- Interactive **REPL** for testing SQL commands in the terminal
- Persistent storage using JSON files (`FileStore`)
- Frontend SQL console built with Next.js
- Query history and interactive table view

---

## Tech Stack

- **Backend**: Node.js, TypeScript
- **Frontend**: Next.js, React, Axios
- **Persistence**: JSON files (local filesystem)
- **REPL**: Node.js readline interface

---

## Project Structure

mini-rdbms-engine/
├── rdbms-engine/ # Backend engine
│ ├── src/
│ │ ├── core/
│ │ │ ├── Database.ts # Database class
│ │ │ ├── DatabaseManager.ts # DatabaseManager class
│ │ │ ├── Table.ts # Table class
│ │ │ └── types.ts # Core types (Column, Row, etc.)
│ │ ├── sql/
│ │ │ ├── parser.ts # Parse SQL commands
│ │ │ ├── executor.ts # Execute SQL commands
│ │ │ └── types.ts # SQL command types
│ │ ├── persistence/
│ │ │ └── fileStore.ts # Save/load databases
│ │ ├── repl/
│ │ │ └── repl.ts # Terminal REPL
│ │ └── testAll.ts # Test script for engine
│ ├── web/
│ │ └── server.ts # API server for frontend
│ ├── package.json
│ ├── tsconfig.json
│ └── data/ # Database JSON storage
│
├── mini-db-client/ # Frontend Next.js client
│ ├── app/
│ │ └── page.tsx # Main page / workspace
│ ├── components/ # Reusable UI components
│ │ ├── SqlEditor.tsx # CodeMirror-based SQL editor
│ │ ├── ResultTable.tsx # Table for displaying query results
│ │ ├── Toolbar.tsx # Run button + action bar
│ │ ├── DatabaseSidebar.tsx # Left sidebar with databases
│ │ ├── StatusBar.tsx # Error messages or warnings
│ │ ├── QueryHistory.tsx # List of previously executed queries
│ │ └── Toast.tsx # Success feedback messages
│ ├── lib/ # Helper functions for API calls
│ │ ├── api.ts # fetch wrappers: runSQL(), getDatabases()
│ │ └── sqlFormatter.ts # Helper to convert multi-line SQL → single line
│ ├── package.json
│ ├── tailwind.config.js
│ ├── .env
| └── README.md
│
├── README.md # Project documentation
└── .gitignore

---

Absolutely! Here’s a **complete, polished `README.md`** for your `mini-rdbms-engine` project in Markdown format, including cloning, installation, usage, testing, and more:

---

```markdown
# Mini RDBMS Engine

Mini RDBMS Engine is a lightweight relational database management system implemented in **TypeScript**, with support for multiple databases, tables, CRUD operations, primary/unique keys, joins, and persistent storage.  
It comes with a **Next.js frontend** for running SQL commands interactively in the browser.

---

## Project Structure
```

mini-rdbms-engine/
├── rdbms-engine/ # Backend engine
│ ├── src/
│ │ ├── core/
│ │ │ ├── Database.ts # Database class
│ │ │ ├── DatabaseManager.ts # DatabaseManager class
│ │ │ ├── Table.ts # Table class
│ │ │ └── types.ts # Core types (Column, Row, etc.)
│ │ ├── sql/
│ │ │ ├── parser.ts # Parse SQL commands
│ │ │ ├── executor.ts # Execute SQL commands
│ │ │ └── types.ts # SQL command types
│ │ ├── persistence/
│ │ │ └── fileStore.ts # Save/load databases
│ │ ├── repl/
│ │ │ └── repl.ts # Terminal REPL
│ │ └── testAll.ts # Test script for engine
│ ├── web/
│ │ └── server.ts # API server for frontend
│ ├── package.json
│ ├── tsconfig.json
│ └── data/ # Database JSON storage
│
├── mini-db-client/ # Frontend Next.js client
│ ├── app/
│ │ └── page.tsx # Main page / workspace
│ ├── components/ # Reusable UI components
│ │ ├── SqlEditor.tsx # SQL editor
│ │ ├── ResultTable.tsx # Display query results
│ │ ├── Toolbar.tsx # Run button + action bar
│ │ ├── DatabaseSidebar.tsx # List of databases
│ │ ├── StatusBar.tsx # Error/warning messages
│ │ ├── QueryHistory.tsx # Previously executed queries
│ │ └── Toast.tsx # Feedback messages
│ ├── lib/ # Helper functions for API calls
│ │ ├── api.ts # runSQL(), getDatabases()
│ │ └── sqlFormatter.ts # Format multi-line SQL
│ ├── package.json
│ ├── tailwind.config.js
│ └── README.md
│
├── README.md # This file
└── .gitignore

````

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ndickers/rdbms-engine-app.git
cd mini-rdbms-engine
````

### 2. Backend (rdbms-engine)

```bash
cd rdbms-engine
npm install
```

- Start the backend API server:

```bash
npm run dev
# or
node --loader ts-node/esm src/web/server.ts
```

- Ensure the `data/` folder exists for persistent storage.

### 3. Frontend (mini-db-client)

```bash
cd ../mini-db-client
npm install
```

- Set backend API URL in `.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

- Start the frontend:

```bash
npm run dev
```

- Open in browser: `http://localhost:3000`

---

## Usage

### Backend REPL

Start the terminal REPL:

```bash
node --loader ts-node/esm src/repl/repl.ts
```

Example commands:

```sql
CREATE DATABASE shop;
USE shop;
CREATE TABLE products (id INT PRIMARY, name TEXT);
INSERT INTO products VALUES (1, "Laptop");
SELECT * FROM products;
DROP DATABASE shop;
```

### Frontend SQL Console

- Type `USE <database>` to select a database.
- Enter SQL commands in the textarea and click **Run**.
- View results in the table below.
- Displays success, error messages, and query history.

---

## Persistent Storage

- All databases are saved in `rdbms-engine/data/`
- Tables are stored as JSON files
- Dropping a database deletes its files
- Changes persist between server restarts

---

## API Endpoints (Backend)

- `POST /sql` — Run SQL command

  - Body: `{ sql: "SELECT * FROM products;" }`
  - Response: `{ result: [...] }`

- `GET /databases` — List available databases

  - Response: `{ databases: ["shop", "testdb"] }`

- `POST /drop-database` — Drop a database

  - Body: `{ name: "shop" }`
  - Response: `{ message: "Database shop dropped" }`

---

## Example SQL Commands

```sql
-- Create database
CREATE DATABASE shop;

-- Switch database
USE shop;

-- Create table
CREATE TABLE products (id INT PRIMARY, name TEXT);

-- Insert rows
INSERT INTO products VALUES (1, "Laptop");
INSERT INTO products VALUES (2, "Keyboard");

-- Select rows
SELECT * FROM products;

-- Join tables
SELECT * FROM orders JOIN users ON orders.user_id = users.id;

-- Update row
UPDATE products SET name="Gaming Laptop" WHERE id=1;

-- Delete row
DELETE FROM products WHERE id=2;

-- Drop database
DROP DATABASE shop;
```

---

## Testing

Run the automated test script:

```bash
cd rdbms-engine
node --loader ts-node/esm src/testAll.ts
```

Covers:

- Table creation and CRUD
- JOIN queries
- Multi-database management
- Persistence across restarts

---

## Future Enhancements

- Multi-line SQL support in frontend
- Enhanced query error highlighting
- More SQL features: `ORDER BY`, `GROUP BY`, aggregates
- User authentication for multi-user support

---
