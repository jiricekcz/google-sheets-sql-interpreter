function executeMultiplication(node: SQLMultiplication, context: Context): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: multiply(node.left, node.right, context)
    }
}

function multiply(left: SQLNode, right: SQLNode, context: Context): SQLPrimitive {
    const leftValue = executeStatement(left, context).result;
    const rightValue = executeStatement(right, context).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value * rightValue.value);
    }

    throw new RuntimeError(`Multiplication not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}