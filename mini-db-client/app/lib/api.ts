import { SQLResponse } from "../types/sql";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}` || "http://localhost:4000";

export async function runSQL(sql: string): Promise<SQLResponse> {
    const res = await fetch(`${API_BASE_URL}/sql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            error: data?.error || "Unknown server error",
        };
    }

    return data as SQLResponse;
}

export async function getDatabases(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/databases`);

    if (!res.ok) {
        throw new Error("Failed to fetch databases");
    }

    const data = await res.json();
    return data.databases as string[];
}
