function parseString(input: string, from: number, to: number): { node: SQLStringLiteral, nextIndex: number } {
    let i = from;
    let result = "";
    const quote = input[i];
    if (quote !== "'" && quote !== '"') throw new StringIdentifyError(input, from, to);
    i++;
    while (i < to && input[i] !== quote) {
        if (input[i] === "\\") {
            i++;
            if (i >= to) throw new StringIdentifyError(input, from, to);
            result += input[i];
        } else {
            result += input[i];
        }
        i++;
    }
    if (input[i] !== quote) throw new ParseError(input, from, to, "Expected closing quote for string");
    return { node: { type: "stringLiteral", value: result }, nextIndex: i + 1 };

}