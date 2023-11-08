interface SQLExpression {
    type: string;
}
interface SQLStringLiteral extends SQLExpression {
    type: "stringLiteral";
    value: string;
}
interface SQLNumberLiteral extends SQLExpression {
    type: "numberLiteral";
    value: number;
}
interface SQLNoExpression extends SQLExpression {
    type: "noExpression";
}
interface SQLBooleanLiteral extends SQLExpression {
    type: "booleanLiteral";
    value: boolean;
}
interface SQLNullLiteral extends SQLExpression {
    type: "nullLiteral";
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

interface NonLeadingClauseStep {
    node: SQLNode;
    clause: NonLeadingClause;
    nextIndex: number;
}

interface SQLNot extends SQLExpression {
    type: "not";
    operand: SQLNode;
}

interface SQLEquals extends SQLExpression {
    type: "equals";
    left: SQLNode;
    right: SQLNode;
}

interface SQLNotEquals extends SQLExpression {
    type: "notEquals";
    left: SQLNode;
    right: SQLNode;
}

interface SQLLessThan extends SQLExpression {
    type: "lessThan";
    left: SQLNode;
    right: SQLNode;
}

interface SQLGreaterThan extends SQLExpression {
    type: "greaterThan";
    left: SQLNode;
    right: SQLNode;
}

interface SQLLessThanOrEqual extends SQLExpression {
    type: "lessThanOrEqual";
    left: SQLNode;
    right: SQLNode;
}

interface SQLGreaterThanOrEqual extends SQLExpression {
    type: "greaterThanOrEqual";
    left: SQLNode;
    right: SQLNode;
}

interface SQLAddition extends SQLExpression {
    type: "addition";
    left: SQLNode;
    right: SQLNode;
}

interface SQLSubtraction extends SQLExpression {
    type: "subtraction";
    left: SQLNode;
    right: SQLNode;
}

interface SQLMultiplication extends SQLExpression {
    type: "multiplication";
    left: SQLNode;
    right: SQLNode;
}

interface SQLDivision extends SQLExpression {
    type: "division";
    left: SQLNode;
    right: SQLNode;
}

interface SQLModulo extends SQLExpression {
    type: "modulo";
    left: SQLNode;
    right: SQLNode;
}

interface SequenceOfNonLeadingClauses {
    operators: NonLeadingClause[];
    operands: SQLNode[];

}
type NonLeadingClause = "WHERE" | "OR" | "AND" | "=" | "<>" | "<" | ">" | "<=" | ">=" | "+" | "-" | "*" | "/" | "%";
type SQLNode = SQLStringLiteral | SQLNumberLiteral | SQLNoExpression | SQLBooleanLiteral | SQLNullLiteral | SQLSelectFrom | SQLIdentifier | SQLWhere |
    SQLAND | SQLOR | SQLAll | SQLNot |
    SQLEquals | SQLNotEquals | SQLLessThan | SQLGreaterThan | SQLLessThanOrEqual | SQLGreaterThanOrEqual |
    SQLAddition | SQLSubtraction | SQLMultiplication | SQLDivision | SQLModulo;


type Cell = string | number | boolean | null;
type SheetsArgument = Cell | Cell[][];

interface ParsedStep {
    node: SQLNode;
    nextIndex: number;
}

