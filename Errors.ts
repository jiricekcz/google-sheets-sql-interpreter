class NotImplementedError extends Error {
    public feature: string;
    constructor(feature: string) {
        super(`${feature}`);
        this.feature = feature;
        // @ts-ignore
        this.name = "NotImplementedError";

        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, NotImplementedError);
        }   

    }
}

class ParseError extends Error {
    public parseString: string;
    public start: number;
    public end: number;
    constructor(parseString: string, start: number, end: number, message: string) {
        super(`${message} around "${parseString.substring(start, end)}"`);
        this.parseString = parseString;
        this.start = start;
        this.end = end;
        // @ts-ignore
        this.name = "ParseError";

        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, ParseError);
        }
    }
}

class StringIdentifyError extends ParseError {
    constructor(parseString: string, start: number, end: number) {
        super(parseString, start, end, "String identification error");
        // @ts-ignore
        this.name = "StringIdentifyError";

        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, StringIdentifyError);
        }
    }
}

