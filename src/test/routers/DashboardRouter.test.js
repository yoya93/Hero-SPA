import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { DashboardRouter } from "../../routers/DashboardRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en <DashboardRouter />", () => {
  //como tiene varias rutas debemos simular que esta dentro de un router por eso se usa
  // <MemoryRouter>
  test("debe de mostrarse correctamente", () => {
    const contexValue = {
      user: {
        name: "Yoya",
        logged: true,
      },
      dispatch: jest.fn(),
    };
    const wrapper = mount(
      <AuthContext.Provider value={contexValue}>
        <MemoryRouter>
          <DashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Yoya");
  });
});
