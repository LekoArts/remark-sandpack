# @lekoarts/remark-sandpack

## 1.0.0

### Major Changes

- [#1](https://github.com/LekoArts/remark-sandpack/pull/1) [`ec37875`](https://github.com/LekoArts/remark-sandpack/commit/ec37875df03ee1fd515ba3d0dd40c0bc0dd82b92) Thanks [@LekoArts](https://github.com/LekoArts)! - Initial release of `@lekoarts/remark-sandpack`. The README contains all relevant information on how to use the package.

  If you want to migrate from [`remark-sandpack`](https://github.com/thecuvii/remark-sandpack), here are the steps:

  1. Uninstall `remark-sandpack` and install `@lekoarts/remark-sandpack`:

     ```shell
     npm uninstall remark-sandpack
     npm install @lekoarts/remark-sandpack
     ```

  1. Change the import of the remark package:

     ```diff
     - import { remarkSandpack } from 'remark-sandpack'
     + import remarkSandpack from '@lekoarts/remark-sandpack'
     ```

  1. Change the `componentName` option to be always an array of strings:

     ```diff
     - remarkSandpack, { componentName: 'Playground' }
     + remarkSandpack, { componentName: ['Playground'] }
     ```

  1. Add `name=` in front of file names in code blocks. Also, names are **required** now.

     ````diff
     - ```js filename.js
     + ```js name=filename.js
     ````
