import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";

import { Navbar } from "../../../components/ui/Navbar";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("Pruebas en <Navbar />", () => {
  const contexValue = {
    user: {
      name: "Yoya",
      logged: true,
    },
    dispatch: jest.fn(),
  };

  const historyMock = {
    //  Forma de farsear la informacion de un custon hooks
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  // en este caso no le puedo pasar directo al  <Navbar /> el history porke el no lo recibe implicitamente
  //Por esta razon tengo que pasarlo antes por un router para que lo reciba como una prop

  const wrapper = mount(
    <AuthContext.Provider value={contexValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Yoya");
  });

  test("debe de llamar el logout y usar el history", () => {
    wrapper.find("button").prop("onClick")();
    expect(contexValue.dispatch).toBeCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toBeCalledWith("/login");
  });
});
