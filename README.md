<div align="center">
  <h1>🏁 Cool Piece</h1>
  <p>면접, 스터디 및 프로젝트 동료를 구하는 멋쟁이사자처럼 프론트엔드스쿨 참여자들을 위한 서비스</p>
</div>

[서비스 바로가기](url)

## Deploy

### Client

### BackEnd
- heroku

## Install
Local 환경에서 실행 시 아래와 같은 준비가 필요합니다.

### Client
- Github 계정이 필요하며 Root 디렉토리에 .env 파일을 만들고 다음과 같이 설정합니다.
```
GITHUB_CLIENT_ID = <YOUR_GITHUB_CLIENT_ID>
GITHUB_KEY = <YOUR_GITHUB_KEY>
GITHUB_SECRET = <YOUR_GITHUB_SECRET>
```
- vscode liveServer extention이 필요합니다.
- Github development 에 계정을 등록하고 githubcallback.html을 리다이렉트 URI로 설정해주시면 됩니다.

- 설정이 끝나면 아래와 같이 실행합니다.
```
$npm install
$npm run assets
``` 후 Root/assets/html/index.html을 liveServer로 실행합니다.

### Backend
- MongoDB 계정이 필요하며 Root 디렉토리에 .env 파일을 만들고 다음과 같이 설정합니다.
```
GITHUB_CLIENT_ID = <YOUR_GITHUB_CLIENT_ID>
GITHUB_KEY = <YOUR_GITHUB_KEY>
GITHUB_SECRET = <YOUR_GITHUB_SECRET>
DB_URI = <YOUR_MONGODB_ATLAS_URL>
SECRET_KEY = <CUSTOM_JWT_SECRET_KEY>
```
- 설정이 끝나면 아래와 같이 실행합니다.
```
$npm install
$npm run dev:starts
```

## 👩‍💻 개발 인원
|이름|파트|
|:---:|:---:|
|김한별|FrontEnd, BackEnd, 팀장|
|박지윤|FrontEnd, 기획, 디자인|
|김준호|FrontEnd|

## 💻 기술 스택
HTML, CSS(SASS), JavaScript, Webpack

## 협업 방식
- 피그마를 통한 기획
- 트렐로를 통해 분업화와 현재 상황 점검 및 소통, 깃 워크 플로우를 통한 코드리뷰
- 스탠딩 미팅

## 기능
- SNS(Github) 로그인
- 네브바를 통한 필터링
- 댓글 작성, 수정, 삭제
- 스터디 검색, 생성, 수정
- 프로필 설정
- 기술별 필터링
- 관심 스터디 북마크

## 역할 분담

### 김한별
- 로그인 페이지 ui구현 및 기능
- 마이 프로필 렌더링
- 웹팩 및 초기 코드 컨벤션 스타일 설정) 
- 백엔드 api 완성

### 박지윤
- 서비스 디자인 (피그마) 
- 스터디 생성 페이지 UI 및 기능 구현 
- 스터디 수정 페이지 UI 및 기능 구현 
- 마이페이지 UI 구현 
- 스터디 상세 페이지 댓글 UI 구현

### 김준호
- 공통 레이아웃 UI 및 기능을 담당
  - 네비게이션을 구현
  - 각 페이지별 라우팅을 구현
  - 로그인을 연동한 동적 UI를 구현

- 메인페이지 UI 및 기능을 담당
  - 각 기능을 모듈화
  - 필터링 기능을 구현
  - 검색 기능을 구현
  - 새로고침을 고려한 데이터 작업을 구현
  - 모바일 및 태블릿에 대응하기 위한 반응형 UI 구현

- 로그인 기능에 참여

- 상세페이지 기능을 담당
  - 유저 정보를 고려한 렌더링
  - 댓글 기능을 구현

## 고민 지점

## 소감
