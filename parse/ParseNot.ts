function parseNot(input: string, from: number, to: number): { node: SQLNot, nextIndex: number } {
    let i = from;
    i = jumpWhitespace(input, i + "NOT".length, to);
    const { node: operand, nextIndex } = parseText(input, i, to, true);
    i = nextIndex;
    return {
        nextIndex: i,
        node: {
            type: "not",
            operand
        }
    }
}