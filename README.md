# 서버를 사용하는 게임을 만들어 보도록 하자.
 > 목표 : 먼저 플랫포머 게임을 서버와 데이터베이스를 연동시킬 수 있도록 해보자.

## 기획

패킷 구조(임시)

#### 공통 부분

|필드 명|타입|설명|
|---|---|---|
|handlerID|int|요청을 처리할 서버 핸들러의 ID|
|userID|int|요청을 보내는 유저의 ID|
|clientVersion|string|현재 클라이언트 버전|
|payload|json|요청 내용|

#### payloadList


|상황|payload|
|---|---|
|최초 접속|{}|
|스테이지 이동|{currentStage : int, targetStage : int}|
|아이템 획득|{itemId : int}|
|게임 시작|{timestamp : Date.now()}|
|게임 종료|{timestamp : Date.now(), score : int}|

# 필수 기능

1. 스테이지 구분
2. 스테이지에 따른 점수 획득 구분
3. 아이템 획득 시 점수 획득
4. 스테이지 별 아이템 생성 구분
5. 아이템 별 획득 점수 구분

# 도전 기능

1. 브로드캐스팅 기능
2. 가장 높은 점수 record 관리
3. 유저 정보 연결
4. Redis 연동, 게임 정보 저장