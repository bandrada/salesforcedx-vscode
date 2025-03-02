/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { DirFileNameSelection } from '@salesforce/salesforcedx-utils-vscode';
import { ApexClassOptions, TemplateType } from '@salesforce/templates';
import { nls } from '../../../messages';
import { LibraryBaseTemplateCommand } from '../libraryBaseTemplateCommand';
import { APEX_CLASS_TYPE } from '../metadataTypeConstants';

export const CREATE_UNIT_NAME_KEY = 'force_apex_unit_class_create_text';
export const TELEMETRY_NAME = 'force_apex_unit_class_create';

export class LibraryForceApexUnitClassCreateExecutor extends LibraryBaseTemplateCommand<
  DirFileNameSelection
> {
  public executionName = nls.localize(CREATE_UNIT_NAME_KEY);
  public telemetryName = TELEMETRY_NAME;
  public metadataTypeName = APEX_CLASS_TYPE;
  public templateType = TemplateType.ApexClass;
  public getOutputFileName(data: DirFileNameSelection) {
    return data.fileName;
  }
  public constructTemplateOptions(data: DirFileNameSelection) {
    const templateOptions: ApexClassOptions = {
      template: 'ApexUnitTest',
      classname: data.fileName,
      outputdir: data.outputdir
    };
    return templateOptions;
  }
}
