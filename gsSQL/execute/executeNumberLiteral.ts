function executeNumberLiteral(node: SQLNumberLiteral, context: Context): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLNumber(node.value)
    }
}