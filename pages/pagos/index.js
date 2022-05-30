import { Container } from "react-bootstrap";
import Layout from "/components/layouts/layout";
import FormularioPago from "../../components/pagos/formularioPago/formularioPago";

const Index = () => {
  return (
    <Layout tituloNav={"Pagos"} tipoUsuario={1} urlBackground={"url(fondo-pago.jpeg)"}>
      <Container style={{ minHeight: "30rem"}}>
        <FormularioPago></FormularioPago>
      </Container>
    </Layout>
  );
};

export default Index;
