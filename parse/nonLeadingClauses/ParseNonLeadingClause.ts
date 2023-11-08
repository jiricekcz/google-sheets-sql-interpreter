function hasNonLeadingClause(input: string, from: number, to: number): boolean {
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to);

    return ["WHERE", "OR", "AND", "=", "!=", "<", ">", "<=", ">="].includes(word.toUpperCase());
}

function parseNonLeadingClause(input: string, from: number, to: number, doParseNonLeadingClause = true): NonLeadingClauseStep {
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
        case "=":
        case "!=":
        case "<":
        case ">":
        case "<=":
        case ">=":{
            return parseComparator(input, from, to, word as "=" | "!=" | "<" | ">" | "<=" | ">=", doParseNonLeadingClause);
        }
        default: {
            throw new ParseError(input, from, to, "Unexpected token");
        }
    }
}