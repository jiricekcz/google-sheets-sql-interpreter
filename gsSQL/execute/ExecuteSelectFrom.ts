function executeSelectFrom(node: SQLSelectFrom, context: Context): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: selectFrom(node, context)
    }
}
function selectFrom(node: SQLSelectFrom, context: Context): SQLTable {
    if (node.distinct) throw new RuntimeError('DISTINCT not implemented');
    const tables = node.from.map(from => executeStatement(from, context).result).map(table => {
        if (table instanceof SQLTable) return table;
        if (table instanceof SQLIdentifierValue) throw new RuntimeError(`Cannot find table ${table.name}`);
        throw new RuntimeError(`Cannot SELECT FROM a ${table.constructor.name}`);
    })
    const table = tables.length == 1 ? tables[0]: mergeTables(tables);

    const fields = node.select.map(select => executeStatement(select, context).result).map(field => {
        if (field instanceof SQLIdentifierValue) return field;
        throw new RuntimeError(`Cannot SELECT a ${field.constructor.name}, only identifiers`);
    });

    if (fields.some(field => field instanceof SQLAllSelector)) {
        return filterTable(table);
    }

    return getOnlyKeys(table, fields.map(field => field.name));

}
function getOnlyKeys(table: SQLTable, keys: string[]): SQLTable {
    const values: Map<string, SQLPrimitive>[] = [];
    for (const row of table.rows) {
        const value: Map<string, SQLPrimitive> = new Map();
        for (const key of keys) {
            if (row.row.has(key)) {
                value.set(key, row.row.get(key)!);
            } else {
                throw new RuntimeError(`Table ${table.name} does not have column ${key}`);
            }
        }
        values.push(value);
    }
    return new SQLTable(values.map(v => new SQLRow(v)), table.name);
}

function mergeTables(tables: SQLTable[]): SQLTable {
    if (tables.length === 0) {
        throw new RuntimeError('Attempted to merge 0 tables');
    }
    return new SQLTable([...rowsOfMergedTables(tables)], tables[0].name);
}
function* rowsOfMergedTables(tables: SQLTable[]): Iterable<SQLRow> {
    if (tables.length === 0) {
        return;
    }
    if (tables.length === 1) {
        yield* prefixRows(tables[0].rows, tables[0].name);
        return;
    }
    const [first, ...rest] = tables;
    for (const row1 of first.rows) {
        for (const row2 of rowsOfMergedTables(rest)) {
            yield mergeRows(row1, row2, `${first.name}, ${rest.map(table => table.name).join(', ')}`);
        }
    }
}
function* prefixRows(rows: Iterable<SQLRow>, prefix: string): Iterable<SQLRow> {
    for (const row of rows) {
        const values: Map<string, SQLPrimitive> = new Map();
        for (const [key, value] of row) {
            const alias = `${prefix}.${key}`;
            values.set(alias, value);
            values.set(key, value);
        }
        yield new SQLRow(values);
    } 
}
function mergeRows(row1: SQLRow, row2: SQLRow, row1Prefix: string): SQLRow {
    const values: Map<string, SQLPrimitive> = new Map();
    for (const [key, value] of row2) {
        values.set(key, value);
    }

    for (const [key, value] of row1) {
        const alias = `${row1Prefix}.${key}`;
        values.set(alias, value);
        if (values.has(key)) {
            values.delete(key);
        } else {
            values.set(key, value);
        }
    }
    return new SQLRow(values);
}

function filterTable(table: SQLTable): SQLTable {
    const nonSpecifiedKeys = [...[...table.rows][0].row.keys()].filter(key => !key.includes('.'));

    const keyToInclude = [...[...table.rows][0].row.keys()].filter(key => !(!nonSpecifiedKeys.includes(key) && nonSpecifiedKeys.some(v => key.includes(v))));

    return getOnlyKeys(table, keyToInclude);
}