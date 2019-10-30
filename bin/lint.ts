import { exit } from 'process';
import { alias } from 'yargs';
import { log } from './util/logFormatter';
import { runCommand } from './util/runCommand';

const argv = alias('f', 'fix').boolean('f').describe('f', 'attempt to auto-fix some problems')
    .alias('v', 'verbose').boolean('v').describe('v', 'verbose error messages')
    .help().version(false).argv;

lint().catch((ex) => {
    if (argv.verbose) {
        log('error', ex.message);
    }

    exit(1);
});

async function lint(): Promise<void> {
    let fixOption = '';
    if (argv.fix) {
        fixOption = '--fix';
    }

    await runCommand(`node_modules/.bin/tslint --project tsconfig.json -t stylish ${fixOption} 'src/**/*.ts' 'tests/**/*.ts' 'bin/**/*.ts'`);

    return;
}
