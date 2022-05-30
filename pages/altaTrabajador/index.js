import { Container } from "react-bootstrap";
import Layout from "/components/layouts/layout";
import FormularioAltaTrabajador from "../../components/altaTrabajador/formularioAltaTrabajador";

const Index = () => {
  return (
    <Layout
      tituloNav={"Alta de un trabajador"}
      tipoUsuario={1}
      urlBackground={"url(fondo-altaTrabajador.jpeg)"}
    >
      <Container>
        <FormularioAltaTrabajador></FormularioAltaTrabajador>
      </Container>
    </Layout>
  );
};

export default Index;
