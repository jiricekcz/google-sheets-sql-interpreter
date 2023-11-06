function hasNonLeadingClause(input: string, from: number, to: number): boolean {
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to);

    return ["WHERE", "OR", "AND"].includes(word.toUpperCase());
}

function parseNonLeadingClause(input: string, from: number, to: number, firstNode: SQLNode): ParsedStep {
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to);

    switch (word.toUpperCase()) {
        case "WHERE": {
            const { node, nextIndex } = parseWhere(input, from, to, firstNode);
            return { node, nextIndex };
        }
        case "OR":
        case "AND": {
            const { node, nextIndex } = parseLogical(input, from, to, firstNode, word as "OR" | "AND");
            return { node, nextIndex };
        }
        default: {
            throw new ParseError(input, from, to, "Unexpected token");
        }
    }
}