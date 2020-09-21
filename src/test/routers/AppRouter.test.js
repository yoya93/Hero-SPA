import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en <AppRouter/>", () => {
  test("debe de mostrar el login si no está autenticado ", () => {
    const contextValue = {
      user: {
        logged: false,
      },
      dispatch: jest.fn(), // el dispatch es ua function y mediante jest puedo hacerl el tracking
    };

    // tenemos que darle el context que usa la app
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar el navBar si  está autenticado ", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Yoya",
      },
      dispatch: jest.fn(), // el dispatch es ua function y mediante jest puedo hacerl el tracking
    };

    // tenemos que darle el context que usa la app
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
