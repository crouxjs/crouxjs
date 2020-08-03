import shelljs from 'shelljs';
const shell = require('async-shelljs');
import { Library } from './library';
import CommandRequest, { ArgCallback } from './request';

class Crouxjs {
  library: Library = new Library();

  exec = shelljs.exec;
  asyncExec = shell.asyncExec;

  use = (command: string, callback: ArgCallback) => {
    const request = new CommandRequest(command, callback);
    this.library.add(request);
  };
}

const croux = (): Crouxjs => new Crouxjs();

export = croux;
