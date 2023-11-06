function parse(input: string): SQLNode {
    let i = 0;
    let to = input.length;
    let nodes: SQLNode[] = [];
    do {
        const v = parseText(input, i, to);
        nodes.push(v.node);
        i = jumpWhitespace(input, v.nextIndex, to);
    } while (input[i] === ";");
    if (i < to) throw new ParseError(input, i, Math.min(to, i + 15), "Unexpected token");
    return nodes[0];
}



function parseText(input: string, from: number, to: number, doParseNonLeadingClause = true): { node: SQLNode, nextIndex: number } {
    if (from >= to) return { node: { type: "noExpression" }, nextIndex: from };
    from = jumpWhitespace(input, from, to);

    let node: SQLNode;
    if (startsWith(input, from, to, "(")) {
        from = jumpWhitespace(input, from + 1, to);
        const endBracket = findEndBracket(input, from, to);
        const value = parseText(input, from, endBracket);

        if (jumpWhitespace(input, value.nextIndex, to) < endBracket) throw new ParseError(input, value.nextIndex, endBracket, "Unexpected token");
        return {
            node: value.node,
            nextIndex: endBracket + 1
        }
    }
    if (startsWith(input, from, to, "*")) {
        node = { type: "all" };
        from = from + 1;
    } else if (startsWith(input, from, to, ["'", '"'])) {
        let v = parseString(input, from, to);
        node = v.node;
        from = v.nextIndex;
    } else if (startsWith(input, from, to, "`")) {
        let v = parseIdentifier(input, from, to);
        node = v.node;
        from = v.nextIndex;
    } else switch (firstWord(input, from, to).toUpperCase()) {
        case "TRUE":
            node = { type: "boolean", value: true };
            from = from + "TRUE".length;
            break;
        case "FALSE":
            node = { type: "boolean", value: false };
            from = from + "FALSE".length;
            break;
        case "NULL":
            node = { type: "null" };
            from = from + "NULL".length;
            break;
        case "SELECT": {
            const value = parseSelect(input, from, to);
            node = value.node;
            from = value.nextIndex;
        } break;
        default: {
            const value = parseBare(input, from, to);
            node = value.node;
            from = value.nextIndex;
        } break;
    }
    from = jumpWhitespace(input, from, to);

    if (doParseNonLeadingClause) while (hasNonLeadingClause(input, from, to)) {
        const value = parseNonLeadingClause(input, from, to, node);
        node = value.node;
        from = value.nextIndex;
        from = jumpWhitespace(input, from, to);
    }

    return { node, nextIndex: from };
}

function startsWith(input: string, from: number, to: number, start: string | string[]): boolean {
    if (typeof start === "string") {
        return input.substring(from, to).startsWith(start);
    } else {
        return start.some(s => input.substring(from, to).startsWith(s));
    }
}

function firstWord(input: string, from: number, to: number): string {
    let i = from;
    while (i < to && !isWhitespace(input[i])) {
        i++;
    }
    return input.substring(from, i);
}

function isWhitespace(char: string): boolean {
    return char === " " || char === "\n" || char === "\t";
}
function jumpWhitespace(input: string, from: number, to: number): number {
    let i = from;
    while (i < to && isWhitespace(input[i])) {
        i++;
    }
    return i;
}

function findEndBracket(input: string, from: number, to: number): number {
    let i = from;
    let depth = 1;
    while (i < to) {
        if (input[i] === "(") depth++;
        if (input[i] === ")") depth--;
        if (depth === 0) return i;
        i++;
    }
    throw new ParseError(input, from, to, "Expected closing bracket to opening bracket at " + input.substring(from - 3, from + 4));
}