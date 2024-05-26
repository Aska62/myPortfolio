import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="w-full mt-12">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}

export default App;
