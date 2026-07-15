"use client";

import useVerifyOtp from "@/customHooks/auth/Otp/useVerifyOtp";


const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useVerifyOtp();

  return (
    <form onSubmit={handleSubmit}>

      <h2>Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp")}
      />

      <p>{errors.otp?.message}</p>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Verifying..."
          : "Verify OTP"}
      </button>

    </form>
  );
};

export default VerifyOtp;