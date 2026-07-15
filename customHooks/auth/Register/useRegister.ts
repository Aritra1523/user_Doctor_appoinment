"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { registerUser } from "@/redux/slice/auth/authSlice";
import { RegisterPayload } from "@/typescript/auth/Register/Register";
import { registerSchema } from "@/schema/auth/Register/RegisterSchema";
import { useRouter } from 'next/navigation';
const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
  });
const router = useRouter();

  const onSubmit = async (data: RegisterPayload) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
        
      });
     

      reset();
       router.push('/auth/otp');
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

export default useRegister;