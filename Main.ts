function SQLInterpret(query: string): SheetsArgument {
    const result = parse(query);
    return JSON.stringify(result, null, 4);
}


