<!--
{
  "order":2,
  "title": "Startup"
}
-->


Make sure you have met the [minimum requirements](./install/requirements) then install
docs4all:

**Note:** It is recommended to create a new Git repository to store your documentation files.

## Demo (with nodejs)

- clone the template: https://github.com/docs4all/docs4all-demo
- add your own files in **markdown** folder
- for developers

```
npm install
npm run dev
```

- for production with node

```
npm install
npm run start
```

## Demo (static web)

- clone the template: https://github.com/docs4all/docs4all-demo
- add your own files in markdown folder
- execute

```
npm install
npm run build
npm run publish
```

- this will create a **site** folder with the static files ready to deploy on any http server
