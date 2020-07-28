import shelljs from "shelljs";
import path from "path";

interface Library {
	[key: string]: ArgCallback;
}

export let library: Library = {};

export const exec = shelljs.exec;

export function execPromise(command: string, options: shelljs.ExecOptions) {
	return new Promise((resolve, reject) => {
		exec(command, options, (code, stdout, stderr) => {
			if (code != 0) reject(stderr);
			else resolve(stdout);
		});
	});
}

export type ArgCallback = (args: string[]) => void;

export function use(command: string, exec: ArgCallback) {
	const pathDeepObject = makeExecuteObject(command, exec);
	library = {
		...library,
		...pathDeepObject,
	};
}

export function build(folder: string) {
	console.error("Not implemented yet !");
}

function makeExecuteObject(command: string, exec: ArgCallback): Library {
	let pathDeepObject = makeDeepObject(command);
	let args = command.split(" ");
	let node = getToDeepestObject(pathDeepObject, args);
	node[args[args.length - 1]] = exec;
	return pathDeepObject;
}

function getToDeepestObject(pathDeepObject: any, args: string[]): Library {
	let node = pathDeepObject;
	for (let i = 0; i < args.length - 1; i++) {
		node = node[args[i]];
	}
	return node;
}

interface RecursiveObject {
	[key: string]: RecursiveObject;
}

function makeDeepObject(command: string): any {
	let src: RecursiveObject = {};
	let node = src;
	command.split(" ").forEach((value) => {
		node[value] = {};
		node = node[value];
	});
	return src;
}
