import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import styles from "./formularioInscripciones.module.css";
import { useState } from "react";
import axios from "axios";
import {
  avisoError,
  avisoExito,
  avisoFalta,
  avisoLoading,
  cerrarLoading,
} from "../../funciones/avisos";
import { validarVar } from "../../funciones/validaciones";
import { useRouter } from "next/router";

const urlApi = "http://localhost:3000";

const FormularioInscripciones = () => {
  const [dataInscripcion, setDataInscripcion] = useState({
    nombre: null,
    fechaNacimiento: null,
    telefono: null,
    telefonoEmergencia: null,
    correo: null,
    tipoSangre: null,
  });
  const router = useRouter();

  const handleInputChange = (event) => {
    setDataInscripcion({
      ...dataInscripcion,
      [event.target.name]: event.target.value,
    });
  };

  const inscribir = async () => {
    //console.log(dataInscripcion);
    if (
      !dataInscripcion.nombre ||
      !dataInscripcion.fechaNacimiento ||
      !dataInscripcion.telefono ||
      !dataInscripcion.telefonoEmergencia ||
      !dataInscripcion.correo ||
      !dataInscripcion.tipoSangre
    ) {
      avisoFalta("Algún campo está vacío");
      return;
    }
    avisoLoading();
    try {
      const response = await axios.post(
        `${urlApi}/cliente/nuevo`,
        dataInscripcion
      );
      await avisoExito("El nuevo ID del cliente es " + response.data.data.idCliente);
      router.push({
        pathname: "/pagos",
        query: {
          idCliente: response.data.data.idCliente,
        },
      });
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
      <p className="h2 p-4">Inscripciones</p>
      <Row className="px-4 pb-3">
        <Col className="col-12">
          <h5>Nombre:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="nombre" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Fecha de nacimiento:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl
            type="date"
            name="fechaNacimiento"
            onChange={handleInputChange}
          />
        </Col>
        <Col className="col-12">
          <h5>Teléfono:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="telefono" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Teléfono de emergencia:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl name="telefonoEmergencia" onChange={handleInputChange} />
        </Col>
        <Col className="col-12">
          <h5>Correo:</h5>
        </Col>
        <Col className="col-12 mb-3">
          <FormControl
            type="email"
            name="correo"
            onChange={handleInputChange}
          />
        </Col>
        <Col className="col-12">
          <h5>Tipo de sangre:</h5>
        </Col>
        <Col className="col-12 mb-4">
          <FormControl name="tipoSangre" onChange={handleInputChange} />
        </Col>
        <Col className="col-12 mb-3">
          <Button className="w-100" onClick={inscribir}>
            Aceptar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioInscripciones;
