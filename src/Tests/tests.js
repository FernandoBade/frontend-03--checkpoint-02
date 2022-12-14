// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Home from '../../../Routes/Home';
import Detail from '../../../Routes/Detail';
import Login from '../../../Routes/Login';


describe("Tests setup for main usages", () => {

  test('verify server status 500', function () {
    server.use(
      rest.get(<Home/>, (res, ctx) => {
        return res(ctx.status(500));
      })
    );
  })

  test("verify dark/light theme button", () => {
    render(<App />);
    const theme = screen.getByTestId("app");
    expect(theme).toHaveClass("light");
    const button = screen.getByRole("button", { name: /alterar tema/i });
    fireEvent.click(button);
    expect(theme).toHaveClass("dark");
  });

  test('verify the apointment button on Guilherme Lima is not disabled', () => {
    render(<Fetch url="/dentist/b36ac23a-75d1-4286-9135-494c7402a6f0" />)
    expect(screen.getByText('Agendar Consulta')).toBeInTheDocument();
  });

  test('verify the /dentist/ endpoint to be empty', () => {
    render(<Fetch url="/dentist/" />)
    expect(screen.getByText('Checkpoint')).not.toBeInTheDocument();
  });

})




