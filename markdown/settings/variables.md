<!--
{
  "order": 4,
  "title": "Variables"
}
-->


## Variables

To use variables in your markdown files, create a settings.ini file at the workspace root with the following values

```ini
[variables]
best_language = Java
```

Then in your markdown files, use this placeholder `{{best_language}}`.

The render engine will replace the placeholder with your declared variable at runtime (CSR), not at server side (SSR)