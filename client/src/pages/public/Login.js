import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/fn";
import bg from "../../assets/sun-tornado.png";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, mes, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    // setIsLoading(false)
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    // setIsLoading(false)
    mes && Swal.fire("Oops !", mes, "error");
  }, [update]);
  const handleSubmit = async () => {
    // setIsLoading(true)
    let finalPayload = isRegister
      ? payload
      : {
          email: payload.email,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0 && isRegister) dispatch(actions.register(payload));
    if (invalids === 0 && !isRegister) dispatch(actions.login(payload));
  };

  return (
    <div className="w-full flex items-center relative justify-center">
      {/* <div className='absolute top-0 left-0 right-0 bottom-0'>
                <img
                    className='w-full h-full object-cover'
                    src={bg} alt="" />
            </div> */}
      {/* {isLoading && <div className='fixed top-0 right-0 left-0 bottom-0 bg-overlay-70 flex items-center justify-center'>
                <Loading />
            </div>} */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
        <div className="bg-white w-[600px] p-[30px] rounded-md shadow-lg border">
          <h3 className="font-semibold text-2xl mb-3">
            {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
          </h3>
          <div className="w-full flex flex-col gap-5">
            {isRegister && (
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={"HỌ TÊN"}
                value={payload.name}
                setValue={setPayload}
                keyPayload={"name"}
              />
            )}
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"EMAIL"}
              value={payload.email}
              setValue={setPayload}
              keyPayload={"email"}
            />
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"MẬT KHÂU"}
              value={payload.password}
              setValue={setPayload}
              keyPayload={"password"}
              type="password"
            />
            <Button
              text={isRegister ? "Đăng kí" : "Đăng nhập"}
              bgColor="bg-secondary1"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
          <div className="mt-7 flex items-center justify-between">
            {isRegister ? (
              <small>
                Bạn đã có tài khoản?{" "}
                <span
                  onClick={() => {
                    setIsRegister(false);
                    setPayload({
                      email: "",
                      password: "",
                      name: "",
                    });
                  }}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </span>
              </small>
            ) : (
              <>
                <small className="text-[blue] hover:underline cursor-pointer">
                  Bạn quên mật khẩu
                </small>
                <small
                  onClick={() => {
                    setIsRegister(true);
                    setPayload({
                      email: "",
                      password: "",
                      name: "",
                    });
                  }}
                  className="text-[blue] hover:underline cursor-pointer"
                >
                  Tạo tài khoản mới
                </small>
              </>
            )}
          </div>
          <div className="flex items-center justify-center mt-8">
            <Link to="/" className="text-blue-500 hover:underline text-sm">
              Bỏ quan đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
