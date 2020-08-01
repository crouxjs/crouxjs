import shelljs from 'shelljs';
const shell = require('async-shelljs');
import { ArgCallback, Library } from './library';

interface ILibrary {
  [key: string]: ArgCallback;
}

interface RecursiveObject {
  [key: string]: RecursiveObject;
}

class Crouxjs {
  library: Library = new Library();

  exec = shelljs.exec;
  asyncExec = shell.asyncExec;

  use(command: string, callback: ArgCallback) {
    const commandDeepObject = this.#makeExecuteObject(command, callback);
    this.library.add(commandDeepObject);
  }

  #makeExecuteObject = (command: string, callback: ArgCallback): Library => {
    const pathDeepObject = this.#makeDeepObject(command);
    const args = command.split(' ');
    const node = this.#getToDeepestObject(pathDeepObject, args);
    node[args[args.length - 1]] = callback;
    return pathDeepObject;
  };

  #getToDeepestObject = (pathDeepObject: any, args: string[]): ILibrary => {
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
