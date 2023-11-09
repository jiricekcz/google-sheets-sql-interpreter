function executeAddition(node: SQLAddition, context: Context): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: add(node.left, node.right, context)
    }
}

function add(left: SQLNode, right: SQLNode, context: Context): SQLPrimitive {
    const leftValue = executeStatement(left, context).result;
    const rightValue = executeStatement(right, context).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value + rightValue.value);
    }
    if (leftValue instanceof SQLString && rightValue instanceof SQLString) {
        return new SQLString(leftValue.value + rightValue.value);
    }

    throw new RuntimeError(`Addition not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}