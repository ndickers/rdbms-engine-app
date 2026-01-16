function executeTableSQL(db, cmd) {
    switch (cmd.type) {
        case "CREATE_TABLE":
            db.createTable(cmd.table, cmd.columns);
            return "Table created";
        case "INSERT": {
            const table = db.table(cmd.table);
            const row = {};
            table.columns.forEach((c, i) => {
                row[c.name] = cmd.values[i];
            });
            table.insert(row);
            return "Row inserted";
        }
        case "SELECT": {
            const table = db.table(cmd.table);
            let rows = table.select(cmd.where);
            if (cmd.join) {
                const joinTable = db.table(cmd.join.table);
                const result = [];
                for (const row of rows) {
                    const matching = joinTable.select({
                        column: cmd.join.column2,
                        value: row[cmd.join.column1],
                    });
                    for (const r of matching) {
                        result.push({ ...row, ...r });
                    }
                }
                return result;
            }
            return rows;
        }
        case "UPDATE":
            return db.table(cmd.table).update(cmd.where, cmd.updates);
        case "DELETE":
            return db.table(cmd.table).delete(cmd.where);
        default:
            throw new Error(`Unsupported table command: ${cmd.type}`);
    }
}
export function executeSQL(manager, cmd) {
    switch (cmd.type) {
        case "CREATE_DATABASE":
            return manager.createDatabase(cmd.name);
        case "USE_DATABASE":
            return manager.useDatabase(cmd.name);
        case "DROP_DATABASE":
            return manager.dropDatabase(cmd.name);
        default:
            const db = manager.getDB();
            return executeTableSQL(db, cmd);
    }
}
//# sourceMappingURL=executor.js.map