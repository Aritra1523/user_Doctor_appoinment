"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";
import { resetPasswordSchema } from "@/schema/auth/ResetPassword/ResetPasswordSchema";
import { resetPassword } from "@/redux/slice/auth/authSlice";
import { ResetPasswordPayload } from "@/typescript/ResetPassword/auth";

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

const useResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams<{ id: string; token: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      const payload: ResetPasswordPayload = {
        id: params.id,
        token: params.token,
        password: data.password,
        confirm_password: data.confirm_password,
      };

      const res = await dispatch(resetPassword(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message || "Password reset successfully",
      });

      reset();

      router.push("/auth/login");
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

export default useResetPassword;