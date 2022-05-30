import { Container, Button } from "react-bootstrap";
import Layout from "/components/layouts/layout";
import Tabla from "../../components/matricula/tabla/tabla";
import { useEffect, useState } from "react";
import axios from "axios";

//const urlApi = process.env.API_ROOT;
const urlApi = "http://localhost:3000";

const Index = () => {
  const [dataCliente, setDataCliente] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${urlApi}/cliente/clientes`
        );
        setDataCliente(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  /*const getData = async () => {
    try {
      const response = await axios.get(`${urlApi}/admin/disenadores`);
      setDataDisenadores(response.data);
    } catch (error) {
      console.log(error);
    }
  };*/

  return (
    <Layout
      tituloNav={"Matrícula"}
      tipoUsuario={1}
      urlBackground={"url(fondo-matricula.jpeg)"}
    >
      <Container>
        <Tabla dataCliente={dataCliente}></Tabla>
      </Container>
    </Layout>
  );
};

export default Index;
