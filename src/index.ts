import shelljs from "shelljs";

interface Library {
	[key: string]: ArgCallback;
}
export const library: Library = {};

export const exec = shelljs.exec;

export function execPromise(command: string, options: shelljs.ExecOptions) {
	return new Promise((resolve, reject) => {
		exec(command, options, (code, stdout, stderr) => {
			if (code != 0) reject(stderr);
			else resolve(stdout);
		});
	});
}

declare type ArgCallback = (args: string[]) => void;

export function use(path: string, exec: ArgCallback) {
	library[path] = exec;
}

export function build() {
	console.error("Not implemented yet !");
}
