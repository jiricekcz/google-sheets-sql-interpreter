function run(statements: SQLNode[]): SQLResult[] {
    return statements.map(executeStatement).map(v => v.result);
}


function executeStatement(statement: SQLNode): ExecutionResult {
    switch (statement.type) {
        case "addition": return executeAddition(statement);
        case "subtraction": return executeSubtracion(statement);
        case "multiplication": return executeMultiplication(statement);
        case "numberLiteral": return executeNumberLiteral(statement);
        case "equals": return executeEquals(statement);
        case "selectFrom": return executeSelectFrom(statement);
        case "identifier": return executeIdentifier(statement);
        case "all": return executeAll(statement);
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