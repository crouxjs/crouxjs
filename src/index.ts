import shelljs from "shelljs";

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

declare type ArgCallback = (args: string[]) => void;

export function use(path: string, exec: ArgCallback) {
	const pathDeepObject = makeExecuteObject(path, exec);
	library = {
		...library,
		...pathDeepObject,
	};
}

export function build() {
	console.error("Not implemented yet !");
}

function makeExecuteObject(path: string, exec: ArgCallback): Library {
	let pathDeepObject = makeDeepObject(path);
	let args = path.split(" ");
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

function makeDeepObject(path: string): any {
	let src: RecursiveObject = {};
	let node = src;
	path.split(" ").forEach((value) => {
		node[value] = {};
		node = node[value];
	});
	return src;
}
