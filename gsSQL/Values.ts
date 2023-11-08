abstract class SQLValue {

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
}

class SQLNull extends SQLPrimitiveBase<null> {
    valueOf() {
        return null;
    }
    toString() {
        return "NULL";
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
}

type SQLPrimitive = SQLNumber | SQLString | SQLNull | SQLBoolean;


abstract class SQLObjectBase extends SQLValue {

}
class SQLRow extends SQLObjectBase {
    constructor(private row: Map<string, SQLPrimitive>) {
        super();
    }
    toString() {
        return [[...this.row.keys()], [...this.row.values()]].map(v => v.join(" ")).join("\n");
    }
}
class SQLTable extends SQLObjectBase {
    constructor(public rows: Iterable<SQLRow>, public name: string) {
        super();
    }
}

type SQLObject = SQLRow | SQLTable;

type SQLResult = SQLPrimitive | SQLObject;