import shelljs from 'shelljs';
import { merge } from 'lodash';

type ArgCallback = (args: string[]) => void;

interface Library {
  [key: string]: ArgCallback;
}

interface RecursiveObject {
  [key: string]: RecursiveObject;
}

class Crouxjs {
  library: Library = {};

  exec = shelljs.exec;

  execPromise(command: string, options: shelljs.ExecOptions) {
    return new Promise((resolve, reject) => {
      this.exec(command, options, (code, stdout, stderr) => {
        if (code !== 0) reject(stderr);
        else resolve(stdout);
      });
    });
  }

  use(command: string, exec: ArgCallback) {
    const pathDeepObject = this.#makeExecuteObject(command, exec);
    merge(this.library, pathDeepObject);
  }

  #makeExecuteObject = (command: string, exec: ArgCallback): Library => {
    const pathDeepObject = this.#makeDeepObject(command);
    const args = command.split(' ');
    const node = this.#getToDeepestObject(pathDeepObject, args);
    node[args[args.length - 1]] = exec;
    return pathDeepObject;
  };

  #getToDeepestObject = (pathDeepObject: any, args: string[]): Library => {
    let node = pathDeepObject;
    for (let i = 0; i < args.length - 1; i += 1) {
      node = node[args[i]];
    }
    return node;
  };

  #makeDeepObject = (command: string): any => {
    const nodeTree: RecursiveObject = {};
    let node = nodeTree;
    command.split(' ').forEach((value) => {
      node[value] = {};
      node = node[value];
    });
    return nodeTree;
  };
}

const croux = (): Crouxjs => new Crouxjs();

export = croux;
