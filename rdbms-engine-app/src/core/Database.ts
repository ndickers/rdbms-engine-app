
import { Table } from "./Table.js";
import type { Column } from "./types.js";


export class Database {
    private tables = new Map<string, Table>();

    createTable(name: string, columns: Column[]) {
        if (this.tables.has(name)) {
            throw new Error(`Table ${name} already exists`);
        }
        this.tables.set(name, new Table(name, columns));
    }

    table(name: string): Table {
        const table = this.tables.get(name);
        if (!table) throw new Error(`Table ${name} not found`);
        return table;
    }

    listTables() {
        return [...this.tables.keys()];
    }
}
