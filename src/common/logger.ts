/* tslint:disable:no-console */

import chalk from 'chalk';
import stringifyObject from 'stringify-object';

type LogLevelType = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

function log(level: LogLevelType, message: string, context?: Record<string, any>): void {
    const colorMap: Record<LogLevelType, (msg: string) => string> = {
        debug: chalk.magenta,
        info: chalk.blue,
        warn: chalk.yellow,
        error: chalk.red,
        fatal: chalk.bgRed.black,
    };

    const color = colorMap[level] || chalk.white;
    const ucLevel = level.toUpperCase();

    console.log(color(`${chalk.bold(`[${ucLevel}]`)} ${message}`));
    if (context !== undefined) {
        console.log(stringifyObject(context, {
            indent: '  ',
            singleQuotes: false,
        }));
    }
    console.log('----------------------------\n');
}

export function debug(message: string, context?: Record<string, any>): void {
    log('debug', message, context);
}

export function info(message: string, context?: Record<string, any>): void {
    log('info', message, context);
}

export function warn(message: string, context?: Record<string, any>): void {
    log('warn', message, context);
}

export function error(message: string, context?: Record<string, any>): void {
    log('error', message, context);
}

export function fatal(message: string, context?: Record<string, any>): void {
    log('fatal', message, context);
}
