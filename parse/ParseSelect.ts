function parseSelect(input: string, from: number, to: number): { node: SQLSelectFrom, nextIndex: number } {
    let i = jumpWhitespace(input, from + "SELECT".length, to);
    const modifiers = {
        distinct: false
    }
    if (startsWith(input, i, to, "DISTINCT")) {
        modifiers.distinct = true;
        i += "DISTINCT".length;
    }
    const selects: SQLNode[] = [];
    i = jumpWhitespace(input, i, to);
    if (!startsWith(input, i, to, "FROM")) do {
        const { node: select, nextIndex } = parseText(input, i, to);
        i = jumpWhitespace(input, nextIndex, to);
        selects.push(select);
        if (input[i] !== ",") break;
        i = jumpWhitespace(input, i + ",".length, to);
    } while (true);

    if (!startsWith(input, i, to, "FROM")) throw new ParseError(input, i, to, "Expected FROM as part of the SELECT ... FROM statement");

    i += "FROM".length;

    const froms: SQLNode[] = [];
    do {
        const { node: from, nextIndex } = parseText(input, i, to, false);
        i = jumpWhitespace(input, nextIndex, to);
        froms.push(from);
        if (input[i] !== ",") break;
        i = jumpWhitespace(input, i + ",".length, to);
    } while (true);

    return { node: { type: "selectFrom", select: selects, from: froms, ...modifiers }, nextIndex: i };
}