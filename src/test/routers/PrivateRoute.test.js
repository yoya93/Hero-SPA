import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { PrivateRoute } from "../../routers/PrivateRoute";
// <MemoryRouter> HOC que nos permite probar una <Route/> fuera de un <Router />
// con shallow solo se mostraria el hoc si se quiere ver los child es necesario el mount
// el <Redirect /> regresa un string vacio
describe("Pruebas en <PrivateRoute />", () => {
  const props = {
    // es necesario pasarle las props con la misma estructura que ocupa el componente quese va a renderizar
    location: {
      pathname: "/",
    },
  };

  Storage.prototype.setItem = jest.fn();

  test("debe de mostrar el componente si está autenticado y guardar en el localStorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Holaaa</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });

  test("debe de bloquear el componente si no está autenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Holaaa</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });
});
