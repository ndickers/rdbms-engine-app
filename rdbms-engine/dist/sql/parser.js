export function parseSQL(input) {
    const sql = input.trim().replace(/;$/, "");
    const tokens = sql.split(/\s+/);
    if (/^CREATE DATABASE/i.test(sql)) {
        const dbName = sql.match(/^CREATE DATABASE (\w+)/i)[1];
        return { type: "CREATE_DATABASE", name: dbName };
    }
    if (/^USE/i.test(sql)) {
        const dbName = sql.match(/^USE (\w+)/i)[1];
        return { type: "USE_DATABASE", name: dbName };
    }
    if (/^DROP DATABASE/i.test(sql)) {
        const dbName = sql.match(/^DROP DATABASE (\w+)/i)[1];
        return { type: "DROP_DATABASE", name: dbName };
    }
    const command = tokens[0].toUpperCase();
    switch (command) {
        case "CREATE":
            return parseCreate(sql);
        case "INSERT":
            return parseInsert(sql);
        case "SELECT":
            return parseSelect(sql);
        case "UPDATE":
            return parseUpdate(sql);
        case "DELETE":
            return parseDelete(sql);
        default:
            throw new Error("Unsupported SQL command");
    }
}
function parseCreate(sql) {
    const match = sql.match(/CREATE TABLE (\w+)\s*\((.+)\)/i);
    if (!match)
        throw new Error("Invalid CREATE TABLE syntax");
    const [, table, cols] = match;
    const columns = cols.split(",").map(raw => {
        const parts = raw.trim().split(/\s+/);
        return {
            name: parts[0],
            type: parts[1].toUpperCase(),
            primary: parts.includes("PRIMARY"),
            unique: parts.includes("UNIQUE"),
        };
    });
    return { type: "CREATE_TABLE", table, columns };
}
function parseInsert(sql) {
    const match = sql.match(/INSERT INTO (\w+) VALUES\s*\((.+)\)/i);
    if (!match)
        throw new Error("Invalid INSERT syntax");
    const [, table, valuesRaw] = match;
    const values = valuesRaw.split(",").map(v => JSON.parse(v.trim()));
    return { type: "INSERT", table, values };
}
function parseSelect(sql) {
    const tableMatch = sql.match(/FROM (\w+)/i);
    if (!tableMatch)
        throw new Error("Invalid SELECT syntax");
    const table = tableMatch[1];
    const joinMatch = sql.match(/JOIN (\w+) ON (\w+)\.(\w+) = (\w+)\.(\w+)/i);
    const whereMatch = sql.match(/WHERE (\w+)(?:\.(\w+))?\s*=\s*(.+)$/i);
    let where;
    if (whereMatch) {
        const col = whereMatch[2] || whereMatch[1];
        where = { column: col, value: JSON.parse(whereMatch[3]) };
    }
    let join;
    if (joinMatch) {
        join = {
            table: joinMatch[1],
            column1: joinMatch[3],
            column2: joinMatch[5],
        };
    }
    const selectCmd = {
        type: "SELECT",
        table,
        where,
        join,
    };
    return selectCmd;
}
function parseUpdate(sql) {
    const match = sql.match(/UPDATE (\w+) SET (\w+)\s*=\s*(.+) WHERE (\w+)\s*=\s*(.+)/i);
    if (!match)
        throw new Error("Invalid UPDATE syntax");
    const [, table, col, val, whereCol, whereVal] = match;
    return {
        type: "UPDATE",
        table,
        updates: { [col]: JSON.parse(val) },
        where: { column: whereCol, value: JSON.parse(whereVal) },
    };
}
function parseDelete(sql) {
    const match = sql.match(/DELETE FROM (\w+) WHERE (\w+)\s*=\s*(.+)/i);
    if (!match)
        throw new Error("Invalid DELETE syntax");
    const [, table, col, val] = match;
    return {
        type: "DELETE",
        table,
        where: { column: col, value: JSON.parse(val) },
    };
}
//# sourceMappingURL=parser.js.map