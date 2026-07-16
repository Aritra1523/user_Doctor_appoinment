"use client";

import useVerifyOtp from "@/customHooks/auth/Otp/useVerifyOtp";
import { useRef, useEffect } from "react";

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    clearErrors,
  } = useVerifyOtp();

  const inputRefs = useRef([]);

  const focusInput = (index) => {
    
    setTimeout(() => {
      const el = inputRefs.current[index];
      if (el) {
        el.focus();
        el.select?.();
      }
    }, 0);
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1); // only keep last typed digit
    e.target.value = value;

    // Update the form value
    const otpValue = inputRefs.current.map((ref) => ref?.value || "").join("");
    setValue("otp", otpValue, { shouldValidate: false });

    // Clear error when user starts typing
    if (errors.otp) {
      clearErrors("otp");
    }

    // Auto-focus next input if current has value and not last
    if (value && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace") {
      if (!e.target.value && index > 0) {
        // current box already empty -> jump back
        focusInput(index - 1);
      } else {
        // let the digit clear first, then update form value
        setTimeout(() => {
          const otpValue = inputRefs.current
            .map((ref) => ref?.value || "")
            .join("");
          setValue("otp", otpValue, { shouldValidate: false });
        }, 0);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const pastedArray = pastedData.split("");

    inputRefs.current.forEach((ref, index) => {
      if (!ref) return;
      ref.value = pastedArray[index] || "";
    });

    const otpValue = inputRefs.current.map((ref) => ref?.value || "").join("");
    setValue("otp", otpValue, { shouldValidate: false });

    if (errors.otp) {
      clearErrors("otp");
    }

    // Focus on the next empty input or last filled
    const lastFilledIndex = Math.min(pastedArray.length - 1, 5);
    if (lastFilledIndex < 5) {
      focusInput(lastFilledIndex + 1);
    } else {
      focusInput(5);
    }
  };

  // Focus first input on mount
  useEffect(() => {
    focusInput(0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify OTP
            </h2>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500 bg-gray-50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm font-medium mt-2 text-center flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* Hidden input for form registration */}
          <input type="hidden" {...register("otp")} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
              onClick={() => {
                console.log("Resend OTP");
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Resend OTP
            </button>
            <span className="text-xs text-gray-400">Didn't receive code?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
