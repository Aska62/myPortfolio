import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}

export default App;
