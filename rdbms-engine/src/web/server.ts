import express from "express";
import bodyParser from "body-parser";
import { DatabaseManager } from "../core/DatabaseManager.js";
import { parseSQL } from "../sql/parser.js";
import { executeSQL } from "../sql/executor.js";
import { FileStore } from "../persistence/fileStore.js";
import cors from "cors";

const app = express();
const manager = new DatabaseManager();

FileStore.loadAllDatabases(manager);

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());


app.post("/sql", (req, res) => {
    try {
        const { sql } = req.body;
        const cmd = parseSQL(sql);
        const result = executeSQL(manager, cmd);


        if (["CREATE_DATABASE", "USE_DATABASE", "CREATE_TABLE", "INSERT", "UPDATE", "DELETE"].includes(cmd.type)) {
            FileStore.saveAllDatabases(manager);
        }

        res.json({ success: true, result });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
});

app.get("/databases", (req, res) => {
    res.json({ databases: manager.listDatabases() });
});


const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 MiniDB Web API running at http://localhost:${PORT}`));
