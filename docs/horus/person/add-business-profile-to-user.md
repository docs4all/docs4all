# Add business unit and profile to a person

If person will execute operations in an web or api, permissions are required. In horus these permissions are to have a business unit and profile. This endpoint allow you to add a busines unit and profile to an existent person.

**Base Url** : `{{horusApiBaseUrl}}`

**Endpoint** : `/v1/nonspec/oauth2/management/person/business-profile`

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
    "email":"jane@828fligth.com",
    "businessUnitId":1,
    "profileId":1
}
```

**Request Fields Description**

| key | data-type | required | description |
|------------|--------------|-------------|-------------|
| clientId  |  string | yes | clientId which allow the execution of this endpoint |
| clientSecret  |  string | yes | clientSecret related to clientId |
| email  |  string | yes | existing person email|
| businessUnitId  |  int | yes | existing business unit id|
| profileId  |  int | yes | existing profile id|

**Request Headers Description**

| header key | header value | description |
|------------|--------------|-------------|
| x-usil-request-id  |  4512451 | random alphanumeric value which identify this event |


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
| 200001  | entity was created  |
| 200025  | relationship already exist  |
| 400002  | field is required.  |
| 403051  | clientId or clientScret are invalid.  |
| 500020  | person was not found  |
