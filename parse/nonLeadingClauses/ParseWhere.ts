function parseWhere(input: string, from: number, to: number, doParseNonLeadingClause = true): { node: SQLNode, nextIndex: number, clause: "WHERE" } {
    from = jumpWhitespace(input, from + "WHERE".length, to);
    const { node: where, nextIndex } = parseText(input, from, to, doParseNonLeadingClause);

    return { node: where, clause: "WHERE", nextIndex };
}