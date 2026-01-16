import type { Column, Row, WhereClause } from "../core/types.js";


export type SQLCommand =
    | CreateTableCommand
    | InsertCommand
    | SelectCommand
    | UpdateCommand
    | DeleteCommand
    | CreateDatabaseCommand
    | UseDatabaseCommand
    | DropDatabaseCommand
export interface CreateTableCommand {
    type: "CREATE_TABLE";
    table: string;
    columns: Column[];
}

export interface InsertCommand {
    type: "INSERT";
    table: string;
    values: any[];
}

export interface SelectCommand {
    type: "SELECT";
    table: string;
    where?: WhereClause;
    join?: { table: string; column1: string; column2: string };
}



export interface UpdateCommand {
    type: "UPDATE";
    table: string;
    updates: Partial<Row>;
    where: WhereClause;
}

export interface DeleteCommand {
    type: "DELETE";
    table: string;
    where: WhereClause;
}

export interface CreateDatabaseCommand {
    type: "CREATE_DATABASE";
    name: string;
}

export interface UseDatabaseCommand {
    type: "USE_DATABASE";
    name: string;
}

export interface DropDatabaseCommand {
    type: "DROP_DATABASE";
    name: string;
}