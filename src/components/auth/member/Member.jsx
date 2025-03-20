import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import { animeDataFn } from '../../../slice/animeSlice';
import { localhost } from '../../../api/CommonAPI';
import { updateRecentFn } from '../../../slice/userSlice';




const Member = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signInUser = useSelector(state => state.auth.signInUser)


  ////////////////////////////////////////////////////////////////
  const animeData = useSelector((state) => state.anime.animeData);

  const recentId = useSelector((state) => state.user.recentId);
  const recent = useSelector((state) => state.user.recent);

  const [recentItem, setRecentItem] = useState([]);

  const [recentDelete, setRecentDelete] = useState(false);

  const [liKey, setLiKey] = useState("recent")

  const [paymentData, setPaymentData] = useState([])
  const [payDetail, setPayDetail] = useState({})
  ///////////////////////////////////////////////////////////////
  
  useEffect(()=> {
    dispatch(animeDataFn())

    const axiosRecent = async () => {
  
      try {

        const payRes = await axios.get(`http://${localhost}:3001/payments?userEmail=${signInUser[0].userEmail}`);
        const payResData = payRes.data;
        setPaymentData(payResData);





        const res = await axios.get(`http://${localhost}:3001/members/${recentId}`) 

        const sumArr = res.data.recent.concat(recent) 

        const uniqueArr = []

        sumArr.forEach(el => {
          if (!uniqueArr.includes(el)) {
            uniqueArr.push(el)
          }
        })

        if (uniqueArr.length > 5) {
          uniqueArr.splice(0,uniqueArr.length - 5)
        }

        console.log(uniqueArr)

        setRecentItem(uniqueArr) 

        dispatch(updateRecentFn(uniqueArr))

       
      } catch(err) {
        alert(err)
      }
    }
    axiosRecent()


    console.log(paymentData, "-----------pay")
    
  },[])

 



  const recentArr = animeData.filter((el) => recentItem.includes(el.id)); //중복되도 filter에서 걸러냄 id는 하나이므로

  const onTrashButton = () => {
    if (!recentDelete) {
      setRecentDelete(true);
    } else {
      setRecentDelete(false);
    }
  };


  


 


  return (
    <>
      <div className="member-index">
        <div className="member-index-con">

          <span className= 'span-back' onClick={() => {
            navigate(-1)
          }}>뒤로가기</span>

          {signInUser.length > 0 &&
            <>
              <div className="member-index-left" id='member-mobile'>
                <h3 className="member-title">회원정보</h3>

                <div className="profile-box">
                  <div className="image-box">
                    <img src={`/images/common/profile.png`} alt="image" />
                  </div>
                  <h3>{signInUser[0].userName}님</h3>
                  <span onClick={() => {
                    navigate('/member/update')
                  }}>회원정보수정</span>
                </div>

                <ul className="member-index-buttons">
                  <li>별점</li>
                  <li>리뷰</li>
                  <li>댓글</li>
                </ul>
                <div className="storage" onClick={() => {
                  setLiKey("recent")
                }}>
                  <img src={`/images/common/storage.svg`} alt="storage" />
                  보관함
                </div>
                
              </div>
              <div className="member-index-right">
                <h3>보관함</h3>
                <div className="member-nav">
                  <ul>
                    <li onClick={() => {
                      setLiKey("recent")
                    }}>최근본</li>
                    
                    <li onClick={() => {
                      setLiKey("payment")
                    }}>구매한</li>
                    

                    <li onClick={onTrashButton}>
                      <div className="trash-icon">
                        <img src={`images/common/trash.svg`} alt="image" />
                      </div>
                      <span>삭제</span>
                      
                    </li>
                  </ul>
                
                  
                </div>
                <hr />
                <div className="member-index-right-con">
                  <div className="right-bar">
                    {!recentDelete ?
                    <span>작품 ({recent.length})</span> :
                    <span>선택 (0)</span>
                    }

                  </div>
                  { (recentArr.length > 0 && liKey === "recent" ) &&
                  <ul>
                  {recentArr.map((el, idx) => {
                    return (
                      <li key={idx}>
                        <div className="image-box">
                          <div className="member-top">
                            <img src={`/images/itemData/${el.img}`} alt='image'></img>
                          </div>
                          <div className="member-bottom">
                            <span>{el.title}</span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                  </ul>
                  }

                  { (liKey === "payment" && paymentData ) &&
                  <ul>
                  {paymentData.map((el, idx) => {
                    return (
                      <li onClick={(e) => {
                        const tag = e.currentTarget.children[0].children[1].innerText
                        const item = paymentData.filter(el => el.paymentResult[0].title === tag)[0]

                        setPayDetail({
                          ...item
                        })

                        setLiKey(`paymentDetail`)
                      }} key={idx}>
                        <div className="image-box">
                          <div className="member-top">
                            <img src={el.paymentResult[0].img} alt='pay-image'></img>
                          </div>
                          <div className="member-bottom">
                            {el.paymentResult[0].title}
                          </div>
                        </div>
                      </li>
                    )

                  })}
                  </ul>
                  }

                  { (liKey === "paymentDetail" && paymentData ) && 
                    <div className="payment-detail">
                        {payDetail && 
                        <>
                        <div className="payDetail-left">
                          <h2>상품명: {payDetail.paymentResult[0].title}</h2>                     
                          <ul>
                            <li>주문처: {payDetail.branchType}</li>
                            <li>결제방식: {payDetail.paymentMethod}</li>
                            <li>주문방식: {payDetail.orderType}</li>
                            <li>가격: {payDetail.paymentResult[0].price}원</li>
                            <li>개수: {payDetail.paymentResult[0].count}</li>
                            <li>총액: {payDetail.paymentAmount}원</li>
                            <li>결제 시간: {payDetail.time}</li>
                          </ul>
                        </div>
                        <div className="payDetail-right">
                          <div className="payDetail-image">
                            <img src={payDetail.paymentResult[0].img} alt="payDetail-image" /> 
                          </div>
                        </div>
                        </>
                        }
                    </div>
                    }

                </div>
              </div>
            </>
          }
              
        </div>
      </div>
    </>
  )
}

export default Member