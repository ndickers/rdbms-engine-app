import fs from "fs";
import path from "path";
import type { DatabaseManager } from "../core/DatabaseManager.js";
import type { Column } from "../core/types.js";

const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

export class FileStore {
    static saveAllDatabases(manager: DatabaseManager) {
        for (const dbName of manager.listDatabases()) {
            manager.useDatabase(dbName);
            const db = manager.getDB();
            const dbDir = path.join(DATA_DIR, dbName);
            if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

            for (const tableName of db.listTables()) {
                const table = db.table(tableName);
                const filePath = path.join(dbDir, `${tableName}.json`);

                const data = {
                    columns: table.columns,
                    rows: table.rows,
                };

                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
            }
        }
    }

    static deleteDatabase(dbName: string) {
        const files = fs.readdirSync(DATA_DIR);
        for (const file of files) {
            if (file.startsWith(`${dbName}_`)) {
                fs.unlinkSync(path.join(DATA_DIR, file));
            }
        }
    }


    static loadAllDatabases(manager: DatabaseManager) {
        if (!fs.existsSync(DATA_DIR)) return;

        const dbNames = fs.readdirSync(DATA_DIR).filter(name => {
            const dbPath = path.join(DATA_DIR, name);
            return fs.statSync(dbPath).isDirectory();
        });

        for (const dbName of dbNames) {
            if (!manager.listDatabases().includes(dbName)) {
                manager.createDatabase(dbName);
            }
            manager.useDatabase(dbName);
            const db = manager.getDB();

            const dbDir = path.join(DATA_DIR, dbName);
            if (!fs.existsSync(dbDir)) continue;

            const files = fs.readdirSync(dbDir).filter(f => f.endsWith(".json"));

            for (const file of files) {
                const tableName = file.replace(".json", "");
                const filePath = path.join(dbDir, file);
                const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

                const columns: Column[] = fileData.columns;
                const rows = fileData.rows;

                if (!db.listTables().includes(tableName)) {
                    db.createTable(tableName, columns);
                }

                const table = db.table(tableName);
                rows.forEach((r: any) => table.insert(r));
            }
        }
    }
}
