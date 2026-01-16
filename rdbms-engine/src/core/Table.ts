import type { Column, Row, WhereClause } from "./types.js";

export class Table {
    name: string;
    columns: Column[];
    rows: Row[] = [];

    private primaryKey?: Column;
    private uniqueColumns: Column[] = [];

    // NEW: indexes
    private pkIndex = new Map<any, Row>();
    private uniqueIndexes: Map<string, Map<any, Row>> = new Map();

    constructor(name: string, columns: Column[]) {
        this.name = name;
        this.columns = columns;

      this.primaryKey = columns.find(c => c.primary);
      this.uniqueColumns = columns.filter(c => c.unique);

        // unique indexes
      this.uniqueColumns.forEach(c => {
          this.uniqueIndexes.set(c.name, new Map());
      });
  }

    insert(row: Row) {
        this.validateRow(row);
        this.rows.push(row);

      // Update indexes
      if (this.primaryKey) {
          this.pkIndex.set(row[this.primaryKey.name], row);
      }
      this.uniqueColumns.forEach(c => {
          this.uniqueIndexes.get(c.name)!.set(row[c.name], row);
      });
  }

    select(where?: WhereClause): Row[] {
        if (!where) return this.rows;

      // Use index if exists
      if (this.primaryKey && where.column === this.primaryKey.name) {
          const row = this.pkIndex.get(where.value);
          return row ? [row] : [];
      }

      if (this.uniqueIndexes.has(where.column)) {
          const row = this.uniqueIndexes.get(where.column)!.get(where.value);
          return row ? [row] : [];
      }

      // fallback scan
      return this.rows.filter(r => r[where.column] === where.value);
  }

    update(where: WhereClause, updates: Partial<Row>): number {
        let count = 0;
      const rowsToUpdate = this.select(where);
      for (const row of rowsToUpdate) {
          Object.assign(row, updates);

        // rebuild indexes
        if (this.primaryKey) {
            this.pkIndex.set(row[this.primaryKey.name], row);
        }
        this.uniqueColumns.forEach(c => {
            this.uniqueIndexes.get(c.name)!.set(row[c.name], row);
        });

        count++;
    }
      return count;
  }

    delete(where: WhereClause): number {
      const rowsToDelete = this.select(where);
      this.rows = this.rows.filter(r => !rowsToDelete.includes(r));

      // remove from indexes
      rowsToDelete.forEach(row => {
          if (this.primaryKey) {
              this.pkIndex.delete(row[this.primaryKey.name]);
          }
          this.uniqueColumns.forEach(c => {
              this.uniqueIndexes.get(c.name)!.delete(row[c.name]);
          });
      });

      return rowsToDelete.length;
  }

    private validateRow(row: Row) {
        for (const col of this.columns) {
            if (!(col.name in row)) {
                throw new Error(`Missing column ${col.name}`);
            }
            if (col.type === "INT" && typeof row[col.name] !== "number") {
                throw new Error(`Column ${col.name} must be INT`);
            }
            if (col.type === "TEXT" && typeof row[col.name] !== "string") {
                throw new Error(`Column ${col.name} must be TEXT`);
            }
        }

      if (this.primaryKey) {
          const pk = this.primaryKey.name;
        if (this.pkIndex.has(row[pk])) {
            throw new Error(`Duplicate primary key ${pk}`);
        }
    }

      for (const col of this.uniqueColumns) {
          if (this.uniqueIndexes.get(col.name)!.has(row[col.name])) {
              throw new Error(`Duplicate unique value for ${col.name}`);
          }
      }
  }
}
