import shelljs from "shelljs";
import { isObject } from "util";
import { ChildProcess } from "child_process";
export const shell = shelljs;

export interface UseFonction {
	(path: string, command: string): Promise<unknown>;
	(path: string, command: string, options: shelljs.ExecOptions): Promise<
		unknown
	>;
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
		return _usePromise(command);
	} else if (isObject(options)) {
		if (callback) {
			return _useCallback(command, callback, options);
		} else {
			return _usePromise(command, options);
		}
	} else {
		return _useCallback(command, (callback = options));
	}
};

function _usePromise(
	command: string,
	options: shelljs.ExecOptions = {},
): Promise<unknown> {
	console.log("using promise !");
	return new Promise((resolve, reject) => {
		shell.exec(command, options, (code, stdout, stderr) => {
			if (code != 0) reject(stderr);
			else resolve(stdout);
		});
	});
}

function _useCallback(
	command: string,
	callback: shelljs.ExecCallback,
	options: shelljs.ExecOptions = {},
): ChildProcess {
	console.log("using callback !");
	return shell.exec(command, options, callback);
}
