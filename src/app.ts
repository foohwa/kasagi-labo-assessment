import RandomDataGenerator from "./random-data-generator";
import DataTypeChecker from "./data-type-checker";

const GENERATED_FILE_PATH = `generated_random_string.txt`;

async function main() {
    try {
        console.log('Starting file generation...');
        const randomDataGenerator = new RandomDataGenerator();
        await randomDataGenerator.generateRandomDataFile();
        console.log('File generated!');

        console.log('Starting file processing...');
        const checker = new DataTypeChecker();
        await checker.processFile(GENERATED_FILE_PATH);
        console.log('File processing completed!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main().catch(console.error);
