# Silent token generation

Create tokens for users

**Base Url** : `{{horusApiBaseUrl}}`

**Endpoint** : `/v1/nonspec/oauth2/token/silent-password`

**Method** : `POST`

**Auth required** : Yes

- clientId & clientSecret in body. This will change in next release

**Permissions required** : Yes

- Review internal horus documentation

## Request

**type: body**

```json
{
    "clientId":"bb145d5f",
    "clientSecret":"bb145d5fxyz",
    "grantType":"silent_password",
    "username":"sanvi@828fligth.com"
}
```

**Request Fields Description**

| key | data-type | required | description |
|------------|--------------|-------------|-------------|
| clientId  |  string | yes | clientId which allow the execution of this endpoint |
| clientSecret  |  string | yes | clientSecret related to clientId |
| grantType  |  string | yes | use **silent_password** |
| username  |  string | yes | person email |

**Request Headers Description**

| header key | header value | description |
|------------|--------------|-------------|
| x-usil-request-id  |  4512451 | random alphanumeric value which identify this event |


## Response

```json
{
    "code": 20000,
    "message": "success",
    "content": {
        "access_token": "eyJhbGciOiJIUzI1NiJ9.eqBo9Q",
        "token_type": "bearer",
        "expires_in": "3600s"
    }
}
```

**Response Fields Description**


| field | data-type | description |
|------------|--------------|-------------|
| code  | int | numeric value which indicates the success or failure of invocation. 200XYZ for success and any other value for failures  |
| message  | string | message related to code. On errors contains a description  |
| content.access_token  | string | token to be attached to any api invocation  |
| content.token_type  | string | token type  |
| content.expires_in  | string | token expiration in seconds  |

**Response Headers Description**

| header key | header value | description |
|------------|--------------|-------------|
| x-usil-request-id  |  ***** | value received in request headers or a  random alphanumeric value if client don't send it|

**Response codes**

- If response is success, http **status** will be **200** and **code** in body will be **200XYZ**
- If the invocation ends with error, http status will have the standard status: 401, 403, 500, 502, etc and the code in body will contain an extra numeric values to classify the error:
  - 400xyz
  - 401xyz
  - 403xyz
  - 500xyz
  - etcxyz


| code | description |
|------------|-------------|
| 400002  | field is required.  |
| 403051  | clientId or clientScret are invalid.  |
| 500030  | person was not found  |
