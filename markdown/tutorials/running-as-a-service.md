/*
Title: Running as a Service
Sort: 2
*/

You can run docs4all easily in the background on your local or production machines with PM2.

1. Install docs4all globally with `npm install -g docs4all`
2. Edit the configuration file in your global NPM `node_modules/` directory (locate with `which docs4all` on *NIX)
3. Run docs4all with `docs4all start` and access logs with `docs4all logs`
4. When finished, run `docs4all stop`
