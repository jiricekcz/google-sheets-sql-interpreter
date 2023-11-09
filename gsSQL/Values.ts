abstract class SQLValue {
    abstract toString(): string;
    abstract toTable(): Cell[][] | Cell;
}

abstract class SQLPrimitiveBase<T extends string | number | null | boolean> extends SQLValue {
    abstract valueOf(): T;
    abstract toString(): string;
}

class SQLNumber extends SQLPrimitiveBase<number> {
    constructor(public value: number) {
        super();
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value.toString();
    }
    toTable(): Cell {
        return this.value;

    }
}

class SQLString extends SQLPrimitiveBase<string> {
    constructor(public value: string) {
        super();
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value;
    }
    toTable(): Cell {
        return this.value;
    }
}

class SQLNull extends SQLPrimitiveBase<null> {
    valueOf() {
        return null;
    }
    toString() {
        return "NULL";
    }
    toTable(): Cell {
        return null;
    }
}

class SQLBoolean extends SQLPrimitiveBase<boolean> {
    constructor(public value: boolean) {
        super();
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value.toString();
    }
    toTable(): Cell {
        return this.value;
    }
}

type SQLPrimitive = SQLNumber | SQLString | SQLNull | SQLBoolean;


abstract class SQLObjectBase extends SQLValue {

}
class SQLRow extends SQLObjectBase {
    constructor(public row: Map<string, SQLPrimitive>) {
        super();
    }
    [Symbol.iterator]() {
        return this.row[Symbol.iterator]();
    }
    toString(header = true) {
        if (!header) return [...this.row.values()].map(v => v.toString()).join(" ");
        return [[...this.row.keys()], [...this.row.values()]].map(v => v.join(" ")).join("\n");
    }
    toTable(): Cell[][] {
        return [this.toHeader(), this.toRow()]
    }
    toRow(): Cell[] {
        return [...this.row.values()].map(v => v.toTable());
    }
    toHeader(): Cell[] {
        return [...this.row.keys()];
    }
}
class SQLTable extends SQLObjectBase {
    constructor(public rows: Iterable<SQLRow>, public name: string) {
        super();
    }
    toString() {
        return [[...this.rows][0].toString(), [...this.rows].slice(1, -1).map(v => v.toString(false))].join("\n");
    }
    toTable(): Cell[][] {
        const rows = [...this.rows];
        return [
            rows[0].toHeader(),
            ...rows.map(v => v.toRow())
        ]
    }
}
class SQLIdentifierValue extends SQLValue {
    constructor(public name: string) {
        super();
    }
    toString() {
        return `Identifier(${this.name})`;
    }
    toTable(): Cell {
        return this.name;
    }
}

class SQLAllSelector extends SQLIdentifierValue {
    constructor() {
        super("*")
    }
    toString() {
        return `*`;
    }
}
type SQLObject = SQLRow | SQLTable;

type SQLResult = SQLPrimitive | SQLObject | SQLIdentifierValue | SQLAllSelector;