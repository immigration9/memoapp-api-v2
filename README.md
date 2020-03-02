# DramanCompany MemoApp

NodeJS, ExpressJS RESTful MemoApp API.

Please note that the application is *NOT* designed to carefully take exceptions into account.

# DB

typicode의 LowDB를 사용하여 구현되었음. [LowDB](https://github.com/typicode/lowdb)
서버 시작시 자동으로 DB 파일이 db/db.json로 생성된다.
데이터베이스를 초기화하고 싶을 경우, 해당 파일을 지운 뒤 서버를 재시작하면 정상적으로 초기화된다.

# API
yarn을 사용하여 dependency를 설치한 뒤 서버를 시작해주면 된다.

```bash
yarn
PORT=3000 yarn start
```

# API Specifications
### [Memo](#memo-1)
- [List](#list)
- [Get](#get)
- [Update](#update)
- [Delete](#delete)

### [Label](#label-1)
- [List](#list-1)
- [Get](#get-1)
- [Update](#update-1)
- [Delete](#delete-1)
- [Add Memos](#add-memos)
- [Remove Memos](#remove-memos)

# <span id="memo">Memo</span>
## <span id="memo-list">List</span>
#### URL
- GET /memos

#### Request Example
GET /memos

#### Response
- A list of all memo objects

| Level1 |
|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| content |
### Response Example

```json
[
    {
        "_id": "5afbe6a12c7caff319d454d8",
        "updatedAt": "2018-05-16T08:07:47.688Z",
        "createdAt": "2018-05-16T08:06:57.499Z",
        "title": "memo1",
        "content": "memo1 content"
    },
    {
        "_id": "5afbe6a22c7caff319d454d9",
        "updatedAt": "2018-05-16T08:07:55.700Z",
        "createdAt": "2018-05-16T08:06:58.040Z",
        "title": "memo2",
        "content": "memo3 content"
    },
    {
        "_id": "5afbe6a22c7caff319d454da",
        "updatedAt": "2018-05-16T08:07:32.366Z",
        "createdAt": "2018-05-16T08:06:58.410Z",
        "title": "memo3",
        "content": ""
    }
]
```
## <span id="memo-create">Create</span>
#### URL
- POST /memos

#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| title | O | - | Title of memo |
| content | X | empty string | content of memo |
#### Request Example
POST /memos

```json
{
	"title": "titleExample",
	"content": "contentExample"
}
```
#### Response
- A newly created memo object

| Level1 |
|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| content |
### Response Example

```json
{
    "updatedAt": "2018-05-16T08:14:26.388Z",
    "createdAt": "2018-05-16T08:14:26.388Z",
    "title": "titleExample",
    "_id": "5afbe8622c7caff319d454df",
    "content": "contentExample"
}
```
## <span id="memo-get">Get</span>
#### URL
- GET /memos/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of memo to get |

#### Request Example
GET /memos/5afbe8622c7caff319d454df
#### Response
- A requested memo object matched to a given ID

| Level1 |
|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| content |
### Response Example

```json
{
    "_id": "5afbe8622c7caff319d454df",
    "updatedAt": "2018-05-16T08:14:26.388Z",
    "createdAt": "2018-05-16T08:14:26.388Z",
    "title": "titleExample",
    "content": "contentExample"
}
```
## <span id="memo-update">Update</span>
#### URL
- PUT /memos/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of memo to delete |
#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| title | X | - | title of memo |
| content | X | - | content of memo |
#### Request Example
PUT /memos/5afbe8622c7caff319d454df

```json
{
	"title": "titleUpdated",
	"content": "contentUpdated"
}
```

#### Response
- A updated memo object

| Level1 |
|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| content |
### Response Example
```json
{
    "_id": "5afbe8622c7caff319d454df",
    "updatedAt": "2018-05-16T08:29:46.433Z",
    "createdAt": "2018-05-16T08:14:26.388Z",
    "title": "titleUpdated",
    "content": "contentUpdated"
}
```

## <span id="memo-delete">Delete</span>
#### URL
- DELETE /memos/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of memo to remove |
#### Request Example
DELETE /memos/5afbe8622c7caff319d454df

#### Response
- A deleted memo object

| Level1 |
|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| content |
### Response Example

```json
{
    "_id": "5afbe8622c7caff319d454df",
    "updatedAt": "2018-05-16T08:29:46.433Z",
    "createdAt": "2018-05-16T08:14:26.388Z",
    "title": "titleExample",
    "content": "contentExample"
}
```

# <span id="label">Label</span>
## <span id="label-list">List</span>
#### URL
- GET /labels

#### Query Parameters

| Name | Default |Description |
|--------|--------|--------|
| populate | true | If set false, response labels' memos are just id list |
#### Request Example
GET /labels

#### Response
- A list of all label objects

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example
- GET /labels

```json
[
    {
        "_id": "5afbee91141592fc9850ae38",
        "updatedAt": "2018-05-16T08:53:19.084Z",
        "createdAt": "2018-05-16T08:40:49.193Z",
        "title": "titleUpdated",
        "memos": [
            {
                "_id": "5afbe6a12c7caff319d454d8",
                "updatedAt": "2018-05-16T08:07:47.688Z",
                "createdAt": "2018-05-16T08:06:57.499Z",
                "title": "memo1",
                "content": "memo1 cotent"
            }
        ]
    },
    {
        "_id": "5afbf1bd144298fffa301c0e",
        "updatedAt": "2018-05-16T08:54:21.550Z",
        "createdAt": "2018-05-16T08:54:21.550Z",
        "title": "titleExample",
        "memos": []
    }
]
```
- GET /labels?populate=false

```json
[
    {
        "_id": "5afbee91141592fc9850ae38",
        "updatedAt": "2018-05-16T08:53:19.084Z",
        "createdAt": "2018-05-16T08:40:49.193Z",
        "title": "titleUpdated",
        "memos": [
        	"5afbe6a12c7caff319d454d8"
    	]
    },
    {
        "_id": "5afbf1bd144298fffa301c0e",
        "updatedAt": "2018-05-16T08:54:21.550Z",
        "createdAt": "2018-05-16T08:54:21.550Z",
        "title": "titleExample",
        "memos": []
    }
]
```
## <span id="label-create">Create</span>
#### URL
- POST /labels

#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| title | O | - | Title of label |
| content | X | empty string | content of label |
#### Request Example
POST /labels

```json
{
	"title": "titleExample"
}
```
#### Response
- A newly created label object

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example

```json
{
    "updatedAt": "2018-05-16T08:54:21.550Z",
    "createdAt": "2018-05-16T08:54:21.550Z",
    "title": "titleExample",
    "_id": "5afbf1bd144298fffa301c0e",
    "memos": []
}
```
## <span id="label-get">Get</span>
#### URL
- GET /labels/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of labels to get |

#### Request Example
GET /labels/5afbee91141592fc9850ae38
#### Response
- A requested label object matched to a given ID

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example

```json
{
    "_id": "5afbee91141592fc9850ae38",
    "updatedAt": "2018-05-16T08:53:19.084Z",
    "createdAt": "2018-05-16T08:40:49.193Z",
    "title": "titleUpdated",
    "memos": [
        {
            "_id": "5afbe6a12c7caff319d454d8",
            "updatedAt": "2018-05-16T08:07:47.688Z",
            "createdAt": "2018-05-16T08:06:57.499Z",
            "title": "memo1",
            "content": "memo1 conent"
        }
    ]
}
```
## <span id="label-update">Update</span>
#### URL
- PUT /labels/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of label to update |
#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| title | X | - | title of label |
#### Request Example
PUT /labels/5afbee91141592fc9850ae38

```json
{
	"title": "titleUpdated",
}
```

#### Response
- A updated label object

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example
```json
{
    "_id": "5afbee91141592fc9850ae38",
    "updatedAt": "2018-05-16T08:59:21.007Z",
    "createdAt": "2018-05-16T08:40:49.193Z",
    "title": "titleUpdated",
    "memos": [
        {
            "_id": "5afbe6a12c7caff319d454d8",
            "updatedAt": "2018-05-16T08:07:47.688Z",
            "createdAt": "2018-05-16T08:06:57.499Z",
            "title": "memo1",
            "content": "memo1 conent"
        }
    ]
}
```

## <span id="label-delete">Delete</span>
#### URL
- DELETE /labels/:id

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of label to remove |
#### Request Example
DELETE /labels/5afcf202a6841395c9c4af33

#### Response
- A deleted label object

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example

```json
{
    "memos": [
        {
            "content": "23432432",
            "_id": "5afcf21ba6841395c9c4af35",
            "title": "1233",
            "createdAt": "2018-05-17T03:08:11.909Z",
            "updatedAt": "2018-05-17T03:08:11.909Z",
        }
    ],
    "_id": "5afcf202a6841395c9c4af33",
    "title": "1233",
    "createdAt": "2018-05-17T03:07:46.346Z",
    "updatedAt": "2018-05-17T07:09:05.584Z",
}
```
## <span id="label-add-memos">Add Memos</span>
#### URL
- POST /labels/:id/memos

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of label to add |
#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| memoIds | X | - | array of memo IDs |
#### Request Example
POST /labels/5afbee91141592fc9850ae38/memos

```json
{
	"memoIds": ["5afbe6a12c7caff319d454d8", "5afbe6a22c7caff319d454d9"]
}
```

#### Response
- A updated label object

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example
```json
{
    "_id": "5afbee91141592fc9850ae38",
    "updatedAt": "2018-05-16T08:44:56.916Z",
    "createdAt": "2018-05-16T08:40:49.193Z",
    "title": "titleUpdated",
    "memos": [
        {
            "_id": "5afbe6a12c7caff319d454d8",
            "updatedAt": "2018-05-16T08:07:47.688Z",
            "createdAt": "2018-05-16T08:06:57.499Z",
            "title": "memo1",
            "content": "memo1 content"
        },
        {
            "_id": "5afbe6a22c7caff319d454d9",
            "updatedAt": "2018-05-16T08:07:55.700Z",
            "createdAt": "2018-05-16T08:06:58.040Z",
            "title": "memo2",
            "content": "memo3 content"
        }
    ]
}
```

## <span id="label-remove-memos">Remove Memos</span>
#### URL
- DELETE /labels/:id/memos

#### Path variable

| Name | Description |
|--------|--------|
| ID | Id of label to remove |
#### Parameters

| Level1 | Required | Default | Description |
|--------|--------|--------|--------|
| memoIds | X | - | array of memo IDs |
#### Request Example
DELETE /labels/5afbee91141592fc9850ae38/memos

```json
{
	"memoIds": ["5afbe6a12c7caff319d454d8"]
}
```

#### Response
- A deleted label object

| Level1 | Level2 |
|--------|--------|
| _id |
| updatedAt |
| createdAt |
| title |
| memos | _id |
|| updatedAt |
|| createdAt |
|| title |
|| content |
### Response Example
```json
{
    "_id": "5afbee91141592fc9850ae38",
    "updatedAt": "2018-05-16T08:53:19.084Z",
    "createdAt": "2018-05-16T08:40:49.193Z",
    "title": "titleUpdated",
    "memos": [
        {
            "_id": "5afbe6a12c7caff319d454d8",
            "updatedAt": "2018-05-16T08:07:47.688Z",
            "createdAt": "2018-05-16T08:06:57.499Z",
            "title": "memo1",
            "content": "memo1 content"
        }
    ]
}
```
