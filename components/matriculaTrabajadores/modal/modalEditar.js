import { Modal, Button, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./modalEditar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalPassword from "./modalPassword";
import moment from "moment";
import {
  avisoError,
  avisoExito,
  avisoLoading,
  cerrarLoading,
} from "../../../funciones/avisos";
import axios from "axios";

//const urlApi = process.env.API_ROOT;
const urlApi = "http://localhost:3000";

const ModalEditar = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);

  const handleClose = () => {
    props.handleClose();
    setShowEdit(false);
  };

  const handleCloseModalPassword = () => {
    setShowModalPassword(!showModalPassword);
  };

  const handelEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleInputsChange = (event) => {
    props.setDataTrabajador({
      ...props.dataTrabajador,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    avisoLoading();
    try {
      await axios.put(`${urlApi}/Trabajador/update`, props.dataTrabajador);
      await avisoExito();
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      await avisoError("No fue posible dar de alta el usuario");
    }
    cerrarLoading();
  };

  return (
    <>
      <Modal centered size="lg" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="px-2">
            {props.dataTrabajador.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showEdit ? (
            <div>
              <FloatingLabel label="Nombre" className="mb-3">
                <Form.Control
                  type="text"
                  name="nombre"
                  onChange={handleInputsChange}
                  placeholder="Nombre"
                  defaultValue={props.dataTrabajador.nombre}
                />
              </FloatingLabel>
              <FloatingLabel label="Teléfono" className="mb-3">
                <Form.Control
                  type="text"
                  name="telefono"
                  onChange={handleInputsChange}
                  placeholder="Teléfono"
                  defaultValue={props.dataTrabajador.telefono}
                />
              </FloatingLabel>
              <FloatingLabel label="Usuario" className="mb-3">
                <Form.Control
                  type="text"
                  name="usuario"
                  onChange={handleInputsChange}
                  placeholder="Usuario"
                  defaultValue={props.dataTrabajador.usuario}
                />
              </FloatingLabel>
            </div>
          ) : (
            <div>
              <Row style={{ textAlign: "right" }}>
                <Col>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    icon={faPenToSquare}
                    className={`${styles.hover} fa-xl pb-2 px-3`}
                    onClick={handelEdit}
                  />
                </Col>
              </Row>
              <Row className="px-4 pb-3">
                <Col className="col-12 col-sm-4">
                  <h5>Nombre:</h5>
                </Col>
                <Col className="col-12 col-sm-8">
                  <h5 style={{ fontWeight: "300" }}>
                    {props.dataTrabajador.nombre}
                  </h5>
                </Col>
              </Row>
              <Row className="px-4 pb-3">
                <Col className="col-12 col-sm-4">
                  <h5>Fecha de actualización:</h5>
                </Col>
                <Col className="col-12 col-sm-8">
                  <h5 style={{ fontWeight: "300" }}>
                    {moment(
                      props.dataTrabajador.fechaUltimaActualizacion
                    ).format("YYYY-MM-DD")}
                  </h5>
                </Col>
              </Row>
              <Row className="px-4 pb-3">
                <Col className="col-12 col-sm-4">
                  <h5>Teléfono:</h5>
                </Col>
                <Col className="col-12 col-sm-8">
                  <h5 style={{ fontWeight: "300" }}>
                    {props.dataTrabajador.telefono}
                  </h5>
                </Col>
              </Row>
              <Row className="px-4 pb-2">
                <Col className="col-12 col-sm-4">
                  <h5>Tipo de usuario:</h5>
                </Col>
                <Col className="col-12 col-sm-8">
                  <h5 style={{ fontWeight: "300" }}>
                    {props.dataTrabajador.idTipoUsuario === 1 ? (
                      <p>Administrador</p>
                    ) : (
                      <></>
                    )}
                    {props.dataTrabajador.idTipoUsuario === 2 ? (
                      <p>Trabajador</p>
                    ) : (
                      <></>
                    )}
                  </h5>
                </Col>
              </Row>
              <Row className="px-4 pb-3">
                <Col className="col-12 col-sm-4">
                  <h5>Usuario:</h5>
                </Col>
                <Col className="col-12 col-sm-8">
                  <h5 style={{ fontWeight: "300" }}>
                    {props.dataTrabajador.usuario}
                  </h5>
                </Col>
              </Row>
            </div>
          )}
          {showEdit ? (
            <Row style={{ textAlign: "space-between" }}>
              <Col style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    setShowModalPassword(!showModalPassword);
                    handleClose();
                  }}
                  className="mx-2"
                  variant="secondary"
                >
                  Actualizar contraseña
                </Button>
                <Button onClick={handelEdit} className="mx-2" variant="danger">
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="mx-2"
                  variant="success"
                >
                  Acpetar
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-2" onClick={handleClose} variant="primary">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalPassword
        handleClose={handleCloseModalPassword}
        dataTrabajador={props.dataTrabajador}
        show={showModalPassword}
        renderData={props.renderData}
      ></ModalPassword>
    </>
  );
};

export default ModalEditar;
