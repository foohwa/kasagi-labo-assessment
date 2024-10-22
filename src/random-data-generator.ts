// I need 4 action,
//  1. generate alphabetical strings
//  2. generate real numbers
//  3. generate integers
//  4. generate alphanumerics
//      - The alphanumerics should contain a random number of spaces before and after it (not exceeding 10 spaces)
//
// File output should be 10MB in size

import * as fs from 'fs';

const GENERATED_FILE_OUTPUT_PATH = 'generated_random_string.txt';

export interface DataGenerator {
    generateRandomDataFile: () => void;
}

// Challenge A
class RandomDataGenerator implements DataGenerator {
    private writeStream = fs.createWriteStream(GENERATED_FILE_OUTPUT_PATH);
    private currentSize = 0;
    private readonly targetSize = 10 * 1024 * 1024; // 10 mb

    private generateAlphabetical(characterLength: number = 4): string {
        let character = "";
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < characterLength; ++i) {
            character += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return character;
    }

    private generateAlphanumeric(characterLength: number = 4): string {
        let character = "";
        const spaces = {
            before: Math.floor(Math.random() * 11), // 0-10 spaces
            after: Math.floor(Math.random() * 11)
        };

        const alphabetWithNumber = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < characterLength; ++i) {
            character += alphabetWithNumber[Math.floor(Math.random() * alphabetWithNumber.length)];
        }
        return ' '.repeat(spaces.before) + character + ' '.repeat(spaces.after);
    }

    private generateInteger(): number {
        return Math.floor(Math.random() * 200) - 100; // -100 to 100
    }

    private generateReal(): string {
        return (Math.random() * 200 - 100).toFixed(2); // -100 to 100 but with 2 decimal places
    }

    private generateLine(): string {
        const values: string[] = [];

        for (let i = 0; i < 4; ++i) {
            values.push(this.generateAlphabetical());
            values.push(this.generateReal());
            values.push(this.generateInteger().toString());
            values.push(this.generateAlphanumeric());
        }

        return values.join(",")
    }

    async generateRandomDataFile(): Promise<void> {
        while (this.currentSize < this.targetSize) {
            const generatedLines = this.generateLine()

            this.currentSize += Buffer.byteLength(generatedLines, "utf8");
            this.writeStream.write(generatedLines);
        }
        this.writeStream.end();
        console.log(`Results written to: ${GENERATED_FILE_OUTPUT_PATH}`);
    }
}

export default RandomDataGenerator;