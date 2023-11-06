interface SQLExpression {
    type: string;
}
interface SQLString extends SQLExpression {
    type: "string";
    value: string;
}
interface SQLNumber extends SQLExpression {
    type: "number";
    value: number;
}
interface SQLNoExpression extends SQLExpression {
    type: "noExpression";
}
interface SQLBoolean extends SQLExpression {
    type: "boolean";
    value: boolean;
}
interface SQLNull extends SQLExpression {
    type: "null";
}
interface SQLSelectFrom extends SQLExpression {
    type: "selectFrom";
    select: SQLNode[];
    from: SQLNode[];
    distinct: boolean;
}
interface SQLIdentifier extends SQLExpression {
    type: "identifier";
    value: string;
}
interface SQLWhere extends SQLExpression {
    type: "where";
    operand: SQLNode;
    condition: SQLNode;
}
interface SQLAND extends SQLExpression {
    type: "and";
    left: SQLNode;
    right: SQLNode;
}

interface SQLOR extends SQLExpression {
    type: "or";
    left: SQLNode;
    right: SQLNode;
}

interface SQLAll extends SQLExpression {
    type: "all";
}

type SQLNode = SQLString | SQLNumber | SQLNoExpression | SQLBoolean | SQLNull | SQLSelectFrom | SQLIdentifier | SQLWhere | SQLAND | SQLOR | SQLAll;



type SQLResult = never;

type Cell = string | number | boolean | null;
type SheetsArgument = Cell | Cell[][];

interface ParsedStep {
    node: SQLNode;
    nextIndex: number;
}