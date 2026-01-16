import { Table } from "./Table.js";
export class Database {
    tables = new Map();
    createTable(name, columns) {
        if (this.tables.has(name)) {
            throw new Error(`Table ${name} already exists`);
        }
        this.tables.set(name, new Table(name, columns));
    }
    table(name) {
        const table = this.tables.get(name);
        if (!table)
            throw new Error(`Table ${name} not found`);
        return table;
    }
    listTables() {
        return [...this.tables.keys()];
    }
}
//# sourceMappingURL=Database.js.map