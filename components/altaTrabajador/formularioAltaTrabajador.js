import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import styles from "./formularioAltaTrabajador.module.css";
import { useState } from "react";
import {
  avisoError,
  avisoExito,
  avisoFalta,
  avisoLoading,
  cerrarLoading,
} from "../../funciones/avisos";
import axios from "axios";
import { useRouter } from "next/router";

const urlApi = "http://localhost:3000";

const FormularioAltaTrabajador = () => {
  const [selectedidTipoUsuario, setSelectedidTipoUsuario] = useState(
    "Seleccione el tipo de usuario"
  );
  const [dataAlta, setDataAlta] = useState({
    nombre: null,
    telefono: null,
    idTipoUsuario: null,
    usuario: null,
    password: null,
    idAdmin: 1,
  });
  const router = useRouter();

  const handleInputChange = (event) => {
    setDataAlta({
      ...dataAlta,
      [event.target.name]: event.target.value,
    });
  };

  const agregarTrabajdor = async () => {
    console.log(dataAlta);
    if (
      !dataAlta.nombre ||
      !dataAlta.telefono ||
      !dataAlta.idTipoUsuario ||
      !dataAlta.usuario ||
      !dataAlta.password
    ) {
      avisoFalta("Algún campo está vacío");
      return;
    }
    avisoLoading();
    try {
      const response = await axios.post(`${urlApi}/Trabajador/nuevo`, dataAlta);
      await avisoExito();
      router.push("/matriculaTrabajadores");
    } catch (error) {
      console.log(error);
      await avisoError("No fue posible dar de alta el usuario");
    }
    cerrarLoading();
  };

  return (
    <Container
      style={{ backgroundColor: "#fff" }}
      className={`${styles.shadow} rounded col-12 col-md-11 col-lg-10 col-xl-9 col-xxl-8 px-4 my-5`}
    >
      <p className="h2 p-4">Alta de un trabajador</p>
      <Row className="px-4 pb-3">
        <Col className="col-12">
          <h5>Nombre:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="nombre" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Teléfono:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="telefono" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Tipo de trabajador:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <Dropdown>
            <Dropdown.Toggle
              className="w-100"
              id={1}
              variant="outline-secondary"
            >
              {selectedidTipoUsuario}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ width: "100%" }}
              onClick={(event) => {
                setDataAlta({
                  ...dataAlta,
                  idTipoUsuario: parseInt(event.target.id),
                });
                //setidTipoUsuario(parseInt(event.target.id));
                if (parseInt(event.target.id) === 1) {
                  setSelectedidTipoUsuario("Administrador");
                }
                if (parseInt(event.target.id) === 2) {
                  setSelectedidTipoUsuario("Trabajador");
                }
              }}
            >
              <Dropdown.Item id={1}>Administrador</Dropdown.Item>
              <Dropdown.Item id={2}>Trabajador</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="col-12">
          <h5>Nombre de usuario:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="usuario" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Constraseña:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="password" onChange={handleInputChange} />
        </Col>
      </Row>
      <Row className="pb-4 text-center">
        <Col>
          <Button onClick={agregarTrabajdor}>Aceptar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioAltaTrabajador;
