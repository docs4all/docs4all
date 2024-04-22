<!--
{
  "order":1,
  "title": "Authentication"
}
-->

## Authentication

Authentication is only available if you use nodejs to start the wiki. Published site are just index.html, css, js, etc without any kind of authentication.

To enable basic Authentication in docs4all is very simple.

### Simple Login

Just export these variables before the start

```
export LOGIN_TYPE=simple
export USER_jane=changeme
export USER_kurt=secret
```

More details here: https://github.com/jrichardsz-software-architect-tools/nodeboot-web-security-starter#how-it-works

### Microsoft Login

Just export these variables before the start

```
export LOGIN_TYPE=microsoft
export BASE_URL=www.acmedocs.com
export LOGIN_OAUTH2_CLIENT_ID=*****
export LOGIN_OAUTH2_CLIENT_SECRET=*****
export ALLOWED_USERS="jane_doe@microsoft.com,kurt_weller@hotmail.com"
```

More details here: https://github.com/jrichardsz-software-architect-tools/mkdocs-mod-template/wiki/Add-microsoft-login