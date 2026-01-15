export type SQLResponse =
    | {
        success: true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result: any;
    }
    | {
        success: false;
        error: string;
    };
