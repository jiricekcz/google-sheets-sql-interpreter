function run(statements: SQLNode[]): SQLResult[] {
    return statements.map((v) => executeStatement(v, new Map())).map(v => v.result);
}


function executeStatement(statement: SQLNode, context: Context): ExecutionResult {
    switch (statement.type) {
        case "addition": return executeAddition(statement, context);
        case "subtraction": return executeSubtracion(statement, context);
        case "multiplication": return executeMultiplication(statement, context);
        case "numberLiteral": return executeNumberLiteral(statement, context);
        case "equals": return executeEquals(statement, context);
        case "selectFrom": return executeSelectFrom(statement, context);
        case "identifier": return executeIdentifier(statement, context);
        case "all": return executeAll(statement, context);
        case "where": return executeWhere(statement, context);
        default: throw new RuntimeError(`Unknown statement type ${statement.type}`);
    }
}

interface ExecutionResult {
    result: SQLResult;
    context: ExecutionContext;
}

interface ExecutionContext {
    tables: {
        [name: string]: SQLTable;
    }
    aliases: {
        [name: string]: string;
    }
}