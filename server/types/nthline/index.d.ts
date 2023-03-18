declare module 'nthline' {
    function nthline(rowIndex: Number, filePath: String): Promise<string>;
    export = nthline;
}
