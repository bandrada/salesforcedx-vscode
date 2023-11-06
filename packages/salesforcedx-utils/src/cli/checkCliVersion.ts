/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { SfdxCommandBuilder } from './sfdxCommandBuilder';
import { CliCommandExecutor } from './cliCommandExecutor';
import { CommandOutput } from './commandOutput';

export enum CheckCliEnum {
  validCli = 1,
  cliNotSupported = 2,
  cliNotInstalled = 3
}

export class CheckCliVersion {

  public async getCliVersion(): Promise<string> {
    // Execute the command "sfdx --version" in the Terminal
    const execution = new CliCommandExecutor(
      new SfdxCommandBuilder()
        .withArg('--version')
        .withJson()
        .build(),
        {}
      ).execute();

    // Save the result of the command
    const cmdOutput = new CommandOutput();
    return await cmdOutput.getCmdResult(execution);
  }

  public async validateCliVersion(cliVersion: string): Promise<number> {

    // Parse the result to check if the version is supported
    const sfdxPattern = /sfdx-cli\/(\d+\.\d+\.\d+)/;
    const sfPattern = /@salesforce\/cli\/(\d+\.\d+\.\d+)/;

    const sfdxMatch = sfdxPattern.exec(cliVersion);
    const sfMatch = sfPattern.exec(cliVersion);

    // Case 1: SFDX CLI is installed
    if (sfdxMatch) {
      const sfdxVersion = sfdxMatch[1];
      const sfdxVersionNumber = sfdxVersion.split('.').map(Number);
      // The last working version of SFDX is v7.193.2
      if (sfdxVersionNumber[0] >= 7 && sfdxVersionNumber[1] >= 193 && sfdxVersionNumber[2] >= 2) {
        return CheckCliEnum.validCli;
      }
      else {
        return CheckCliEnum.cliNotSupported;
      }
    }

    // Case 2: SF CLI is installed
    else if (sfMatch) {
      const sfVersion = sfMatch[1];
      const sfVersionNumber = sfVersion.split('.').map(Number);
      // SF v1 does not map sf commands to sfdx commands and is not supported
      if (sfVersionNumber[0] >= 2 && sfVersionNumber[1] >= 0 && sfVersionNumber[2] >= 0) {
        return CheckCliEnum.validCli;
      }
      else {
        return CheckCliEnum.cliNotSupported;
      }
    }

    // Case 3: Neither SFDX CLI nor SF CLI is installed
    else {
      return CheckCliEnum.cliNotInstalled;
    }
  }
}