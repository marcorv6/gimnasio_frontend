import { Container } from "react-bootstrap";
import Layout from "/components/layouts/layout";
import FormularioInscripciones from "../../components/inscripciones/formularioInscripciones";

const Index = () => {
  return (
    <Layout tituloNav={"Inscripciones"} tipoUsuario={1} urlBackground={"url(fondo-inscripciones.jpeg)"}>
      <Container>
        <FormularioInscripciones></FormularioInscripciones>
      </Container>
    </Layout>
  );
};

export default Index;
