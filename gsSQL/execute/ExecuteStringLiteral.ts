function executeStringLiteral(node: SQLStringLiteral, context: Context): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLString(node.value)
    }
}