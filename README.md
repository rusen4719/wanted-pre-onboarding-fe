## 원티드 프리온보딩 사전 과제 

### 프로젝트의 실행 방법
- npm start


### 데모영상

##### 회원가입
![ezgif com-gif-maker](https://user-images.githubusercontent.com/53455328/186128879-78b64599-8c4b-4961-a17d-d62ed65f607a.gif)
- 페이지 안에 이메일, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성
- 로그인, 회원가입을 별도의 경로로 분리
- 이메일 조건('@' 포함), 비밀번호 조건(8자이상)
- 입력된 이메일과 비밀번호가 조건을 만족할 경우 버튼 활성화

##### 로그인
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/53455328/186129461-3a896674-d17e-4d66-9bf1-75a88a226a0a.gif)
- 로그인 성공시 응답받은 JWT를 로컬 스토리지에 저장
- ![image](https://user-images.githubusercontent.com/53455328/186133481-5c0d9ba4-4e4b-4239-a432-dfe1c9465458.png)

##### Create-TodoList
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/53455328/186130272-ec2d2b8a-f929-4413-8e49-2c8415bc25ce.gif)
- 리스트 페이지에 입력창과 추가 버튼이 있고, 버튼을 누르면 투두 리스트가 추가됨
- 버튼 클릭 뿐 아니라 엔터키 입력시 투두 리스트 추가됨

##### Update, Delete-TodoList 
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/53455328/186131211-c998ad8f-f52a-400f-a518-123fb794e7bd.gif)
- 수정 버튼과 삭제 버튼이 존재하며 개별적으로 리스트의 내용을 수정 또는 삭제 가능

#### 로그인 여부에 따른 리다이렉트 처리
1. 로그인한 상태에서 로그인 화면으로 넘어가려고 할 경우
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/53455328/186132215-c6041bf5-9143-4471-b2aa-47e06d6b49cf.gif)
  - 로컬 스토리지에 토큰이 있는 상태로 / 페이지에 접속한다면 /todo로 리다이렉트

2. 로그아웃한 상태에서 /todo 화면으로 넘어가려고 할 경우
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/53455328/186132806-1baf1b9d-1f5c-4bbd-bf68-6ae06f55e6ca.gif)
  - 로컬 스토리지에 토큰이 없는 상태로 /todo 페이지에 접속한다면 / 로 리다이렉트

