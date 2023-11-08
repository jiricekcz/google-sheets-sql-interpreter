function parseComparator(input: string, from: number, to: number, operator: "=" | "<>" | "<" | ">" | "<=" | ">=", doParseNonLeadingClause = true): {node: SQLNode, nextIndex: number, clause: "=" | "<>" | "<" | ">" | "<=" | ">="} {
    from = jumpWhitespace(input, from + operator.length, to);
    const { node, nextIndex } = parseText(input, from, to, doParseNonLeadingClause);

    return { node, nextIndex, clause: operator };
}