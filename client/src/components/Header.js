import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import logo from "../assets/logowithoutbg.png";
import avatar from "../assets/anon-avatar.png";
import { Button } from "../components";
import icons from "../ultils/icons";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import path from "../ultils/path";
import { apiAdmin } from "../apis";
import actionTypes from "../store/actions/actionTypes";

const {
  AiOutlinePlusCircle,
  AiOutlineLogout,
  BsChevronDown,
  AiOutlineUser,
  RiAdminLine,
} = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isAdmin, currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  // console.log(currentData);
  // New
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page"), location.pathname]);

  useEffect(() => {
    setTimeout(async () => {
      const response = await apiAdmin();
      if (response.success)
        dispatch({ type: actionTypes.IS_ADMIN, isAdmin: true });
      else dispatch({ type: actionTypes.IS_ADMIN, isAdmin: false });
    }, 500);
  }, [isLoggedIn]);

  return (
    <div ref={headerRef} className="w-full">
      <div className="w-full flex items-center justify-between ">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <div className="text-sm">
                {currentData && Object.keys(currentData).length > 0 && (
                  <div className="flex items-center gap-2">
                    <img
                      src={currentData?.image || avatar}
                      alt="avatar"
                      className="w-10 object-cover rounded-full h-10 border-2 shadow-md border-white"
                    />
                    <div className="flex flex-col">
                      <span>
                        Xin chào,{" "}
                        <span className="font-semibold">
                          {currentData?.name}
                        </span>
                      </span>
                      <span>
                        Mã tài khoản:{" "}
                        <span className="font-medium">{`${currentData?.id?.toUpperCase()}`}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 z-50 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col">
                  {currentData?.role !== "R1" && (
                    <Link
                      className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                      to={`/${path.MEMBER}/${path.PERSONAL}`}
                    >
                      <AiOutlineUser />
                      <span>Cá nhân</span>
                    </Link>
                  )}
                  {isAdmin && (
                    <Link
                      className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      <RiAdminLine />
                      <span>Admin</span>
                    </Link>
                  )}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          {(currentData?.role === "R1" || currentData?.role === "R2") && (
            <Button
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-secondary2"
              IcAfter={AiOutlinePlusCircle}
              onClick={() => navigate(`/${path.MEMBER}/${path.PERSONAL}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
