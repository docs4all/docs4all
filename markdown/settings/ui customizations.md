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

## Html Title

` <title>{{site_name}}</title>`

To customize, create a **settings.yaml** file at the workspace root with the following value

```yaml
site_name: Docs4all
```

### Logo

![image](https://github.com/docs4all/docs4all/assets/3322836/3577a6c6-9469-48ad-adae-3a1e949773a3)

To override the logo, choose one of the following options.

### Text logo

To customize, create a **settings.yaml** file at the workspace root with the following value

```yaml
logo: Foo Bar Baz
```

Result will be:

![image](https://github.com/docs4all/docs4all/assets/3322836/c87b7a50-c225-407c-b183-7748b5b609a7)


### Image file 

To customize, create a **settings.yaml** file at the workspace root with the following value

```yaml
logo: ./nodejs-logo.png
```

- It is mandatory to start with `./`
- In this example **nodejs-logo.png** should be at the root of workspace

Result will be:

![image](https://github.com/docs4all/docs4all/assets/3322836/9a51521f-1a05-4578-8da0-b63f266d37ad)

### Image url

To customize, create a **settings.yaml** file at the workspace root with the following value

```yaml
logo: https://i.ibb.co/zm3Xs2R/docs4all-logo-image.png
```

To get a better dimensions, use our [template](https://github.com/docs4all/docs4all/wiki/Logo-Image-Template) or an image of 210 × 42 px