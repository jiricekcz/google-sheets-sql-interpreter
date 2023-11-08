function executeMultiplication(node: SQLMultiplication): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: multiply(node.left, node.right)
    }
}

function multiply(left: SQLNode, right: SQLNode): SQLPrimitive {
    const leftValue = executeStatement(left).result;
    const rightValue = executeStatement(right).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value * rightValue.value);
    }

    throw new RuntimeError(`Multiplication not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}