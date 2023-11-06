function parseWhere(input: string, from: number, to: number, firstNode: SQLNode): { node: SQLWhere, nextIndex: number } {
    from = jumpWhitespace(input, from + "WHERE".length, to);
    const { node: where, nextIndex } = parseText(input, from, to);

    return { node: { type: "where", condition: where, operand: firstNode }, nextIndex };
}