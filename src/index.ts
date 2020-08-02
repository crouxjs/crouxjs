import shelljs from 'shelljs';
const shell = require('async-shelljs');
import { Library } from './library';
import CommandRequest, { ArgCallback } from './request';

interface ILibrary {
  [key: string]: CommandRequest;
}

interface RecursiveObject {
  [key: string]: RecursiveObject;
}

class Crouxjs {
  library: Library = new Library();

  exec = shelljs.exec;
  asyncExec = shell.asyncExec;

  use = (command: string, callback: ArgCallback) => {
    const request = new CommandRequest(command, callback);
    const commandDeepObject = this.#makeExecuteObject(request);
    this.library.add(commandDeepObject);
  };

  #makeExecuteObject = (request: CommandRequest): RecursiveObject => {
    const params: string[] = request.params;
    const pathDeepObject = this.#makeDeepObject(params);
    const node = this.#getToDeepestObject(pathDeepObject, params);
    node[params[params.length - 1]] = request;
    return pathDeepObject;
  };

  #getToDeepestObject = (pathDeepObject: any, params: string[]): ILibrary => {
    let node = pathDeepObject;
    for (let i = 0; i < params.length - 1; i += 1) {
      node = node[params[i]];
    }
    return node;
  };

  #makeDeepObject = (args: string[]): any => {
    const object: RecursiveObject = {};
    let node = object;
    args.forEach((value) => {
      node[value] = {};
      node = node[value];
    });
    return object;
  };
}

const croux = (): Crouxjs => new Crouxjs();

export = croux;
