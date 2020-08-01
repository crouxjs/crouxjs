export default class CommandRequest {
  raw: string = '';

  params: string[] = [];

  constructor(raw: string) {
    this.raw = raw;
    this.params = raw.trim().split(' ');
  }
}
