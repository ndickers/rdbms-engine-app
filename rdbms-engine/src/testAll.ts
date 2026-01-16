import { DatabaseManager } from "./core/DatabaseManager.js";
import { parseSQL } from "./sql/parser.js";
import { executeSQL } from "./sql/executor.js";
import { FileStore } from "./persistence/fileStore.js";

const manager = new DatabaseManager();

// --------------------
// Helper to pretty-print results
// --------------------
function printResult(title: string, data: any) {
    console.log(`\n📌 ${title}`);
    console.table(data);
}

// --------------------
// 1️⃣ Create databases
// --------------------
console.log(executeSQL(manager, parseSQL("CREATE DATABASE shop;")));
console.log(executeSQL(manager, parseSQL("CREATE DATABASE blog;")));

// --------------------
// 2️⃣ Use shop and create tables
// --------------------
console.log(executeSQL(manager, parseSQL("USE shop;")));
console.log(executeSQL(manager, parseSQL("CREATE TABLE users (id INT PRIMARY, email TEXT UNIQUE, age INT);")));
console.log(executeSQL(manager, parseSQL("CREATE TABLE orders (id INT PRIMARY, user_id INT, product TEXT);")));

// --------------------
// 3️⃣ Insert rows
// --------------------
console.log(executeSQL(manager, parseSQL('INSERT INTO users VALUES (1, "alice@test.com", 30);')));
console.log(executeSQL(manager, parseSQL('INSERT INTO users VALUES (2, "bob@test.com", 25);')));
console.log(executeSQL(manager, parseSQL('INSERT INTO orders VALUES (1, 1, "Laptop");')));
console.log(executeSQL(manager, parseSQL('INSERT INTO orders VALUES (2, 2, "Phone");')));

// --------------------
// 4️⃣ Select rows
// --------------------
let users = executeSQL(manager, parseSQL("SELECT * FROM users;"));
printResult("All users", users);

let orders = executeSQL(manager, parseSQL("SELECT * FROM orders;"));
printResult("All orders", orders);

// --------------------
// 5️⃣ Test join
// --------------------
let join = executeSQL(manager, parseSQL("SELECT * FROM users JOIN orders ON users.id = orders.user_id;"));
printResult("Join users and orders", join);

// --------------------
// 6️⃣ Test update
// --------------------
console.log(executeSQL(manager, parseSQL("UPDATE users SET age = 35 WHERE id = 1;")));
users = executeSQL(manager, parseSQL("SELECT * FROM users;"));
printResult("Users after update", users);

// --------------------
// 7️⃣ Test delete
// --------------------
console.log(executeSQL(manager, parseSQL("DELETE FROM orders WHERE id = 2;")));
orders = executeSQL(manager, parseSQL("SELECT * FROM orders;"));
printResult("Orders after delete", orders);

// --------------------
// 8️⃣ Test persistence
// --------------------
FileStore.saveAllDatabases(manager);

// Reload manager to simulate restart
const newManager = new DatabaseManager();
FileStore.loadAllDatabases(newManager);
executeSQL(newManager, parseSQL("USE shop;"));

users = executeSQL(newManager, parseSQL("SELECT * FROM users;"));
printResult("Users after reload", users);

orders = executeSQL(newManager, parseSQL("SELECT * FROM orders;"));
printResult("Orders after reload", orders);

console.log("\n🎉 Test run complete!");
