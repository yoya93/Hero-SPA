import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";

import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("Pruebas en <LoginScreen />", () => {
  const contextValue = {
    dispatch: jest.fn(),
  };

  test("debe de mostrarse correctamente ", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("debe de realizar el dispatch y la navegacion ", () => {
    const history = {
      replace: jest.fn(),
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <LoginScreen history={history} />
      </AuthContext.Provider>
    );

    const handleClick = wrapper.find("button").prop("onClick");

    handleClick();

    expect(contextValue.dispatch).toBeCalledWith({
      payload: {
        name: "Yoyajr",
      },
      type: types.login,
    });
    expect(history.replace).toBeCalledWith("/marvel");

    localStorage.setItem("lastPath", "/dc");
    handleClick();

    expect(history.replace).toBeCalledWith("/dc");
  });
});
