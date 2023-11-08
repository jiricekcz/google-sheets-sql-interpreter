function executeSubtracion(node: SQLSubtraction): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: subtract(node.left, node.right)
    }
}

function subtract(left: SQLNode, right: SQLNode): SQLPrimitive {
    const leftValue = executeStatement(left).result;
    const rightValue = executeStatement(right).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value - rightValue.value);
    }

    throw new RuntimeError(`Subtraction not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}