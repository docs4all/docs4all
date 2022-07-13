/*
Title: Running as a Service
Sort: 2
*/

You can run docs4all-ligth easily in the background on your local or production machines with PM2.

1. Install docs4all-ligth globally with `npm install -g docs4all-ligth`
2. Edit the configuration file in your global NPM `node_modules/` directory (locate with `which docs4all-ligth` on *NIX)
3. Run docs4all-ligth with `docs4all-ligth start` and access logs with `docs4all-ligth logs`
4. When finished, run `docs4all-ligth stop`
