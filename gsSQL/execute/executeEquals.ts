function executeEquals(node: SQLEquals, context: Context): ExecutionResult {

    return {
        context: {
            tables: {},
            aliases: {}
        },
        result: equals(node.left, node.right, context)
    }
}

function equals(left: SQLNode, right: SQLNode, context: Context): SQLPrimitive {
    const leftValue = executeStatement(left, context).result;
    const rightValue = executeStatement(right, context).result;

    if (leftValue instanceof SQLNumber && rightValue instanceof SQLNumber) {
        return new SQLBoolean(leftValue.value === rightValue.value);
    }
    if (leftValue instanceof SQLString && rightValue instanceof SQLString) {
        return new SQLBoolean(leftValue.value === rightValue.value);
    }
    if (leftValue instanceof SQLBoolean && rightValue instanceof SQLBoolean) {
        return new SQLBoolean(leftValue.value === rightValue.value);
    }

    throw new RuntimeError(`Addition not defined for ${leftValue.constructor.name} and ${rightValue.constructor.name}`);
}