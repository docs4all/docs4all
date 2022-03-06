<!--
{
  "order":1
}
-->

# Create Person

Used to create person

**Base Url** : `{{horusApiBaseUrl}}`

**Endpoint** : `/v1/nonspec/oauth2/management/person`

**Method** : `POST`

**Auth required** : Yes

- clientId & clientSecret in body. This will change in next release

**Permissions required** : Yes

- Review internal horus documentation

## Request

**type: body**

```json
{
  "clientId": "bb145d5f",
  "clientSecret":"bb145d5fxyz",
  "mainIdentifier": "44512345",
  "externaId": "92dd9aa0",
  "firstName": "Jane",
  "additionalFirstName": "Alice",
  "lastName": "Doe",
  "additionalLastName": "Patterson",
  "email": "jane@828fligth.com",
  "password": "",
  "enabled": 1,
  "custom": "{\"key\":\"value\"}",
  "categoryId": 1,
  "positionId": 1
}
```

**Request Fields Description**

| key | data-type | required | description |
|------------|--------------|-------------|-------------|
| clientId  |  string | yes | clientId which allow the execution of this endpoint |
| clientSecret  |  string | yes | clientSecret related to clientId |
| mainIdentifier  |  string | yes | main identifier of person in the country. DNI for peruvians, SSN for american people, etc|
| externalId  |  string | no | additional id of this person in another systems|
| firstName  |  string | yes |person first name|
| additionalFirstName  |  string | no |additional name of person. Usually in south america|
| lastName  |  string | yes | person last name|
| additionalLastName  | string | no |additional last name of person. Usually in south america|
| email  | string | yes | person email to be used in login forms managed by horus|
| password  | string | no | password related to email to be used in login forms managed by horus|
| enabled  | int | no | flag to enable or disable this person. 1=enabled, 0=disabled|
| custom  | string | no | string to add custom values of this person, that horus don't support|
| categoryId  | int | yes | person category id in the company. Category must exist before this invocation|
| positionId  | int | yes | person position id in the company. Position must exist before this invocation|


**Request Headers Description**

| header key | header value | description |
|------------|--------------|-------------|
| x-usil-request-id  |  ***** | random alphanumeric value which identify this event |

## Response

```json
{
    "code": 20000,
    "message": "success"
}
```

**Response Fields Description**


| field | data-type | description |
|------------|--------------|-------------|
| code  | int | numeric value which indicates the success or failure of invocation. 200XYZ for success and any other value for failures  |
| message  | string | message related to code. On errors contains a description  |

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
| 403051  | clientId or clientScret are invalid.  |
| 400002  | field is required.  |
| 200001  | entity was created  |
| 200023  | a person already exist with provided email  |
| 200024  | a person already exist with provided mainIdentifier  |
