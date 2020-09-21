import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Search } from "../../../components/search/Search";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <Search />", () => {
  test("debe de mostrarse correctamente", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Search />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a Hero");
  });

  test("debe de mostrar a Batman y el input con el valor del queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Search />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de retornar un error si no se encuentra el hero ", () => {
    const q = "No existe";
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <Search />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `There is no a hero with ${q}`
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar al history.push()  ", () => {
    const q = "batman";

    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <Search history={history} />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        value: q,
        name: "searchText",
      },
    });
    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(history.push).toBeCalledWith(`?q=${q}`);
  });
});
