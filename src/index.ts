import shelljs from "shelljs";
import { isObject } from "util";
export const shell = shelljs;

export interface UseFonction {
	(path: string, command: string): Promise<any>;
	(path: string, command: string, options: shelljs.ExecOptions): Promise<any>;
	(path: string, command: string, callback: shelljs.ExecCallback): void;
	(
		path: string,
		command: string,
		options: shelljs.ExecOptions,
		callback: shelljs.ExecCallback,
	): void;
}

export const use: UseFonction = function (
	path: string,
	command: string,
	options?: any,
	callback?: shelljs.ExecCallback,
): any {
	if (options == null) {
		return usePromise(command);
	} else if (isObject(options)) {
		if (callback) {
			useCallback(command, callback, options);
		} else {
			return usePromise(command, options);
		}
	} else {
		useCallback(command, (callback = options));
	}
};

function usePromise(command: string, options: shelljs.ExecOptions = {}) {
	console.log("using promise !");
	return new Promise((resolve, reject) => {
		shell.exec(command, options, (code, stdout, stderr) => {
			if (code != 0) reject(stderr);
			else resolve(stdout);
		});
	});
}

function useCallback(
	command: string,
	callback: shelljs.ExecCallback,
	options: shelljs.ExecOptions = {},
) {
	console.log("using callback !");
	shell.exec(command, options, callback);
}
