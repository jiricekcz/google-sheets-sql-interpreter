function SQLInterpret(query: string): any {
    const parsed = parse(query);
    const executed = run(parsed).map(v => v.toString());
    return executed[0];
}


