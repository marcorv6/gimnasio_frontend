import { Container } from "react-bootstrap";
import Layout from "/components/layouts/layout";
import Tabla from "../../components/registroPagos/tabla/tabla";

const Index = () => {
  return (
    <Layout
      tituloNav={"Registro de pagos"}
      tipoUsuario={1}
      urlBackground={"url(fondo-registroPagos.jpeg)"}
    >
      <Container>
        <Tabla></Tabla>
      </Container>
    </Layout>
  );
};

export default Index;
