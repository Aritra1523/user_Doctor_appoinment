"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginSchema } from "@/schema/auth/Login/LoginSchema";
import { LoginPayload } from "@/typescript/auth/Login/auth";
import { loginUser } from "@/redux/slice/auth/authSlice";

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();

      setCookie("token", res.accessToken, {
        maxAge: 60 * 15, // 15 min, matches the refresh flow in axiosInstance
        path: "/",
      });

      setCookie("refresh-token", res.refreshToken, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

     
      setCookie("user", JSON.stringify(res.data), {
        maxAge: 60 * 60 * 24 * 7, // 7 days, matches refresh-token
        path: "/",
      });

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      reset();

      router.push("/profile");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};

export default useLogin;