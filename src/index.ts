import shelljs from "shelljs";

class Crouxjs {
	library: Library = {};

	exec = shelljs.exec;

	execPromise(command: string, options: shelljs.ExecOptions) {
		return new Promise((resolve, reject) => {
			this.exec(command, options, (code, stdout, stderr) => {
				if (code != 0) reject(stderr);
				else resolve(stdout);
			});
		});
	}

	use(command: string, exec: ArgCallback) {
		const pathDeepObject = makeExecuteObject(command, exec);
		this.library = {
			...this.library,
			...pathDeepObject,
		};
	}

	build(folder: string) {
		console.error("Not implemented yet !");
	}
}

const croux = () => new Crouxjs();

export = croux;

interface Library {
	[key: string]: ArgCallback;
}

type ArgCallback = (args: string[]) => void;

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
	let nodeTree: RecursiveObject = {};
	let node = nodeTree;
	command.split(" ").forEach((value) => {
		node[value] = {};
		node = node[value];
	});
	return nodeTree;
}
