function executeWhere(node: SQLWhere, context: Context): ExecutionResult {
    const operand = executeStatement(node.operand, context).result;
    if (!(operand instanceof SQLTable)) throw new RuntimeError("WHERE clause must be applied to a table");
    const rows: SQLRow[] = [];

    for (const row of operand.rows) {
        if (executeWhereOnRow(row, node.condition, operand.name).value) {
            rows.push(row);
        }
    }


    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLTable(rows, operand.name)
    }
}

function createContext(row: SQLRow, tableName: string): Context {
    const context = new Map<string, SQLResult>();
    for (const [name, value] of row.row) {
        context.set(name, value);
        if (!name.includes(".")) {
            context.set(`${tableName}.${name}`, value);
        }
    }

    return context;
}


function executeWhereOnRow(row: SQLRow, condition: SQLNode, tableName: string): SQLBoolean {
    const newContext = createContext(row, tableName);
    const result = executeStatement(condition, newContext).result;
    if (result instanceof SQLBoolean) {
        return result;
    }
    throw new RuntimeError(`WHERE clause must evaluate to a boolean, but got ${result.constructor.name}`);
}