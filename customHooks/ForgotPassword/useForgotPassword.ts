"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { forgotPasswordSchema } from "@/schema/auth/ForgotPassword/ForgotPasswordSchema";
import { forgotPassword } from "@/redux/slice/auth/authSlice";
import { ForgotPasswordPayload } from "@/typescript/ForgotPassword/auth";

const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    try {
      const res = await dispatch(forgotPassword(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message || "Password reset link sent successfully. Please check your email.",
      });

      reset();
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

export default useForgotPassword;