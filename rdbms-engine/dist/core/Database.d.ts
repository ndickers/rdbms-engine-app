import { Table } from "./Table.js";
import type { Column } from "./types.js";
export declare class Database {
    private tables;
    createTable(name: string, columns: Column[]): void;
    table(name: string): Table;
    listTables(): string[];
}
//# sourceMappingURL=Database.d.ts.map