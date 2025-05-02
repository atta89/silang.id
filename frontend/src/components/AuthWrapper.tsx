import { type ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Loading } from "../pages";

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    accessToken ? true : undefined
  );

  useEffect(() => {
    setIsAuth(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (isAuth === false) {
      const redirectTo = location.pathname;
      navigate("/login", { state: { redirectTo } });
    }
  }, [isAuth, location.pathname, navigate]);

  if (isAuth === undefined) {
    return <Loading message="Authenticating . . ." />;
  }

  return isAuth ? children : null;
};

export default AuthenticationWrapper;
