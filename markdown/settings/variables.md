<!--
{
  "order": 4,
  "title": "Variables"
}
-->


## Variables

To use variables in your markdown files, create a **settings.yaml** file at the workspace root with the following values

```yaml
global_csr_variables:
  best_language: Java
```

Then in your markdown files, use this placeholder ![image](https://github.com/docs4all/docs4all/assets/3322836/76559d37-93ab-4797-9834-6009d663e48c) like this:

![image](https://github.com/docs4all/docs4all/assets/3322836/dcd9cc63-cdf6-48ab-9cce-72365daca242)

The render engine will replace the placeholder with your declared variable at runtime (CSR), not at server side (SSR). Result will be:

`The best language is {{best_language}}`