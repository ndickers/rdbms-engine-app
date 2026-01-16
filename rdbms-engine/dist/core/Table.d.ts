import type { Column, Row, WhereClause } from "./types.js";
export declare class Table {
    name: string;
    columns: Column[];
    rows: Row[];
    private primaryKey?;
    private uniqueColumns;
    private pkIndex;
    private uniqueIndexes;
    constructor(name: string, columns: Column[]);
    insert(row: Row): void;
    select(where?: WhereClause): Row[];
    update(where: WhereClause, updates: Partial<Row>): number;
    delete(where: WhereClause): number;
    private validateRow;
}
//# sourceMappingURL=Table.d.ts.map