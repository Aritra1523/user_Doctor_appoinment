// "use client";

// import { Provider } from "react-redux";
// import { store } from "@/redux/store/store";
// export default function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={store}>{children}</Provider>;
// }


"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { store, AppDispatch } from "@/redux/store/store";
import { hydrateUser } from "@/redux/slice/auth/authSlice";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const rawUser = getCookie("user");
    if (!rawUser) return;

    try {
      dispatch(hydrateUser(JSON.parse(String(rawUser))));
    } catch {
      // malformed cookie, ignore
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}