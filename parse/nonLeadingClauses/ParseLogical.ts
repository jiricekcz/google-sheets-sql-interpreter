function parseLogical(input: string, from: number, to: number, operator: "AND" | "OR", doParseNonLeadingClause = true): {node: SQLNode, nextIndex: number, clause: "AND" | "OR"} {
    from = jumpWhitespace(input, from + operator.length, to);
    const { node, nextIndex } = parseText(input, from, to, doParseNonLeadingClause);

    return { node, nextIndex, clause: operator };
}