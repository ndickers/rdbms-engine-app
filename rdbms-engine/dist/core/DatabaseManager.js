import { FileStore } from "../persistence/fileStore.js";
import { Database } from "./Database.js";
export class DatabaseManager {
    databases = {};
    activeDb = null;
    createDatabase(name) {
        if (this.databases[name])
            throw new Error(`Database ${name} already exists`);
        this.databases[name] = new Database();
        this.activeDb = this.databases[name];
        return `Database ${name} created and selected`;
    }
    useDatabase(name) {
        if (!this.databases[name])
            throw new Error(`Database ${name} does not exist`);
        this.activeDb = this.databases[name];
        return `Using database ${name}`;
    }
    dropDatabase(name) {
        if (!this.databases[name])
            throw new Error(`Database ${name} does not exist`);
        const isActive = this.activeDb === this.databases[name];
        delete this.databases[name];
        if (isActive)
            this.activeDb = null;
        FileStore.deleteDatabase(name);
        return `Database ${name} dropped`;
    }
    getDB() {
        if (!this.activeDb)
            throw new Error("No database selected");
        return this.activeDb;
    }
    listDatabases() {
        return Object.keys(this.databases);
    }
}
//# sourceMappingURL=DatabaseManager.js.map