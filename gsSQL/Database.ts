function getTableNames(): string[] {
    return SpreadsheetApp.getActiveSpreadsheet().getSheets().map(sheet => sheet.getName());
}

function *getTableRows(name: string): Iterable<SQLRow> {
    const table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    if (!table) throw new DatabaseError(`Table ${name} does not exist`);
    const values = table.getDataRange().getValues();
    const header = values[0];
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        const rowMap = new Map<string, SQLPrimitive>();
        for (let j = 0; j < header.length; j++) {
            const key = header[j];
            const value = row[j];
            if (value === null) rowMap.set(key, new SQLNull());
            else if (typeof value === "boolean") rowMap.set(key, new SQLBoolean(value));
            else if (typeof value === "number") rowMap.set(key, new SQLNumber(value));
            else if (typeof value === "string") rowMap.set(key, new SQLString(value));
            else throw new DatabaseError(`Unknown value type ${typeof value} of ${value} in table ${name} at ${i + 1}, ${j + 1}`);
        }
        yield new SQLRow(rowMap);
    }
}