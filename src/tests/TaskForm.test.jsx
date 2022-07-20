import { render, screen } from "@testing-library/react";
import { Donate } from "../components/views/Donate.jsx";

describe("renderizado en Donate", () => {
  it("renderiza un headin", () => {
    render(<Donate />);

    // Prueba si ha un heading (h1, h2, ...., h6) en el documento
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renderiza un h1", () => {
    render(<Donate />);

    // Prueba si hay un h1 en el documento
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renderiza un h1 con un texto especifico", () => {
    render(<Donate />);

    // Prueba si hay un h1 con el texto indicado en el documento
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Colaborá con el proyecto",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a con el atributo href", () => {
    render(<Donate />);

    // Prueba si hay un link con el atributo href
    expect(screen.getByRole("link")).toHaveAttribute("href");
  });

  it("renderiza un a con atributo target con el valor _blank", () => {
    render(<Donate />);

    // Prueba si hay un link con el atributo target con el valor _blank
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});

// NO PASA PORQUE NO HAY UN BOTON EN LA PAGINA
// it("renderiza un boton", () => {
//   render(<Donate />);

//   // Prueba si hay un boton en el documento
//   expect(screen.getByRole("button")).toBeInTheDocument();
// });
