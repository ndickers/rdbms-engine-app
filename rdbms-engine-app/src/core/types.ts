export type ColumnType = "INT" | "TEXT";

export interface Column {
    name: string;
    type: ColumnType;
    primary?: boolean;
    unique?: boolean;
}

export type Row = Record<string, any>;

export interface WhereClause {
    column: string;
    value: any;
}
