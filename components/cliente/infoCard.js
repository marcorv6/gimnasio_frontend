import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import styles from "./infoCard.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const InfoCard = (props) => {
  const [dataCliente, setDataCliente] = useState({});
  const [visible, setVisible] = useState(false);
  const [correo, setCorreo] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const handleShow = () => {
    setVisible(!visible);
  };

  const handelEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <Container
      style={{ backgroundColor: "#fff" }}
      className={`${styles.shadow} rounded col-12 col-md-11 col-lg-10 col-xl-9 col-xxl-8 my-5`}
    >
      <Row style={{ textAlign: "space-between" }}>
        <Col>
          <p className="h2 px-4 pt-4 pb-2">Cliente</p>
        </Col>
        {showEdit ? (
          <></>
        ) : (
          <Col style={{ textAlign: "right" }}>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faPenToSquare}
              className={`${styles.hover} fa-xl pt-4 px-3`}
              onClick={handelEdit}
            />
          </Col>
        )}
      </Row>
      {showEdit ? (
        <div className="px-3 pt-2">
          <FloatingLabel label="Nombre" className="mb-3">
            <Form.Control
              type="text"
              name="nombre"
              onChange={props.handleInputsChange}
              placeholder="Nombre"
              defaultValue={props.dataCliente.nombre}
            />
          </FloatingLabel>
          <FloatingLabel label="Fecha de nacimiento" className="mb-3">
            <Form.Control
              type="date"
              name="fechaNacimiento"
              onChange={props.handleInputsChange}
              placeholder="Fecha de nacimiento"
              defaultValue={moment(props.dataCliente.fechaNacimiento).format(
                "YYYY-MM-DD"
              )}
            />
          </FloatingLabel>
          <FloatingLabel label="Correo" className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              onChange={props.handleInputsChange}
              placeholder="Correo"
              defaultValue={props.dataCliente.correo}
            />
          </FloatingLabel>
          <FloatingLabel label="Teléfono" className="mb-3">
            <Form.Control
              type="text"
              name="telefono"
              onChange={props.handleInputsChange}
              placeholder="Teléfono"
              defaultValue={props.dataCliente.telefono}
            />
          </FloatingLabel>
          <FloatingLabel label="Teléfono de emergencia" className="mb-3">
            <Form.Control
              type="text"
              name="telefonoEmergencia"
              onChange={props.handleInputsChange}
              placeholder="Teléfono de emergencia"
              defaultValue={props.dataCliente.telefonoEmergencia}
            />
          </FloatingLabel>
          <FloatingLabel label="Tipo de sangre" className="mb-3">
            <Form.Control
              type="text"
              name="tipoSangre"
              onChange={props.handleInputsChange}
              placeholder="Tipo de sangre"
              defaultValue={props.dataCliente.tipoSangre}
            />
          </FloatingLabel>
        </div>
      ) : (
        <div className="pb-3 pt-2">
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Nombre:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              <h5 style={{ fontWeight: "300" }}>{props.dataCliente.nombre}</h5>
            </Col>
          </Row>
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Fecha de nacimiento:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              <h5 style={{ fontWeight: "300" }}>
                {moment(props.dataCliente.fechaNacimiento).format("YYYY-MM-DD")}
              </h5>
            </Col>
          </Row>
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Correo:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              <h5 style={{ fontWeight: "300" }}>{props.dataCliente.correo}</h5>
            </Col>
          </Row>
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Teléfono:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              <h5 style={{ fontWeight: "300" }}>
                {props.dataCliente.telefono}
              </h5>
            </Col>
          </Row>
          {dataCliente.telefonoEmergencia ? (
            <Row className="px-4 pb-3">
              <Col className="col-12 col-sm-4">
                <h5>Teléfono de emergencia:</h5>
              </Col>
              <Col className="col-12 col-sm-8">
                <h5 style={{ fontWeight: "300" }}>
                  {props.dataCliente.telefonoEmergencia}
                </h5>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Fecha de último pago:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              {props.dataCliente.fechaUltimoPago ? (
                <h5 style={{ fontWeight: "300" }}>
                  {moment(props.dataCliente.fechaUltimoPago).format(
                    "YYYY-MM-DD"
                  )}
                </h5>
              ) : (
                <h5 style={{ fontWeight: "300" }}>No se tiene registro</h5>
              )}
            </Col>
          </Row>
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Fecha de próximo pago:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              {props.dataCliente.fechaProximoPago ? (
                <h5 style={{ fontWeight: "300" }}>
                  {moment(props.dataCliente.fechaProximoPago).format(
                    "YYYY-MM-DD"
                  )}
                </h5>
              ) : (
                <h5 style={{ fontWeight: "300" }}>No se tiene registro</h5>
              )}
            </Col>
          </Row>
          <Row className="px-4 pb-3">
            <Col className="col-12 col-sm-4">
              <h5>Tipo de sangre:</h5>
            </Col>
            <Col className="col-12 col-sm-8">
              <h5 style={{ fontWeight: "300" }}>
                {props.dataCliente.tipoSangre}
              </h5>
            </Col>
          </Row>
        </div>
      )}
      {showEdit ? (
        <Row className="pb-3" style={{ textAlign: "space-between" }}>
          <Col style={{ textAlign: "right" }}>
            <Button onClick={handelEdit} className="mx-2" variant="danger">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                props.modificarCliente();
                setShowEdit(!showEdit);
              }}
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
    </Container>
  );
};

export default InfoCard;
