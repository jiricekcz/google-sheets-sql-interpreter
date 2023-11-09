function executeAll(node: SQLAll, context: Context): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLAllSelector()
    }
}