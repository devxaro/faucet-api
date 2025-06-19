import {execa} from 'execa';
import {TechnicalErrors} from '../../core/errors';

export class CommandLineClient {
  constructor() {}

  async runCmd(command: string, args: string[] = [], options: any = {}) {
    try {
      const result = await execa(command, args, options);

      if (result.stderr) {
        throw new Error(result.stderr);
      }

      return result.stdout;
    } catch (err: any) {
      throw new TechnicalErrors.ExternalCmdError(err.message);
    }
  }
}
