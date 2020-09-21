import "@testing-library/jest-dom";
import { authReducer } from "../../auth/authReducer";
import { useReducer } from "react";
import { types } from "../../types/types";

// const state={
//   name:"Yoyajr",
//   logged:true
// }

describe("Pruebas en authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});

    expect(state).toEqual({ logged: false });
  });
  test("debe de autenticar y colocar el name del usuario", () => {
    const action = { payload: { name: "Yoya" }, type: types.login };

    const state = authReducer({ logged: false }, action);

    expect(state).toEqual({ name: "Yoya", logged: true });
  });

  test("debe de borrar el name del usuario y logged en false ", () => {
    const action = { type: types.logout };

    const state = authReducer({ logged: true }, action);

    expect(state).toEqual({ logged: false });
  });
});
