/* tslint:disable:no-console */

import chalk from 'chalk';

type LogLevel = 'info' | 'error';

export function log(level: LogLevel, message: string) {
    const colorMap: Record<LogLevel, (message: string) => string> = {
        info: chalk.blue,
        error: chalk.red,
    };

    const color = colorMap[level];
    console.log(color(`${chalk.bold(`[${level.toUpperCase()}]`)} ${message}`));
}
