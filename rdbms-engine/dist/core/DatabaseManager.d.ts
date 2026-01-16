import { Database } from "./Database.js";
export declare class DatabaseManager {
    private databases;
    private activeDb;
    createDatabase(name: string): string;
    useDatabase(name: string): string;
    dropDatabase(name: string): string;
    getDB(): Database;
    listDatabases(): string[];
}
//# sourceMappingURL=DatabaseManager.d.ts.map