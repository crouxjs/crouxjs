import { merge } from 'lodash';
import CommandRequest from './request';

interface ILibrary {
  [key: string]: ILibrary | CommandRequest;
}

export class Library {
  #library: ILibrary = {};

  request = (command: string): any => {
    const request: CommandRequest | undefined = this.#getDeepFunction(command);
    if (request === undefined) return;
    return request.execute();
  };

  add = (commandObject: any) => {
    merge(this.#library, commandObject);
    return this;
  };

  size = () => {
    return Object.keys(this.#library);
  };

  clear = () => {
    this.#library = {};
  };

  #getDeepFunction = (command: string): CommandRequest | undefined => {
    let args = command.split(' ');
    let node: any = this.#library;
    for (let i = 0; i < args.length; i++) {
      if (!(args[i] in node)) return;
      node = node[args[i]];
    }
    return node;
  };
}
