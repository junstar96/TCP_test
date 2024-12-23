# 서버를 사용하는 게임을 만들어 보도록 하자.
 > 목표 : 먼저 플랫포머 게임을 서버와 데이터베이스를 연동시킬 수 있도록 해보자.


### 알아둬야 할 것
1. query를 통해서 버전을 보내면 버전 체크를 할 수 있다.
2. 기본적으로 실행되는 내부 이벤트(connect, disconnect 등)은 emit이 없어도 발생한다.

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

1. [x] 스테이지 구분
2. [x] 스테이지에 따른 점수 획득 구분
3. [x] 아이템 획득 시 점수 획득
4. [x] 스테이지 별 아이템 생성 구분
5. [x] 아이템 별 획득 점수 구분

# 도전 기능

1. [x] 브로드캐스팅 기능
2. [x] 가장 높은 점수 record 관리
3. [x] 유저 정보 연결
4. [x] Redis 연동, 게임 정보 저장

## 코드의 흐름

app.js(기본적으로 서버 코드가 있는 곳) => socket.js(서버를 붙이고 연결을 확인함.) 

### 각각의 코드 명세서

##### 서버측 폴더

|이름|파일의 기능|
|----|----|
|handler|클라이언트로 명령을 보내는 파일들을 모은 폴더|
|init|기본 설정을 하는 스크립트를 모은 폴더|
|models|게임 내의 로직을 처리하는 파일들을 모은 폴더|

##### 서버측 파일

|이름|파일의 기능|
|----|----|
|app.js|서버의 시작 지점|
|constants.js|허용되는 버전들의 리스트를 담은 파일|
|socket.js|서버를 등록하고 register.handler를 호출하는 파일|
|register.hander.js|클라이언트 측의 emit을 받아서 넘기는 파일|
|asset.js|assets 폴더의 json으로 이루어진 데이터들을 불러와 확인하는 파일. 여긴 나중에 redis와 연동될 때 변경될 수 있다.|
|helper.js|가장 중요한 곳, 여기서 클라이언트가 보낸 데이터를 기반으로 각각의 핸들러들과 이어주고(리턴 값 json을 받아 와서) 클라이언트에 보내준다.|
|gamestart.handler.js|게임 시작과 종료를 여기서 처리한다.|
|stage.handler.js|스테이지 관련을 여기서 처리한다.|
|update.handler.js|유저의 점수 관련, 그 외 유저와 관련된 걸 여기서 처리한다.|
|handlerMapping.js|이벤트 핸들을 담고 있다.|
|user.model.js|stage 정보 말고 user의 정보를 관리하며 유저를 추가하거나 랭킹 관리 등을 맡는다.|
|redisConnect.js|redis에 연결되는 작업을 하고 서버가 시작할 때 테이블을 불러오는 작업을 한다. 나중에 여길 더 손 볼 수도 있다.|

##### 클라이언트측 폴더

|이름|파일의 기능|
|----|----|
|handler|서버와 통신할 handle들을 넣어 놓은 폴더, socket.js는 |
|image|게임 내 에셋들을 담는 곳|



##### 클라이언트 측 파일

|이름|파일의 기능|
|----|----|
|clientMapping.js|handle을 담고 있음.|
|change.handler.js|스테이지가 전환되는 함수(id 1)와 랭킹을 갱신하는 코드(id 2)를 가지고 있음.|
|connect.handler.js|브로드캐스트 확인용(id 0), 게임 시작(id 101), 게임 종료(id 102)|
|score.js|스코어를 관리한다. 현재는 게임이 시작될 때 index 쪽에서 생성되어 싱글톤으로 관리된다.|
|index.js|게임의 핵심 파일, 이 안에서 게임루프가 돌아간다.|
|Cactus.js, Ground.js, Item.js,Player.js|게임 로직, 손은 거의 안 댔다.|


