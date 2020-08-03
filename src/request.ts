import { arrayEquals } from './utils';

export type ArgCallback = (args: CommandRequest) => Promise<unknown>;

export default class CommandRequest {
  raw: string;

  params: string[];

  callback: ArgCallback;

  constructor(raw: string, callback: ArgCallback) {
    this.raw = raw;
    this.params = CommandRequest.computeParametersArray(raw);
    this.callback = callback;
  }

  execute = () => {
    return this.callback(this);
  };

  static computeParametersArray = (command: string): string[] => {
    return command
      .trim()
      .split(' ')
      .filter((value) => value.length > 0);
  };

  static equals = (arg0: CommandRequest, arg1: CommandRequest): boolean => {
    return arrayEquals(arg0.params, arg1.params);
  };
}
