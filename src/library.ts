import CommandRequest from './request';
import { arrayEquals } from './utils';

export class Library {
  #library: Array<CommandRequest> = [];

  request = (command: string): Promise<unknown> => {
    const request: CommandRequest | undefined = this.#getRequest(command);
    if (request === undefined) {
      return new Promise((resolve, reject) => {
        reject('Command not found');
      });
    }
    return request.execute();
  };

  add = (commandRequest: CommandRequest): Library => {
    this.remove(commandRequest);
    this.#library.push(commandRequest);
    return this;
  };

  remove = (commandRequest: CommandRequest): boolean => {
    const index = this.#library.findIndex((request) => {
      return CommandRequest.equals(commandRequest, request);
    });
    if (index === -1) return false;
    this.#library.splice(index, 1);
    return true;
  };

  contains = (commandRequest: CommandRequest): boolean => {
    const contains = this.#library.find((request) => {
      return CommandRequest.equals(commandRequest, request);
    });
    return contains !== undefined;
  };

  size = () => {
    return this.#library.length;
  };

  clear = () => {
    this.#library = [];
  };

  #getRequest = (command: string): CommandRequest | undefined => {
    const params = CommandRequest.computeParametersArray(command);
    return this.#library.find((request) => arrayEquals(params, request.params));
  };
}
