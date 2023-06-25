/*
Title: Updating docs4all
*/

The update process for docs4all is as follows:

1. Make a backup of your `content` folder and your `config.js` outside of your project.

1. (Optional) If you have edited the template, backup the following paths:
   - the `themes/default/` folder
   - any edited files in the `public` folder

1. Download the latest version of docs4all from the [releases page](https://github.com/docs4all/docs4all/releases).

1. Extract the docs4all archive to your project folder, replacing all existing files in your existing docs4all install.

1. Copy your `content` folder and `config.js` file from your backup location back into the install location.

1. (Optional) If you have edited the template, copy your backed up `themes/default/` and `public` folders to the install location.

1. From the root of your project, run:

   ```bash
   npm update
   ```

1. To build the docs, run:

   ```bash
   npm start
   ```

You are running the lastest version of docs4all.