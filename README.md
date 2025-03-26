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

### 🙎‍♂️ 상품페이지

<details>
<summary>상품목록</summary>

<br>
  
- 영화, 웹툰, 드라마, 애니메이션으로 나뉘며 각 페이지에서 `axios`로 데이터를 가져온 후 타입에 맞는 상품만 보이도록 `filter`로 구분했습니다.
- 각 페이지에서 장르별로 상품을 또 나누어 보기 편하게 나누었습니다.
- 각 페이지가 렌더링될 때 상품이 보일수 있도록 `useEffect`를 사용했습니다.
- 상품의 상세정보는 모달창에 나타나고 모달창에 상태는 `useState`로 관리됩니다.

![image](https://github.com/user-attachments/assets/915966a6-227a-4df4-a2e6-32db536c7ccf)


</details>

<br>

### 🛒 장바구니

<details>
<summary>장바구니</summary>

<br>
   
- `Redux slice`로 장바구니 `slice`를 만들어 장바구니에 추가된 상품을 전역 설정합니다.
- 수량 조절과 선택, 전체삭제를 할 수 있도록 `reducer`를 만들어 구현됩니다.
- 상품의 이미지와, 수량, 가격을 확인할 수 있습니다.

![제목-없는-동영상-Clipchamp로-제작-_1_](https://github.com/user-attachments/assets/a5088be0-191c-4002-a4ac-d0024e90cd22)

</details>
<br>

### 💰 결제

<details>
<summary>결제</summary>

<br>
   
- 결제페이지에서 장바구니 `slice`에 저장된 상품 데이터를 가져와 `useSelector`로 가져옵니다.
- 결제방법, 주문처 선택, 주문자 정보를 지정할 수 있고 결제 성공 시 `JSON server`에 결제 정보가 저장됩니다.

![결제](https://github.com/user-attachments/assets/579e9714-c938-4b90-b21e-b89c4aa34e5b)

</details>

<br>

### 주문처페이지

<details>
<summary>주문처</summary>

<br>
   
- 카카오맵 API를 활용해 페이지 내에 지도와 마커를 구현합니다.
- 지도 오른쪽 지점을 선택하면 지도의 중심이 이동되며 마커가 생성됩니다.
- 마커를 클릭하면 해당 지점의 상세정보를 볼 수 있도록 모달창이 나타나고, 모달창의 상태는 `useState`로 관리됩니다.

![2025-03-26-10-37-27](https://github.com/user-attachments/assets/56d2f131-ca59-4c3d-9643-6aa5d1eec335)

</details>

<br>

### 🛠️ 관리자페이지

<details>
<summary>관리자 페이지</summary>

<br>

- 관리자 페이지는 회원,상품,결제 등 항목별로 페이지로 나뉘고 왼쪽에 메뉴를 클릭 시 각 페이지가 렌더링되도록 `component`로 구분됩니다.
- 각 페이지에서는 기본적인 CRUD가 전부 가능합니다.

![image](https://github.com/user-attachments/assets/4a06630e-b873-439f-8864-e30c0cd25aee)

</details>
<br>
