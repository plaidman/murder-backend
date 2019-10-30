import { exit } from 'process';
import { alias } from 'yargs';
import { log } from './util/logFormatter';
import { runCommand } from './util/runCommand';

const argv = alias('s', 'single').nargs('s', 1).string('s').describe('s', 'target a specific test file')
    .alias('c', 'coverage').boolean('c').describe('c', 'enable coverage report and gate')
    .alias('o', 'open').boolean('o').describe('o', 'auto-open coverage analysis page')
    .alias('p', 'pipeline').boolean('p').describe('p', 'generate files for circleci pipeline')
    .alias('v', 'verbose').boolean('v').describe('v', 'verbose error messages')
    .help().version(false).argv;

test().catch((ex) => {
    if (argv.verbose) {
        log('error', ex.message);
    }

    exit(1);
});

async function test(): Promise<void> {
    let command = 'node_modules/.bin/jest --colors';

    if (argv.pipeline) {
        command = `JEST_JUNIT_OUTPUT='./reports/junit.xml' ${command}`;
        command = `${command} --reporters=default --reporters=jest-junit`;
        await runCommand('rm -rf reports');
    }

    if (argv.coverage) {
        command = `${command} --coverage`;
        await runCommand('rm -rf coverage');
    }

    if (argv.single) {
        command = `${command} '${argv.single}'`;
    }

    try {
        await runCommand(command);
    } finally {
        await openReport();
    }
}

async function openReport() {
    if (argv.coverage && argv.open) {
        await runCommand('open coverage/lcov-report/index.html');
    }
}
