"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
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

      localStorage.setItem("accessToken", res.accessToken);

      localStorage.setItem("refreshToken", res.refreshToken);

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      reset();

      router.push("/doctorlist");
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