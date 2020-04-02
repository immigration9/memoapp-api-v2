# DramanCompany MemoApp

NodeJS, ExpressJS RESTful MemoApp API.

- 본 프로젝트는 개발 환경으로만 사용할 것

# Development Environment

해당 프로젝트는 NodeJS 12.14.1 버전에서 개발되었음.

# DB

typicode의 LowDB를 사용하여 구현되었음. [LowDB](https://github.com/typicode/lowdb)
서버 시작시 자동으로 DB 파일이 `db/db.json`로 생성된다.
데이터베이스를 초기화하고 싶을 경우, 해당 파일을 지운 뒤 서버를 재시작하면 정상적으로 초기화된다.

## DB 구조

자동 생성된 db.json 파일에는 `labels` / `memos` / `labelsToMemos` 항목이 생성된다.
label과 관련된 항목들은 `labels`에 기록되고, memo와 관련된 항목들은 `memos`에 기록된다.
label과 memo의 관계(relation 항목)는 `labelsToMemos`에 추가된다.

# API

yarn을 사용하여 dependency를 설치한 뒤 서버를 시작해주면 된다.

```bash
yarn
PORT=8080 yarn start
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

- 레이블 리스트 전체

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
  "data": [
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
}
```

### Error Response

- 500

### Error Response Example

```json
{
  "details": "Unable to retrieve data from server"
}
```

## <span id="label-create">Create</span>

### Summary

새로운 레이블을 생성한다

### URL

- POST /labels

### Parameters

### Request Body

| Level1 | Required | Default | Description |
| ------ | -------- | ------- | ----------- |
| title  | O        | -       | label title |

### Request Example

POST /labels

```json
{
  "title": "titleExample"
}
```

### Response

- 새롭게 생성된 레이블 정보

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
  "data": {
    "title": "title_02",
    "id": "x36LYo-9",
    "createdAt": "2020-03-02T22:36:55.011Z",
    "updatedAt": "2020-03-02T22:36:55.011Z",
    "memoCount": 0
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "must provide a valid title"
}
```

## <span id="label-get">Get</span>

### Summary

특정 레이블 정보를 가져온다

### URL

- GET /labels/:id

### Parameters

#### Path variable

| Name | Description |
| ---- | ----------- |
| id   | label id    |

### Request Example

GET /labels/x36LYo-9

### Response

- 특정 id값에 해당하는 레이블 정보

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
  "data": {
    "title": "title_02",
    "id": "x36LYo-9",
    "createdAt": "2020-03-02T22:36:55.011Z",
    "updatedAt": "2020-03-02T22:36:55.011Z",
    "memoCount": 5
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "invalid label id"
}
```

## <span id="label-update">Update</span>

### Summary

특정 레이블 정보를 수정한다

### URL

- PUT /labels/:id

### Parameters

#### Path variable

| Name | Description                |
| ---- | -------------------------- |
| id   | 수정하고자 하는 label의 id |

### Request Body

| Level1 | Required | Default | Description |
| ------ | -------- | ------- | ----------- |
| title  | X        | -       | label title |

### Request Example

PUT /labels/x36LYo-9

```json
{
  "title": "title_02_fixed"
}
```

### Response

- 업데이트 된 레이블

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
  "data": {
    "title": "title_02_fixed",
    "id": "x36LYo-9",
    "createdAt": "2020-03-02T22:36:55.011Z",
    "updatedAt": "2020-03-02T22:44:43.653Z",
    "memoCount": 0
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated label"
}
```

## <span id="label-delete">Delete</span>

### Summary

특정 레이블을 삭제한다.
다른 메모와 연결되어 있는 경우, 해당 연결 정보도 삭제한다.

### URL

- DELETE /labels/:id

### Parameters

#### Path variable

| Name | Description              |
| ---- | ------------------------ |
| id   | 지우고자 하는 label의 id |

### Request Example

DELETE /labels/x36LYo-9

### Response

- 삭제된 해당 레이블

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |

### Response Example

```json
{
  "data": {
    "title": "title_02_fixed",
    "id": "x36LYo-9",
    "createdAt": "2020-03-02T22:36:55.011Z",
    "updatedAt": "2020-03-02T22:44:43.653Z"
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated label"
}
```

# <span id="memo">Memo</span>

## <span id="memo-list">List</span>

### Summary

전체 메모를 가져온다

### URL

- GET /memos

### Query Parameters

| Name      | Default | Description                           |
| --------- | ------- | ------------------------------------- |
| countOnly | false   | true로 설정시 전체 메모 수만 가져온다 |

### Request Example

GET /memos

### Response

- 전체 메모 리스트

| Level1    |
| --------- |
| id        |
| updatedAt |
| createdAt |
| title     |
| content   |

### Response Example

- GET /memos?countOnly=false

```json
{
  "data": [
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
}
```

### Error Response

- 500

### Error Response Example

```json
{
  "details": "Unable to retrieve data from server"
}
```

## <span id="memo-create">Create</span>

### Summary

새로운 메모를 생성한다

#### URL

- POST /memos

#### Parameters

| Level1  | Required | Default | Description  |
| ------- | -------- | ------- | ------------ |
| title   | O        | -       | memo title   |
| content | X        | ""      | memo content |

### Request Example

POST /memos

```json
{
  "title": "memo_01",
  "content": "memo_01_content"
}
```

### Response

- 새롭게 생성된 메모

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

### Error Response

- 400

### Error Response Example

```json
{
  "details": "must provide a valid title"
}
```

## <span id="memo-get">Get</span>

### Summary

특정 메모 정보를 가져온다

### URL

- GET /memos/:id

### Parameters

#### Path variable

| Name | Description |
| ---- | ----------- |
| id   | memo id     |

### Request Example

GET /memos/cYdCczSy

### Response

- 특정 id값에 해당하는 메모 정보

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

### Error Response

- 400

### Error Response Example

```json
{
  "details": "invalid memo id"
}
```

## <span id="memo-update">Update</span>

### Summary

특정 메모 정보를 수정한다

#### URL

- PUT /memos/:id

### Parameters

#### Path variable

| Name | Description               |
| ---- | ------------------------- |
| id   | 수정하고자 하는 memo의 id |

### Request Body

| Level1  | Required | Default | Description  |
| ------- | -------- | ------- | ------------ |
| title   | X        | -       | memo title   |
| content | X        | -       | memo content |

### Request Example

PUT /memos/cYdCczSy

```json
{
  "title": "memo_01_fixed",
  "content": "memo_01_content_fixed"
}
```

### Response

- 업데이트된 메모 정보

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

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated memo"
}
```

## <span id="memo-delete">Delete</span>

### Summary

특정 메모를 삭제한다.
다른 레이블과 연결되어 있는 경우, 해당 연결 정보도 삭제한다.

#### URL

- DELETE /memos/:id

### Parameters

#### Path variable

| Name | Description             |
| ---- | ----------------------- |
| id   | 지우고자 하는 memo의 id |

### Request Example

DELETE /memos/cYdCczSy

### Response

- 없음

### Response Example

```json
{}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated memo"
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
| id   | label id    |

### Request Example

GET /labels/z88EVleY/memos

### Response

- 해당 레이블에 등록되어 있는 메모 리스트

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
  "data": [
    {
      "title": "memo_01",
      "content": "memo_01_content",
      "id": "qhnb909u",
      "createdAt": "2020-03-02T00:49:06.408Z",
      "updatedAt": "2020-03-02T00:49:06.408Z"
    },
    {
      "title": "memo_02",
      "content": "memo_02_content",
      "id": "x_Uuv-D-",
      "createdAt": "2020-03-02T00:49:19.917Z",
      "updatedAt": "2020-03-02T00:49:19.917Z"
    }
  ]
}
```

### Error Response

- 400
- 500

### Error Response Example

- 400

```json
{
  "details": "unable to find designated label"
}
```

- 500

```json
{
  "details": "Unable to retrieve data from server"
}
```

## <span id="relation-label-by-memo">Get Labels by Memo</span>

### Summary

Memo id 값으로 해당 memo에 등록되어 있는 label들을 가져온다.

### URL

- GET /memos/:id/labels

### Parameters

#### Path Variable

| Name | Description |
| ---- | ----------- |
| id   | memo id     |

### Request Example

GET /memos/qhnb909u/labels

### Response

- label 객체들의 배열

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
  "data": [
    {
      "title": "label_01_fixed",
      "id": "z88EVleY",
      "createdAt": "2020-03-02T00:46:17.247Z",
      "updatedAt": "2020-03-02T00:48:13.956Z",
      "memoCount": 5
    },
    {
      "title": "label_02",
      "id": "N_7_c9Tn",
      "createdAt": "2020-03-02T00:46:31.531Z",
      "updatedAt": "2020-03-02T00:46:31.531Z",
      "memoCount": 3
    }
  ]
}
```

### Error Response

- 400
- 500

### Error Response Example

- 400

```json
{
  "details": "unable to find designated memo"
}
```

- 500

```json
{
  "details": "Unable to retrieve data from server"
}
```

## <span id="relation-add-memos">Add Memos to Label</span>

### Summary

Label에 memo들을 등록한다.

### URL

- POST /labels/:id/memos

#### Path variable

| Name | Description              |
| ---- | ------------------------ |
| id   | memo가 추가될 label의 id |

#### Parameters

| Level1  | Required | Default | Description  |
| ------- | -------- | ------- | ------------ |
| memoIds | X        | -       | memo id 배열 |

### Request Example

POST /labels/jSxmk9ae/memos

```json
{
  "memoIds": ["qhnb909u", "x_Uuv-D-"]
}
```

### Response

- 메모가 추가된 레이블 정보

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
  "data": {
    "title": "label_01_fixed",
    "id": "z88EVleY",
    "createdAt": "2020-03-02T00:46:17.247Z",
    "updatedAt": "2020-03-02T00:48:13.956Z",
    "memoCount": 2
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated label"
}
```

## <span id="relation-remove-memos">Remove Memos from Label</span>

### Summary

Label에 등록되어 있는 memo들을 삭제한다.

### URL

- POST /labels/:id/memos/delete

#### Path variable

| Name | Description              |
| ---- | ------------------------ |
| ID   | memo들을 제거할 label id |

#### Parameters

| Level1  | Required | Default | Description  |
| ------- | -------- | ------- | ------------ |
| memoIds | X        | -       | memo id 배열 |

### Request Example

POST /labels/z88EVleY/memos/delete

```json
{
  "memoIds": ["qhnb909u"]
}
```

### Response

- 메모가 삭제된 레이블 정보

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
  "data": {
    "title": "label_01_fixed",
    "id": "z88EVleY",
    "createdAt": "2020-03-02T00:46:17.247Z",
    "updatedAt": "2020-03-02T00:48:13.956Z",
    "memoCount": 0
  }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "unable to find designated label"
}
```
