아래 **한 블록 전체** 복사해서 `API_SPEC.md`에 붙여넣으면 됩니다.

```md
# API 명세 통합본

## 공통

- 인증: `Authorization: Bearer <accessToken>`
- 인증 실패: `401` (`인증이 필요합니다.` 또는 `Authentication is required.`)

---

## 1. Auth

### POST /oauth/login

설명: OAuth 로그인

Request Body (application/json)
{
"provider": "google",
"code": "authorization-code-from-google",
"redirectUri": "https://example.com/oauth/callback",
"codeVerifier": "code-verifier-for-pkce"
}

Response 200 (application/json)
{
"tokens": {
"accessToken": "access.jwt.token",
"refreshToken": "refresh.jwt.token",
"tokenType": "bearer",
"expiresIn": 3600,
"refreshTokenExpiresIn": 604800
},
"user": {
"userId": "b7e0d7d1-2d1b-4c5b-8b0f-8c8d1a9f6b2a",
"email": "user@example.com",
"name": "Alex M.",
"profileImage": "https://example.com/profile.png"
},
"isNewUser": true
}

---

### POST /oauth/refresh

설명: Access Token 갱신

Request Body (application/json)
{
"refreshToken": "refresh.jwt.token"
}

Response 200 (application/json)
{
"tokens": {
"accessToken": "access.jwt.token",
"refreshToken": "refresh.jwt.token",
"tokenType": "bearer",
"expiresIn": 3600,
"refreshTokenExpiresIn": 604800
},
"user": {
"userId": "b7e0d7d1-2d1b-4c5b-8b0f-8c8d1a9f6b2a",
"email": "user@example.com",
"name": "Alex M.",
"profileImage": "https://example.com/profile.png"
},
"isNewUser": true
}

---

## 2. Main View

### GET /main/user

설명: 메인 사용자 정보

Response 200 (application/json)
{
"userId": "b7e0d7d1-2d1b-4c5b-8b0f-8c8d1a9f6b2a",
"name": "Alex M.",
"profileImage": "https://example.com/profile.png",
"badge": "Pro User"
}

Response 401

- 인증이 필요합니다.

---

### GET /main/notion

설명: 메인 노션 요약

Response 200 (application/json)
{
"pages": [
{
"pageId": "b7e0d7d1-2d1b-4c5b-8b0f-8c8d1a9f6b2a",
"notionPageId": "notion-page-id",
"title": "Algorithm Notes",
"url": "https://www.notion.so/...",
"isConnected": true,
"syncStatus": "OK"
}
]
}

Response 401

- 인증이 필요합니다.

---

### GET /main/question

설명: 메인 질문 요약

Response 200 (application/json)
{
"waitingQuestion": {
"questionId": "bfa357a3-c251-47ca-aed5-2ed33b99d569",
"title": "What is the time complexity here?"
},
"recentSessions": [
{
"attemptId": "0a77fe66-0dc3-443b-879b-1a9b12345678",
"questionId": "bfa357a3-c251-47ca-aed5-2ed33b99d569",
"title": "React Hooks",
"result": "PASS",
"score": 72,
"createdAt": "2026-02-03T09:10:00.000Z"
}
]
}

Response 401

- 인증이 필요합니다.

---

### GET /main/stats

설명: 메인 학습 통계

Response 200 (application/json)
{
"flashcardCount": 1240,
"retentionRate": 84
}

Response 401

- 인증이 필요합니다.

---

## 3. Notion

### POST /notion/search/pages

설명: 노션 페이지 검색(페이지 목록만)

Request Body (application/json)
{
"query": "interview",
"pageSize": 10,
"startCursor": "some-cursor"
}

Response 200 (application/json)
{
"pages": [
{
"notionPageId": "b1a2c3d4e5f6...",
"title": "면접 질문 정리",
"url": "https://www.notion.so/...",
"lastEditedTime": "2026-02-04T12:34:56.000Z"
}
]
}

Response 401

- 인증이 필요합니다.

---

### POST /notion/pages

설명: 노션 페이지 추가

Request Body (application/json)
{
"notionUrl": "https://www.notion.so/your-workspace/Page-Title-0f3c2a1b2c3d4e5f6a7b8c9d0e1f2a3b",
"notionPageId": "0f3c2a1b2c3d4e5f6a7b8c9d0e1f2a3b"
}

Response 200 (application/json)
{
"page": {
"pageId": "c0f1e2d3...",
"notionPageId": "b1a2c3d4e5f6...",
"title": "면접 질문 정리",
"url": "https://www.notion.so/...",
"isConnected": true,
"connectedAt": "2026-02-04T12:34:56.000Z"
}
}

Response 401

- 인증이 필요합니다.

---

### GET /notion/oauth/authorize

설명: Start Notion OAuth

Response 200

- Notion authorization page로 Redirect

---

## 4. Questions

### POST /questions/generate

설명: 질문 생성

Request Body (application/json)
{
"snapshotId": "snapshot-uuid",
"questionsCount": 5
}

Response 200 (application/json)
{
"questions": [
{
"questionId": "bfa357a3-c251-47ca-aed5-2ed33b99d569",
"prompt": "What is the time complexity here?"
}
]
}

Response 401

- 인증이 필요합니다.

---

### POST /questions/{questionId}/attempts

설명: 질문 풀이 제출 및 평가

Path Params

- questionId (string, required)

Request Body (application/json)
{
"answer": "HTTP methods include GET/POST/PUT/DELETE and ..."
}

Response 200 (application/json)
{
"attempt": {
"attemptId": "attempt-uuid",
"questionId": "bfa357a3-c251-47ca-aed5-2ed33b99d569",
"result": "PASS",
"score": 82,
"feedback": "Answer feedback."
}
}

Response 401

- 인증이 필요합니다.

---

## 5. Study

### POST /study/plans

설명: Create study plan

Request Body (application/json)
{
"pageId": "uuid-of-notion-page",
"days": 5,
"questionsPerDay": 7
}

Response 200 (application/json)
{
"plan": {
"planId": "plan-uuid",
"pageId": "uuid-of-notion-page",
"days": 5,
"questionsPerDay": 7,
"totalQuestions": 35,
"startsAt": "2026-02-04",
"timezone": "Asia/Seoul"
}
}

Response 401

- Authentication is required.

---

## 6. Push

### GET /push/vapid-key

설명: FCM Web VAPID 공개키 조회

Response 200 (application/json)
{
"vapidPublicKey": "BKf...publicKey"
}

---

### POST /push/tokens

설명: FCM 토큰 등록

Request Body (application/json)
{
"token": "fcm-token",
"platform": "WEB",
"device": "Chrome",
"deviceType": "ANDROID_WEB"
}

Response 200 (application/json)
{
"pushTokenId": "push-token-uuid",
"token": "fcm-token",
"platform": "WEB",
"deviceType": "ANDROID_WEB"
}

Response 401

- 인증이 필요합니다.

---

### DELETE /push/tokens

설명: FCM 토큰 삭제

Request Body (application/json)
{
"token": "fcm-token"
}

Response 200

- 삭제 완료

Response 401

- 인증이 필요합니다.

---

### GET /push/logs

설명: 내 푸시 발송 로그 조회

Query Params

- page (number, default: 1)
- pageSize (number, default: 20)

Response 200 (application/json)
{
"logs": [
{
"logId": "log-uuid",
"pushTokenId": "token-uuid",
"title": "일주일이 지났어요!",
"body": "지금 복습하면 기억이 더 오래가요.",
"status": "OK",
"errorCode": "UNREGISTERED",
"createdAt": "2026-02-06T10:00:00.000Z"
}
],
"page": 1,
"pageSize": 20,
"total": 42
}

Response 401

- 인증이 필요합니다.
```
