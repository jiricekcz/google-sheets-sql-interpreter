function executeSubtracion(node: SQLSubtraction, context: Context): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: subtract(node.left, node.right, context)
    }
}

function subtract(left: SQLNode, right: SQLNode, context: Context): SQLPrimitive {
    const leftValue = executeStatement(left, context).result;
    const rightValue = executeStatement(right, context).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value - rightValue.value);
    }

    throw new RuntimeError(`Subtraction not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}