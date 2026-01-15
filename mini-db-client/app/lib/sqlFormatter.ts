export function formatSQL(sql: string) {
    let singleLine = sql.replace(/\n/g, " ");

    singleLine = singleLine.replace(/\s+/g, " ");

    return singleLine.trim();
}
