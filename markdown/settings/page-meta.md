<!--
{
  "order": 2,
  "title": "Metadata"
}
-->

## Metadata

Each page can contain optional meta data about the page. This is useful when you need the page to have a different Title than the file name, custom sort, etc 

**For files**, add this comment at the beginning of markdown file:

```
<!--
{
  "order":1,
  "title": "Markdown Sample"
}
-->
```

**For folders**, add a file called **meta.json** inside of it with this content:

```
{
  "order":2,
  "title": "Folder"
}
```

## title 

This variable will override the title based on the file name or folder name.


## sort

This variable will affect the sorting of the pages inside the category. By default pages and folders are sorted alphabetically.