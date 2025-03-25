#  <img src="public/favicon.png" width="30px">  SNACK

![main](https://github.com/user-attachments/assets/36ce865b-5dd3-4efe-a67d-d57d2cdcc4f8)


<br>

## 프로젝트 소개

- 다양한 엔터테인먼트 콘텐츠를 한가지 플랫폼에서 
어디서든 쉽게 간식처럼 사용자들이 간편하게 이용할 수는 플랫폼
- 영화, 드라마뿐만 아니라 애니메이션과 웹툰도 즐길수 있습니다.



<br>

## 팀원 구성 및 역할

<div align="center">

![group](https://github.com/user-attachments/assets/c72fc2df-3eb5-4848-90a6-959a9f47c80c)


</div>

<br>

## 개발 환경

- Front : HTML, React, JS, Redux, Redux toolkit, Axios
- 버전 및 이슈관리 : Github
- 활용한 OpenAPI : 카카오맵 API
- 협업 툴 : Github, Notion
- 데이터 서버 : JSON Web Server
  - 이 프로젝트에서는 JSON Server를 데이터베이스처럼 사용하여 간단하게 REST API를 구축합니다. 이를 통해 실제 백엔드 서버 없이도 데이터 요청 및 응답을 테스트할 수 있습니다.
<br>



<br>

## 프로젝트 구조

```
├── README.md
├── package.json
├── .gitignore
├── public
     ├── favicon.png
     └── images
├── src
     ├── api
     ├── components
     ├── css
     ├── db
          └── db.json
     ├── layout
     ├── pages
     ├── router
     └── slice
     └── App.js
```

<br>

## 🌐 프로젝트 라우팅 구조
이 프로젝트에서는 `react-router-dom`을 사용하여 클라이언트 측 라우팅을 구성했습니다.
라우터는 `createBrowserRouter`를 사용하여 설정되었으며, `Suspense`를 활용해 **코드 스플리팅(지연 로딩)**을 적용했습니다.

### 🚀 주요 특징

1. **레이아웃 기반의 라우팅**

    - `DefaultLayout`을 기본 레이아웃으로 사용하여 여러 페이지를 관리합니다.

    - `AdminLayout`, `SignInLayout` 등 **각 기능별로 레이아웃**을 분리하여 유지보수성을 높였습니다.

2. **코드 스플리팅 적용**

    - `React.lazy`와 `Suspense`를 활용하여 각 페이지 컴포넌트를 **지연 로딩**하도록 설정했습니다.

    - `fallback={Loading}`을 설정하여 페이지 로딩 중에는 `"Loading..."` 메시지가 표시됩니다.

3. **중첩 라우팅 (Nested Routes)**

    - 기본 레이아웃(`DefaultLayout`) 안에서 `children` 속성을 통해 다양한 페이지를 관리합니다.

    - 예를 들어, `/` 경로는 `Main3` 페이지를 로드하고, `/webtoon`은 `WebtoonIndexPage`를 로드합니다.

4. **동적 라우팅 지원**

    - `/paymentDetail/:id`와 같이 **동적 URL 파라미터**를 사용할 수 있도록 설정했습니다.

    - 특정 결제 내역을 조회할 때 `id` 값을 동적으로 받아와 데이터를 로드할 수 있습니다.

<br>

## 데이터베이스
### 상품과 주문처정보, 결제정보, 회원정보로 구성

```
{
  "allItems":[],
  "members":[],
  "payments":[],
  "shopList":[],
}  
```

<br>

## 주요 기능

### 🙎‍♂️ 로그인, 회원가입

<details>
<summary>회원가입</summary>

<br>
  
- 플랫폼 접속 시 우측 상단에 있는 회원가입을 할 수 있습니다.
- 이메일, 비밀번호, 주소, 이름, 전화번호를 입력합니다.
- 입력 정보는 `ustState`로 관리하며, 회원가입 시 데이터를 `axios`를 통해 가상 서버로 보내게 됩니다.
- 회원가입시 **이메일 중복 체크**를 진행합니다.

![image](https://github.com/user-attachments/assets/2197c400-487f-4f0b-ad19-ee31f522a1b9)


</details>

<details>
<summary>로그인</summary>

<br>
    
- 이메일과 비밀번호를 입력해 로그인합니다.
- 로그인 정보와 가상 서버의 회원정보를 비교해 일치할 시 로그인을 진행합니다.
- `Redux slice`를 이용해 로그인Slice를 만들어 로그인 상태를 유지합니다.

![image](https://github.com/user-attachments/assets/e2d0a61c-934a-434f-b127-38b870873f23)


</details>

<br>

### 🙎‍♂️ 회원 개인페이지

<details>
<summary>일반 회원</summary>

<br>
  
- 자신의 정보를 확인할 수 있고, 수정 및 프로필 이미지 추가,변경을 할 수 있습니다.
- 나의 게시글,댓글,리뷰를 볼 수 있고 구매한 상품내역을 확인할 수 있습니다.
- 각각 컴포넌트를 만들어 관리되고, 왼쪽에 li를 클릭 시 렌더링 되도록 useEfect를 활용해 구현했습니다.

![Image](https://github.com/user-attachments/assets/c8320f43-79cf-4059-a570-d16451d73cae)

</details>

<details>
<summary>멘토 회원</summary>

<br>
  
- 일반 회원과 마찬가지로 개인정보를 수정할 수 있습니다.
- 멘토 회원은 구매내역 대신 내가 등록한 상품과 상품등록을 확인할 수 있습니다.

![Image](https://github.com/user-attachments/assets/f90a1582-fabb-4d90-8794-9ddda0665d6e)

</details>

<br>

### 🛒 상품, 장바구니

<details>
<summary>상품페이지</summary>

<br>
   
- 멘토회원이 등록한 상품을 볼 수 있으며 가격과 카테고리를 확인할 수 있습니다.
- 원하는 상품을 장바구니에 담을 수 있고, 장바구니에 담을 시 데이터베이스에 장바구니정보를 저장합니다.
- Redux slice를 이용해 백엔드 서버에서 장바구니 정보를 가져오고 아이템 선택,전체삭제를 할 수 있습니다.

![Image](https://github.com/user-attachments/assets/fef0e087-9542-4f1c-8555-6e689f9df0d5)

</details>
<br>

### 💰 결제, 카카오페이

<details>
<summary>결제</summary>

<br>
   
- 결제페이지는 총 3단계로 나뉘어 있으며, 각 단계별 컴포넌트로 구분하여 관리했습니다.
- useState로 단계별 상태를 관리해 각 단계로 이동할 수 있고, 주문자의 정보확인, 결제방법 선택, 결제완료로 구분됩니다.
- 결제정보는 데이터베이스에 저장되며, 결제 성공 시 장바구니 데이터와, 장바구니 Slice 아이템이 삭제됩니다.

![Image](https://github.com/user-attachments/assets/d996af72-08a5-4d9f-aea6-fbe6f6cac506)

</details>

<details>
<summary>카카오페이</summary>

<br>
   
- 2단계에서 카카오페이를 선택할 시 카카오페이 API에서 제공하는 결제페이지로 이동한 후, 모바일로 결제를 진행합니다.
- 결제방법이 카카오페이로 데이터베이스에 저장되며, 마찬가지로 장바구니 데이터를 삭제합니다.

![Image](https://github.com/user-attachments/assets/911dce44-bf79-42f2-a2dd-b4e2816fc498)

</details>

<details>
<summary>결제내역 페이지</summary>

<br>
   
- 결제내역 페이지에서는 결제한 목록들을 볼 수 있고, 결제 수단별, 시간별 정렬기능을 구현했습니다.
<br>
- 밑에 영상은 결제 기능의 풀영상입니다. 

![Image](https://github.com/user-attachments/assets/2021c2ce-a856-44ae-8396-56c730f2b97b)

</details>

<br>

### 📋 게시판

<details>
<summary>게시판</summary>

<br>
   
- 왼쪽 프로필 영역은 로그인시 저장된 쿠키를 가져와서 로그인 상태를 구분해 구현했습니다.
- 게시글 목록은 페이지으로 구현되어있습니다.
- 모든 회원이 작성한 게시글을 볼 수 있으며, 작성된 글의 카테고리별 정렬기능을 통해 볼 수 있습니다.
- 게시글 수정과 삭제는 내가 작성한 글만 가능하고, 게시글 작성 시 카테고리 선택을 모달창 형식으로 나타내 모달창의 상태를 useState로 관리합니다.

<br>
- 게시글 작성
  
![Image](https://github.com/user-attachments/assets/7a44d0d6-e201-4fa2-abbd-fb89a5b5da9b)

<br>
- 게시글 열람

![Image](https://github.com/user-attachments/assets/40e0e84e-4074-476e-96c5-8a1f71d05b3c)

</details>

<details>
<summary>댓글</summary>

<br>
   
- 게시판과 마찬가지로 댓글의 수정,삭제도 본인의 글만 가능합니다.
- 댓글 목록을 페이징으로 구현하여 사용자가 보기 편리하게 구현했습니다.

![Image](https://github.com/user-attachments/assets/c043590e-1bf2-4ad2-8cc1-796553f53b6d)

</details>
<br>

### 🤖 챗봇, KOMORAN

<details>
<summary>챗봇</summary>

<br>
   
- 코모란 형태소 분석기를 활용하여 사용자가 검색한 키워드를 확인 후 데이터를 제공합니다.
- 일반 페이지의 레이아웃 위에 나타납니다.

![Image](https://github.com/user-attachments/assets/34204640-6cdf-458a-a439-2ddc387108cf)

</details>
<br>

### 🛠️ 관리자페이지

<details>
<summary>관리자 페이지</summary>

<br>

- 일반 페이지와 구분되도록 레이아웃을 변경해 헤더대신 왼쪽 메뉴바가 나타납니다
- 관리자 페이지는 회원,상품,결제 등 항목별로 페이지로 나뉘고 왼쪽에 메뉴를 클릭 시 각 페이지가 렌더링됩니다.
- 각 페이지는 목록이 페이징으로 구현되었고, 기본적인 CRUD가 전부 가능합니다.

![Image](https://github.com/user-attachments/assets/d8d19f7f-cce5-489d-aafc-d642150a486e)

</details>
<br>

### 💡 추가 활용한 Open API

<details>
<summary>카카오맵 API</summary>

<br>
   
- 고객센터 페이지를 만들어 회사위치와 전화번호를 확인할 수 있고 지도와 마커를 구현했습니다.

![Image](https://github.com/user-attachments/assets/c5d1ec7a-f7b5-45d5-be6f-7a2b73f1db4a)

</details>

<details>
<summary>고용24 API</summary>

<br>
   
- 고용24 API를 이용해 공채속보 데이터를 가져오고, xml형식의 데이터를 xmlMapper를 통해 json으로 변환 후 React 프론트 페이지에서 공채속보를 열람할 수 있습니다.

![Image](https://github.com/user-attachments/assets/651f77a1-fdef-4274-83ac-9eeadd24a0c6)

</details>
<br>

### 배포와 CICD

<details>
<summary>Docker, CICD</summary>

<br>
   
- 프론트, 백엔드 개발환경이 달라 DockerFile을 따로 작성 후 image를 만들고 배포합니다.
- 배포된 image는 EC2에서 pull해서 실행합니다.
- image를 빌드하고 배포하는 과정을 github actions를 통해 자동화합니다.

<img src="https://github.com/user-attachments/assets/2e84381b-7850-4c89-be8c-9dd7f32b8d04" width="400px">
<br>

- github actions를 통해 배포되는 영상입니다.

![Image](https://github.com/user-attachments/assets/a174ad93-07d1-4061-9936-5cd953429a0c)
  
</details>

<details>
<summary>S3</summary>

<br>
   
- 프로젝트 진행 중 필요한 이미지나 프로필 수정, 게시글 이미지 첨부를 할 시 이미지의 관리가 용이하며 보안이 좋은 S3를 사용해 파일 수정, 삭제를 합니다.
- 프론트에서 파일 입력 필드를 통해 백엔드 서버로 이미지를 전송하게 되면 백엔드에서 만든 S3Service와 S3Config 클래스를 통해 S3에 파일을 저장합니다.

![Image](https://github.com/user-attachments/assets/97cb4f40-b592-4d92-9ba5-0383e74098ad)

</details>
