import readline from "readline";
import { DatabaseManager } from "../core/DatabaseManager.js";
import { parseSQL } from "../sql/parser.js";
import { executeSQL } from "../sql/executor.js";
import { FileStore } from "../persistence/fileStore.js";
const manager = new DatabaseManager();
FileStore.loadAllDatabases(manager);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "db> ",
});
console.log("Welcome to Multi-DB MiniDB REPL!");
console.log("Type your SQL commands. Type 'exit' to quit.\n");
rl.prompt();
rl.on("line", (line) => {
    const input = line.trim();
    if (input.toLowerCase() === "exit") {
        FileStore.saveAllDatabases(manager);
        rl.close();
        return;
    }
    if (!input) {
        rl.prompt();
        return;
    }
    try {
        const cmd = parseSQL(input);
        const result = executeSQL(manager, cmd);
        console.log(result);
    }
    catch (err) {
        console.error("Error:", err.message);
    }
    rl.prompt();
}).on("close", () => {
    console.log("\nDatabases saved. Bye!");
    process.exit(0);
});
//# sourceMappingURL=repl.js.map