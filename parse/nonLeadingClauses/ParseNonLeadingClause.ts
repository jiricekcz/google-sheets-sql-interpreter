function hasNonLeadingClause(input: string, from: number, to: number): boolean {
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to);

    return ["WHERE", "OR", "AND"].includes(word.toUpperCase()) || ["<=", ">=", "<>"].some(v => startsWith(input, from, to, v)) || ["=", "<", ">", "+", "-", "*", "/", "%"].some(v => startsWith(input, from, to, v));
}

function parseNonLeadingClause(input: string, from: number, to: number): NonLeadingClauseStep {
    const doParseNonLeadingClause = false;
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to).toLocaleUpperCase();

    switch (word) {
        case "WHERE": {
            return parseWhere(input, from, to, doParseNonLeadingClause);
        }
        case "OR":
        case "AND": {
            return parseLogical(input, from, to, word as "OR" | "AND", doParseNonLeadingClause);
        }
    }
    if (startsWith(input, from, to, "=") || startsWith(input, from, to, "<") || startsWith(input, from, to, ">")) {
        return parseComparator(input, from, to, input.substring(from, from + 1) as "=" | "<" | ">", doParseNonLeadingClause);
    }
    if (startsWith(input, from, to, "<=") || startsWith(input, from, to, "<>") || startsWith(input, from, to, ">=")) {
        return parseComparator(input, from, to, input.substring(from, from + 2) as "<=" | "<>" | ">=", doParseNonLeadingClause);
    }
    if (startsWith(input, from, to, "+") || startsWith(input, from, to, "-") || startsWith(input, from, to, "*") || startsWith(input, from, to, "/") || startsWith(input, from, to, "%")) {
        return parseArithmetic(input, from, to, input.substring(from, from + 1) as "+" | "-" | "*" | "/" | "%", doParseNonLeadingClause);
    }
    throw new ParseError(input, from, to, `Unexpected token as non-leading clause: ${word}`);
}