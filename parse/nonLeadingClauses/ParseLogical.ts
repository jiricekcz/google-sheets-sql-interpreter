function parseLogical(input: string, from: number, to: number, firstNode: SQLNode, operator: "AND" | "OR"): {node: SQLAND | SQLOR, nextIndex: number} {
    from = jumpWhitespace(input, from + operator.length, to);
    const { node: right, nextIndex } = parseText(input, from, to);

    return { node: { type: operator.toLowerCase() as "or" | "and", left: firstNode, right }, nextIndex };
}