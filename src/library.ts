import { merge } from 'lodash';
import CommandRequest from './request';

export type ArgCallback = (args: CommandRequest) => Promise<unknown>;

interface ILibrary {
  [key: string]: ILibrary | ArgCallback;
}

export class Library {
  #library: ILibrary = {};

  request = (command: string): any => {
    const request: any = this.#getDeepFunction(command);
    if (request === undefined) return;
    return request(new CommandRequest(command));
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

  #getDeepFunction = (command: string): ArgCallback | undefined => {
    let args = command.split(' ');
    let node: any = this.#library;
    for (let i = 0; i < args.length; i++) {
      if (!(args[i] in node)) return;
      node = node[args[i]];
    }
    return node;
  };
}
