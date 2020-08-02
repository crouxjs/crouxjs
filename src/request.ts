export type ArgCallback = (args: CommandRequest) => Promise<unknown>;

export default class CommandRequest {
  raw: string;

  params: string[];

  callback: ArgCallback;

  constructor(raw: string, callback: ArgCallback) {
    this.raw = raw;
    this.params = raw
      .trim()
      .split(' ')
      .filter((value) => value.length > 0);
    this.callback = callback;
  }

  execute = () => {
    return this.callback(this);
  };
}
