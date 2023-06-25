<!--
{
  "order": 3,
  "title": "UI Customizations"
}
-->


## UI Customizations

You can customize everything in docs4all. 

### Html Theme

Just copy the **theme** folder from the [official repository](https://github.com/docs4all/docs4all) to the workspace root and then if you know html , css & javascript do whatever you want.

### Override default logo with file

![image](https://github.com/docs4all/docs4all/assets/3322836/3577a6c6-9469-48ad-adae-3a1e949773a3)

If you want to customize only the image logo, create a new file called: **bootstraper-logo.png** at the workspace root. You could use my [Gimp](https://www.gimp.org) template to create your own logo:

[https://github.com/docs4all/docs4all/tree/main/theme/assets/img](https://github.com/docs4all/docs4all/tree/main/theme/assets/img)

### Override default logo with text

To customize, create a settings.ini file at the workspace root with the following values

```ini
[branding]
logo_type = text
logo_value = My Wiki
```

### Override default logo with a image url

To customize, create a settings.ini file at the workspace root with the following values

```ini
[branding]
logo_type = image_from_url
logo_value = https://i.ibb.co/b2YYwYn/bootstraper-logo.png
```