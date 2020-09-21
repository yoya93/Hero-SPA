import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    // history.push("/marvel");  agregar esta url en la cola

    const lastPath = localStorage.getItem("lastPath") || "/marvel";

    dispatch({
      payload: {
        name: "Yoyajr",
      },
      type: types.login,
    });
    history.replace(lastPath); //reemplaza la url en la cola
  };
  return (
    <div className="container">
      <h1>LoginScreen</h1>

      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};
