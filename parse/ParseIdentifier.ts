function parseIdentifier(input: string, from: number, to: number): { node: SQLIdentifier, nextIndex: number } {
    let i = from;
    let result = "";
    i++;
    while (i < to && input[i] !== "`") {
        result += input[i];
        i++;
    }
    if (input[i] !== "`") throw new ParseError(input, from, to, "Expected closing quote for string");
    return { node: { type: "identifier", value: result }, nextIndex: i + 1 };

}