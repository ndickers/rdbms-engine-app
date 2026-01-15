import { FileStore } from "../persistence/fileStore.js";
import { Database } from "./Database.js";

export class DatabaseManager {
    private databases: Record<string, Database> = {};
    private activeDb: Database | null = null;


    createDatabase(name: string) {
        if (this.databases[name]) throw new Error(`Database ${name} already exists`);
        this.databases[name] = new Database();
        this.activeDb = this.databases[name];
        return `Database ${name} created and selected`;
    }


    useDatabase(name: string) {
        if (!this.databases[name]) throw new Error(`Database ${name} does not exist`);
        this.activeDb = this.databases[name];
        return `Using database ${name}`;
    }

    dropDatabase(name: string) {
        if (!this.databases[name]) throw new Error(`Database ${name} does not exist`);
        const isActive = this.activeDb === this.databases[name];
        delete this.databases[name];

        if (isActive) this.activeDb = null;
        FileStore.deleteDatabase(name);

        return `Database ${name} dropped`;
    }





    getDB(): Database {
        if (!this.activeDb) throw new Error("No database selected");
        return this.activeDb;
    }

    listDatabases(): string[] {
        return Object.keys(this.databases);
    }
}
