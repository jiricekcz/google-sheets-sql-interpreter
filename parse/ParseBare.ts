function parseBare(input: string, from: number, to: number): { node: SQLNumber | SQLIdentifier, nextIndex: number } {
    from = jumpWhitespace(input, from, to);
    const word = firstWord(input, from, to);
    if (!Number.isNaN(Number(word))) {
        return {
            node: {
                type: "number",
                value: Number(word)
            },
            nextIndex: from + word.length
        }
    } else {
        return {
            node: {
                type: "identifier",
                value: word
            },
            nextIndex: from + word.length
        }
    }
}

