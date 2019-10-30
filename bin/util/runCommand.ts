import { ChildProcess, exec } from 'child_process';
import { stderr, stdout } from 'process';

function promisifyExec(child: ChildProcess): Promise<ChildProcess> {
    return new Promise<ChildProcess>((resolve, reject) => {
        child.on('error', () => { reject(child); });
        child.on('exit', (code, signal) => {
            if (code !== 0) {
                reject(child);
                return;
            }

            resolve(child);
        });
    });
}

export async function runCommand(command: string): Promise<void> {
    stdout.write(`> ${command}\n`);

    const childProcess = exec(command, {
        maxBuffer: 1024 * 1024,
    });

    if (childProcess.stdout !== null) {
        childProcess.stdout.on('data', (data: string) => {
            stdout.write(data);
        });
    } else {
        stdout.write('WARNING: unable to forward stdout from child process');
    }

    if (childProcess.stderr !== null) {
        childProcess.stderr.on('data', (data: string) => {
            stderr.write(data);
        });
    } else {
        stdout.write('WARNING: unable to forward stderr from child process');
    }

    await promisifyExec(childProcess);

    stdout.write('\n');
}
