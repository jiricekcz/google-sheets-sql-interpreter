function SQLInterpret(query: string): any {
    const parsed = parse(query);
    const executed = run(parsed);
    return executed[0].toTable();
}


