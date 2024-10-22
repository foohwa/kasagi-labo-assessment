// 1. Read file from output directory that specified in challenge A directory
// 2. process and strip all empty spaces before proceed
// 3. print the object and the type for each of the string

import * as fs from 'fs/promises';

type DataType = 'alphabetical' | 'integer' | 'real' | 'alphanumeric' | 'unknown'

interface TypeChecker {
    processFile(file: string): void;
}

class DataTypeChecker implements TypeChecker {

    async processFile(file: string): Promise<void> {
        try {
            const string = await fs.readFile(file, 'utf8');

            const splittedString = string.split(",")

            const trimmedSplittedString = splittedString.map((char) => char.replace(/\s+/g, ''));

            const output: string[] = [];

            trimmedSplittedString.forEach((value) => {
                const type = this.checkValueType(value);
                const line = `Value: ${value.trim()}, Type: ${type}`;
                output.push(line);
            })

            const outputPath = 'type_checker_result.txt';
            await fs.writeFile(outputPath, output.join('\n'));
            console.log(`Results written to: ${outputPath}`);

        } catch (e) {
            console.log(e)
            throw new Error("Error while processing file");
        }
    }

    private checkValueType(value: string): DataType {
        const trimmedValue = value.trim();

        if (this.isAlphabetical(trimmedValue)) return 'alphabetical';
        if (this.isInteger(trimmedValue)) return 'integer';
        if (this.isReal(trimmedValue)) return 'real';
        if (this.isAlphaNumeric(trimmedValue)) return 'alphanumeric';

        return 'unknown';
    }

    private isAlphabetical = (str: string): boolean => /^[a-zA-Z]+$/.test(str);
    private isAlphaNumeric = (str: string): boolean => /^[a-zA-Z0-9]+$/.test(str);
    private isInteger = (str: string): boolean => Number.isInteger(Number(str));
    private isReal = (str: string): boolean => !isNaN(parseFloat(str));

}

export default DataTypeChecker;