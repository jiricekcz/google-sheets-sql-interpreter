function executeNumberLiteral(node: SQLNumberLiteral): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLNumber(node.value)
    }
}