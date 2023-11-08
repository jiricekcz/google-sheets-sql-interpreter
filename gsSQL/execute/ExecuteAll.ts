function executeAll(node: SQLAll): ExecutionResult {
    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: new SQLAllSelector()
    }
}