import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../slice/cartslice";
import { useNavigate } from "react-router-dom";
import { addPayment } from "../../slice/paymentSlice";






import CommonModal from "./CommonModal";
import { localhost } from "../../api/CommonAPI";

const AnimeModal = ({ itemId, setIsAnimeModal }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  // 모달 데이터
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const axiosFn = async () => {
      try {
        const items = await axios.get(`http://${localhost}:3001/allItems?id=${itemId.id}`)

        setModalData(items.data[0]); // [{}]
        
        console.log(items.data[0], 'data')
      } catch (err) {
        alert(err);
      }
    };
    axiosFn();
  }, []);

  console.log(modalData)
  console.log(itemId, ' <<, ')

  //모달창 닫기
  const closeBtn = () => {
    setIsAnimeModal(false);
  };

  const [itemCount, setItemCount] = useState(1)
  
  const animeCart={
    id: modalData.id,
    type: modalData.type,
    title: modalData.title,
    price: modalData.price,
    img: `/images/itemData/${modalData.img}`,
    genre: modalData.genre,
    age: modalData.age,
    year: modalData.year,
    time: modalData.time,
    count: itemCount,
    coment: modalData.coment, 
  }

  



 
  
  const addCartFn=()=>{
    dispatch(addCart(animeCart))
  }

  const addPayementFn = () => {
    dispatch(addPayment(animeCart));
    navigate("/paymentIndex?type=buy");
  };

  const plusFn = () => {
    setItemCount(itemCount + 1)
  }
  
  const minusFn = () => {
    if (itemCount === 1) {
      return
    }
    setItemCount(itemCount - 1)
  }

  
  ////// 공용 모달 코드
  //
  // 공용 모달창 on/off state 
  const [isCommonModal, setIsCommonModal] = useState(false)
  // 공용 모달창 내용 state
  const [contents, setContents] = useState("")
  //
  // 공용 모달창 전용 함수
  //
  // 1. 내용 2. 모달창 on
  const handlerFn = (contents) => {
   
    setContents(contents)
    setIsCommonModal(true)
  }
  //////

  return (
    <>
      {isCommonModal && (
        <CommonModal contents={contents} setIsCommonModal={setIsCommonModal} />
      )}
      <div className="animeModal">
        <div className="animeModal-con">
          <div className="modal-wrap">
            <span className="close" onClick={closeBtn}>
              ×
            </span>{" "}
            {/* x 버튼 */}
            <div className="top">
              <img
                src={`/images/itemData/${modalData.img}`}
                alt={modalData.img}
              />
              <h2>{modalData.title}</h2>
            </div>
            <div className="bottom">
              <div className="bottom-line1">
                <span className="age">{modalData.age}</span>
                <span>·</span>
                <span>{modalData.time}</span>
                <span>·</span>
                <span>{modalData.genre}</span>
                <span>{modalData.price}원</span>
              </div>
              <div className="bottom-line2">
                <button onClick={addPayementFn}>구매하기</button>
                <button
                  onClick={() => {
                    addCartFn();
                    handlerFn("addCart");
                  }}
                >
                  <span>장바구니 추가</span>
                  <img src={`/images/common/cart_icon.svg`} alt="cart" />
                </button>
                {/* <button onClick={addCartFn}>장바구니 추가</button> */}


                {/* <button onClick={() => {navigate('/cart')}}>장바구니 이동</button> */}
              </div>
              <div className="bottom-line3">
                <div className="buttons">
                  <button onClick={minusFn} className="buttons-child">
                    -
                  </button>
                  <span className="buttons-child">{itemCount}</span>
                  <button onClick={plusFn} className="buttons-child">
                    +
                  </button>
                </div>
                <span>총합{modalData.price * itemCount}</span>
              </div>
              <div className="bottom-line4">
                <span className="text">{modalData.comment}</span>
                <div className="dum">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, magnam. Quam aliquam natus facere saepe inventore
                    laborum odit dicta? Doloremque facilis voluptatem asperiores
                    explicabo nesciunt eius sit impedit, aliquam repudiandae? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
                    magnam. Quam aliquam natus facere saepe inventore laborum odit
                    dicta? Doloremque facilis voluptatem asperiores explicabo
                    nesciunt eius sit impedit, aliquam repudiandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Distinctio, magnam.
                    Quam aliquam natus facere saepe inventore laborum odit dicta?
                    Doloremque facilis voluptatem asperiores explicabo nesciunt eius
                    sit impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, magnam. Quam aliquam natus facere saepe inventore
                    laborum odit dicta? Doloremque facilis voluptatem asperiores
                    explicabo nesciunt eius sit impedit, aliquam repudiandae? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
                    magnam. Quam aliquam natus facere saepe inventore laborum odit
                    dicta? Doloremque facilis voluptatem asperiores explicabo
                    nesciunt eius sit impedit, aliquam repudiandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Distinctio, magnam.
                    Quam aliquam natus facere saepe inventore laborum odit dicta?
                    Doloremque facilis voluptatem asperiores explicabo nesciunt eius
                    sit impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, magnam. Quam aliquam natus facere saepe inventore
                    laborum odit dicta? Doloremque facilis voluptatem asperiores
                    explicabo nesciunt eius sit impedit, aliquam repudiandae? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
                    magnam. Quam aliquam natus facere saepe inventore laborum odit
                    dicta? Doloremque facilis voluptatem asperiores explicabo
                    nesciunt eius sit impedit, aliquam repudiandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Distinctio, magnam.
                    Quam aliquam natus facere saepe inventore laborum odit dicta?
                    Doloremque facilis voluptatem asperiores explicabo nesciunt eius
                    sit impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, magnam. Quam aliquam natus facere saepe inventore
                    laborum odit dicta? Doloremque facilis voluptatem asperiores
                    explicabo nesciunt eius sit impedit, aliquam repudiandae? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
                    magnam. Quam aliquam natus facere saepe inventore laborum odit
                    dicta? Doloremque facilis voluptatem asperiores explicabo
                    nesciunt eius sit impedit, aliquam repudiandae? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Distinctio, magnam.
                    Quam aliquam natus facere saepe inventore laborum odit dicta?
                    Doloremque facilis voluptatem asperiores explicabo nesciunt eius
                    sit impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio, magnam. Quam aliquam
                    natus facere saepe inventore laborum odit dicta? Doloremque
                    facilis voluptatem asperiores explicabo nesciunt eius sit
                    impedit, aliquam repudiandae?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeModal;
