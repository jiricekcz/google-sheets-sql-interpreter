function executeAddition(node: SQLAddition): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: add(node.left, node.right)
    }
}

function add(left: SQLNode, right: SQLNode): SQLPrimitive {
    const leftValue = executeStatement(left).result;
    const rightValue = executeStatement(right).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLNumber(leftValue.value + rightValue.value);
    }
    if (leftValue instanceof SQLString && rightValue instanceof SQLString) {
        return new SQLString(leftValue.value + rightValue.value);
    }

    throw new RuntimeError(`Addition not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}