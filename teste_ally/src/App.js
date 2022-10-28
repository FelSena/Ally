import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { Column } from "./styles/globals";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Column justify="space-between" width="100vw" height="100vh">
        <Form />
        <Footer />
      </Column>
    </>
  );
}

export default App;
