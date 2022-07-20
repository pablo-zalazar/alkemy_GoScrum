import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../components/views/Register";

// consultar a una api si no esta levantado el servidor
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://goscrum-api.alkemy.org/auth/data", (req, res, ctx) => {
    return res(
      ctx.json({
        result: {
          continente: ["America", "Europa", "Otro"],
          region: ["Otro", "Latam", "Brasil", "America del Norte"],
          Rol: ["Team Member", "Team Leader"],
        },
      })
    );
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());

//

it("fetch options", async () => {
  render(<Register />, { wrapper: MemoryRouter });

  expect(
    screen.getByRole("option", { name: "Seleccionar continente..." })
  ).toBeInTheDocument();

  // Componente que viene de la API
  expect(
    await screen.findByRole("option", { name: "Europa" })
  ).toBeInTheDocument();
});

/**
 * yarn add msw
 * Mock Service Worker -> Simular una API
 */
