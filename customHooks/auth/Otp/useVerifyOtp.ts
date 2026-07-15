"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { otpSchema } from "@/schema/auth/Otp/otpSchmea";
import { verifyOtp } from "@/redux/slice/auth/authSlice";

interface OtpForm {
  otp: string;
}

const useVerifyOtp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const userId = useSelector(
    (state: RootState) => state.auth.user?.id
  );
const user = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data: OtpForm) => {
    try {
      await dispatch(
        verifyOtp({
          userId,
          otp: data.otp,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "OTP Verified Successfully",
      });

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

export default useVerifyOtp;