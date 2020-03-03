# DramanCompany MemoApp

NodeJS, ExpressJS RESTful MemoApp API.

Please note that the application is _NOT_ designed to carefully take exceptions into account.

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

## [Label](#label)

- [List](#label-list)
- [Get](#label-get)
- [Create](#label-create)
- [Update](#label-update)
- [Delete](#label-delete)

## [Memo](#memo)

- [List](#memo-list)
- [Get](#memo-get)
- [Create](#memo-create)
- [Update](#memo-update)
- [Delete](#memo-delete)

## [Relation](#relation)

- [Get Memos by Label](#relation-memo-by-label)
- [Get Labels by Memo](#relation-label-by-memo)
- [Add Memos to Label](#relation-add-memos)
- [Remove Memos from Label](#relation-remove-memos)

# <span id="label">Label</span>

## <span id="label-list">List</span>

### Summary

전체 레이블 리스트를 가져온다

### URL

- GET /labels

### Request Example

GET /labels

### Response

- A list of all label objects

| Level1    |
| --------- |
| id        |
| title     |
| updatedAt |
| createdAt |
| memoCount |

### Response Example

```json
[
  {
    "title": "title_01",
    "id": "FGj06YRO",
    "createdAt": "2020-03-02T22:34:15.139Z",
    "updatedAt": "2020-03-02T22:34:15.139Z",
    "memoCount": 5
  },
  {
    "title": "title_02",
    "id": "x36LYo-9",
    "createdAt": "2020-03-02T22:36:55.011Z",
    "updatedAt": "2020-03-02T22:36:55.011Z",
    "memoCount": 3
  }
]
```

## <span id="label-create">Create</span>

### Summary

새로운 레이블을 생성한다

### URL

- POST /labels

### Parameters

#### Request Body

| Level1  | Required | Default      | Description      |
| ------- | -------- | ------------ | ---------------- |
| title   | O        | -            | Title of label   |
| content | X        | empty string | Content of label |

### Request Example

POST /labels

```json
{
  "title": "titleExample"
}
```

### Response

- A newly created label object

| Level1    |
| --------- |
| id        |
| title     |
| updatedAt |
| createdAt |
| memoCount |

### Response Example

```json
{
  "title": "title_02",
  "id": "x36LYo-9",
  "createdAt": "2020-03-02T22:36:55.011Z",
  "updatedAt": "2020-03-02T22:36:55.011Z",
  "memoCount": 0
}
```

## <span id="label-get">Get</span>

### Summary

특정 레이블 정보를 가져온다

### URL

- GET /labels/:id

### Parameters

#### Path variable

| Name | Description         |
| ---- | ------------------- |
| id   | Id of labels to get |

### Request Example

GET /labels/x36LYo-9

### Response

- A requested label object matched to a given ID

| Level1    |
| --------- |
| id        |
| title     |
| updatedAt |
| createdAt |
| memoCount |

### Response Example

```json
{
  "title": "title_02",
  "id": "x36LYo-9",
  "createdAt": "2020-03-02T22:36:55.011Z",
  "updatedAt": "2020-03-02T22:36:55.011Z",
  "memoCount": 5
}
```

## <span id="label-update">Update</span>

### Summary

특정 레이블 정보를 수정한다

### URL

- PUT /labels/:id

### Parameters

#### Path variable

| Name | Description           |
| ---- | --------------------- |
| id   | Id of label to update |

#### Request Body

| Level1 | Required | Default | Description    |
| ------ | -------- | ------- | -------------- |
| title  | X        | -       | title of label |

### Request Example

PUT /labels/x36LYo-9

```json
{
  "title": "title_02_fixed"
}
```

### Response

- A updated label object

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| memoCount |

### Response Example

```json
{
  "title": "title_02_fixed",
  "id": "x36LYo-9",
  "createdAt": "2020-03-02T22:36:55.011Z",
  "updatedAt": "2020-03-02T22:44:43.653Z",
  "memoCount": 0
}
```

## <span id="label-delete">Delete</span>

### Summary

특정 레이블을 삭제한다

### URL

- DELETE /labels/:id

### Parameters

#### Path variable

| Name | Description           |
| ---- | --------------------- |
| id   | Id of label to remove |

#### Request Example

DELETE /labels/x36LYo-9

#### Response

- A deleted label object

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |

### Response Example

```json
{
  "title": "title_02_fixed",
  "id": "x36LYo-9",
  "createdAt": "2020-03-02T22:36:55.011Z",
  "updatedAt": "2020-03-02T22:44:43.653Z"
}
```

# <span id="memo">Memo</span>

## <span id="memo-list">List</span>

### Summary

전체 메모를 가져온다

### URL

- GET /memos

### Request Example

GET /memos

### Response

- A list of all memo objects

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

```json
[
  {
    "title": "memo_01",
    "content": "memo_01_content",
    "id": "uw6GPLgl",
    "createdAt": "2020-03-02T22:58:43.694Z",
    "updatedAt": "2020-03-02T22:58:43.694Z"
  },
  {
    "title": "memo_02",
    "content": "memo_02_content",
    "id": "bYE0BjHs",
    "createdAt": "2020-03-02T22:58:48.135Z",
    "updatedAt": "2020-03-02T22:58:48.135Z"
  }
]
```

## <span id="memo-create">Create</span>

### Summary

새로운 메모를 생성한다

#### URL

- POST /memos

#### Parameters

| Level1  | Required | Default      | Description     |
| ------- | -------- | ------------ | --------------- |
| title   | O        | -            | Title of memo   |
| content | X        | empty string | content of memo |

#### Request Example

POST /memos

```json
{
  "title": "memo_01",
  "content": "memo_01_content"
}
```

#### Response

- A newly created memo object

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

```json
{
  "title": "memo_01",
  "content": "memo_01_content",
  "id": "cYdCczSy",
  "createdAt": "2020-03-03T00:08:21.065Z",
  "updatedAt": "2020-03-03T00:08:21.065Z"
}
```

## <span id="memo-get">Get</span>

### Summary

특정 메모 정보를 가져온다

### URL

- GET /memos/:id

### Parameters

#### Path variable

| Name | Description       |
| ---- | ----------------- |
| id   | Id of memo to get |

### Request Example

GET /memos/cYdCczSy

### Response

- A requested memo object matched to a given ID

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

```json
{
  "title": "memo_01",
  "content": "memo_01_content",
  "id": "cYdCczSy",
  "createdAt": "2020-03-03T00:08:21.065Z",
  "updatedAt": "2020-03-03T00:08:21.065Z"
}
```

## <span id="memo-update">Update</span>

### Summary

특정 메모 정보를 수정한다

#### URL

- PUT /memos/:id

### Parameters

#### Path variable

| Name | Description          |
| ---- | -------------------- |
| id   | Id of memo to delete |

#### Request Body

| Level1  | Required | Default | Description     |
| ------- | -------- | ------- | --------------- |
| title   | X        | -       | title of memo   |
| content | X        | -       | content of memo |

### Request Example

PUT /memos/cYdCczSy

```json
{
  "title": "memo_01_fixed",
  "content": "memo_01_content_fixed"
}
```

### Response

- A updated memo object

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

```json
{
  "id": "cYdCczSy",
  "title": "memo_01_fixed",
  "content": "memo_01_content_fixed",
  "createdAt": "2020-03-03T00:08:21.065Z",
  "updatedAt": "2020-03-03T00:43:35.220Z"
}
```

## <span id="memo-delete">Delete</span>

### Summary

특정 메모를 삭제한다

#### URL

- DELETE /memos/:id

### Parameters

#### Path variable

| Name | Description          |
| ---- | -------------------- |
| id   | Id of memo to remove |

#### Request Example

DELETE /memos/cYdCczSy

#### Response

- A deleted memo object

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

```json
{
  "title": "memo_01_fixed",
  "content": "memo_01_content_fixed",
  "id": "cYdCczSy",
  "createdAt": "2020-03-03T00:08:21.065Z",
  "updatedAt": "2020-03-03T00:43:35.220Z"
}
```

# <span id="relation">Relation</span>

## <span id="relation-memo-by-label">Get Memos by Label</span>

### Summary

Label id 값으로 해당 label에 등록되어 있는 memo들을 가져온다.

### URL

- GET /labels/:id/memos

### Parameters

#### Path Variable

| Name | Description |
| ---- | ----------- |
| id   | Id of label |

### Request Example

### Response

### Response Example

## <span id="relation-label-by-memo">Get Labels by Memo</span>

### Summary

Memo id 값으로 해당 memo에 등록되어 있는 label들을 가져온다.

### URL

- GET /memos/:id/labels

### Parameters

#### Path Variable

| Name | Description |
| ---- | ----------- |
| id   | Id of memo  |

### Request Example

### Response

### Response Example

## <span id="relation-add-memos">Add Memos to Label</span>

### Summary

Label에 memo들을 등록한다.

### URL

- POST /labels/:id/memos

#### Path variable

| Name | Description                 |
| ---- | --------------------------- |
| id   | Id of label to add memos to |

#### Parameters

| Level1  | Required | Default | Description       |
| ------- | -------- | ------- | ----------------- |
| memoIds | X        | -       | array of memo IDs |

#### Request Example

POST /labels/jSxmk9ae/memos

```json
{
  "memoIds": ["qhnb909u", "x_Uuv-D-"]
}
```

#### Response

- A updated label object

| Level1    | Level2    |
| --------- | --------- |
| \_id      |
| updatedAt |
| createdAt |
| title     |
| memos     | \_id      |
|           | updatedAt |
|           | createdAt |
|           | title     |
|           | content   |

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

## <span id="relation-remove-memos">Remove Memos</span>

#### URL

- DELETE /labels/:id/memos

#### Path variable

| Name | Description           |
| ---- | --------------------- |
| ID   | Id of label to remove |

#### Parameters

| Level1  | Required | Default | Description       |
| ------- | -------- | ------- | ----------------- |
| memoIds | X        | -       | array of memo IDs |

#### Request Example

DELETE /labels/5afbee91141592fc9850ae38/memos

```json
{
  "memoIds": ["5afbe6a12c7caff319d454d8"]
}
```

#### Response

- A deleted label object

| Level1    | Level2    |
| --------- | --------- |
| \_id      |
| updatedAt |
| createdAt |
| title     |
| memos     | \_id      |
|           | updatedAt |
|           | createdAt |
|           | title     |
|           | content   |

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
