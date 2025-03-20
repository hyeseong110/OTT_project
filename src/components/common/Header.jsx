import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutFn } from "../../slice/authSlice";
import { defaultPayment } from "../../slice/paymentSlice";
import AlertModal from "../auth/AlertModal";
import { localhost } from "../../api/CommonAPI";
import axios from "axios";
import { deleteUserFn } from "../../slice/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const signInUser = useSelector((state) => state.auth.signInUser);
  const isCart = useSelector((state) => state.cart.items);
  const [isPaymentList, setIsPaymentList] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (signInUser.length > 0) {
      const AxiosFn = async (e) => {
        try {
          const res = await axios.get(
            `http://${localhost}:3001/payments?userEmail=${signInUser[0].userEmail}`
          );
          const resData = res.data;
          setIsPaymentList(resData);
        } catch (err) {
          alert(err);
        }
      };
      AxiosFn();
    }
  }, [dispatch, signInUser, isPaymentList]);

  const onSignOut = (e) => {
    e.preventDefault();
    handlerFn("logOut"); // 회원정보페이지에서 로그아웃 시 모달창 안뜸
    dispatch(signOutFn());
    dispatch(defaultPayment());
    navigate("/");
  };

  const [isAlertModal, setIsAlertModal] = useState(false);
  const [contents, setContents] = useState("");

  const handlerFn = (contents) => {
    setContents(contents);
    setIsAlertModal(true);
  };

  const recentOut = () => {
    const recentKeep = { ...user };

    dispatch(deleteUserFn());

    const axiosRecentFn = async () => {
      const recentObj = {
        recent: recentKeep.recent,
      };

      const res = await axios.patch(
        `http://${localhost}:3001/members/${recentKeep.recentId}`,
        recentObj
      );
    };
    axiosRecentFn();
  };

  return (
    <>
      {isAlertModal && (
        <AlertModal contents={contents} setIsAlertModal={setIsAlertModal} />
      )}
      <div className="header">
        <div className="header-con">
          <div className="gnb">
            <h1 className="logo">
              <Link to={"/"}>
                <img src="/images/common/main_logo.png" alt="logo" />
              </Link>
            </h1>
            <ul>
              <li>
                <Link to={"/kakaopage"}>지점</Link>
              </li>
              {isSignIn && isPaymentList.length > 0 && (
                <li>
                  <Link to={"/payment"}>결제내역</Link>
                </li>
              )}

              {isCart.length > 0 && (
                <li>
                  <Link to={"/cart"}>장바구니</Link>
                </li>
              )}
              <li>
                {isSignIn ? (
                  <Link
                    onClick={(event) => {
                      onSignOut(event);
                      recentOut();
                    }}
                  >
                    로그아웃
                  </Link>
                ) : (
                  <Link to={"/signIn"}>로그인</Link>
                )}
              </li>
              {!isSignIn && (
                <li>
                  <Link to={"/signUp"}>회원가입</Link>
                </li>
              )}
              {isSignIn && (
                <li>
                  <Link to={"/member"}>{signInUser[0].userEmail}님</Link>
                </li>
              )}
              {isSignIn ? (
                signInUser[0].role === "ROLE_ADMIN" ? (
                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/index");
                      }}
                    >
                      관리자 페이지
                    </Link>
                  </li>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
