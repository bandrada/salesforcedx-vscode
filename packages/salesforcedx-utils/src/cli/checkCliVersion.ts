/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { CliCommandExecutor } from './cliCommandExecutor';
import { CommandOutput } from './commandOutput';
import { SfCommandBuilder } from './sfCommandBuilder';
import { SfdxCommandBuilder } from './sfdxCommandBuilder';

export enum CheckCliEnum {
  validCli = 1,
  outdatedSFDXVersion = 2,
  onlySFv1 = 3,
  cliNotInstalled = 4,
  bothSFDXAndSFInstalled = 5
}

export class CheckCliVersion {
  public async getSfdxCliVersion(): Promise<string> {
    try {
      // Execute the command "sfdx --version" in the Terminal
      const sfdxExecution = new CliCommandExecutor(
        new SfdxCommandBuilder().withArg('--version').withJson().build(),
        {}
      ).execute();
      // Save the result of the command
      const sfdxCmdOutput = new CommandOutput();
      const sfdxVersion = await sfdxCmdOutput.getCmdResult(sfdxExecution);
      return sfdxVersion;
    } catch {
      return 'No SFDX CLI';
    }
  }

  public async getSfCliVersion(): Promise<string> {
    try {
      // Execute the command "sf --version" in the Terminal
      const sfExecution = new CliCommandExecutor(
        new SfCommandBuilder().withArg('--version').withJson().build(),
        {}
      ).execute();
      // Save the result of the command
      const sfCmdOutput = new CommandOutput();
      // const sfVersion = await sfCmdOutput.getCmdResult(sfExecution);
      // return sfVersion;
      console.log(sfExecution);
      console.log(sfCmdOutput);
      return 'dummytext';
    } catch {
      return 'No SF CLI';
    }
  }

  public async parseSfdxCliVersion(sfdxCliVersion: string): Promise<number[]> {
    console.log(sfdxCliVersion);
    return [-1];
  }

  public async parseSfCliVersion(sfCliVersion: string): Promise<number[]> {
    console.log(sfCliVersion);
    return [-2];
  }

  public async validateCliInstallationAndVersion(
    sfdxCliVersionArray: number[],
    sfCliVersionArray: number[]
  ): Promise<Number> {
    console.log(sfdxCliVersionArray);
    console.log(sfCliVersionArray);
    return 10;
  }
}
