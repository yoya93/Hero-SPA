import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Route, Router } from "react-router-dom";

const { HeroeScreen } = require("../../heroes/HeroeScreen");

describe("Pruebas en <HeroeScreen />", () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };
  test("debe de activarce el <Redirect /> si no hay hero en la url", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroeScreen history={history} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("debe de mostrarce un hero si el parametro existe y lo encuentra", () => {
    // el componente HeroeScreen utiliza los param de react-router por lo tanto
    // necesito que mediante una Route(OJO una Route no un Router este ultimo
    //es para pasar el history cuando el componente no lo recibe implicitamente con el NAvBAr, y el Route es pa pasar los parametros del path)
    //se introduzcan los param en el component.
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroeId" component={HeroeScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("debe de regresar a la pantalla anterior con push", () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(history.push).toHaveBeenCalledWith("/");
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test("debe de regresar a la pantalla anterior con goBack", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(history.push).not.toHaveBeenCalled();
    expect(history.goBack).toHaveBeenCalled();
  });
  test("debe de llamar el redirect si no existe el component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spiderffffffff"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("");
  });
});
