import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import {
  avisoError,
  avisoExito,
  avisoLoading,
  cerrarLoading,
} from "../../../funciones/avisos";
import axios from "axios";

//const urlApi = process.env.API_ROOT;
const urlApi = "http://localhost:3000";

const ModalPassword = (props) => {
  const [dataTrabajador, setDataTrabajador] = useState({
    idTrabajador: null,
    password: "",
  });
  const [typePass, setTypePass] = useState("password");
  const [indPass, setIndPass] = useState(true);

  const handleClose = () => {
    props.handleClose();
  };

  const changePass = () => {
    if (indPass) {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
    setIndPass(!indPass);
  };

  const handleInputsChange = (event) => {
    setDataTrabajador({
      ...dataTrabajador,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    dataTrabajador.idTrabajador = props.dataTrabajador.idTrabajador;
    avisoLoading();
    try {
      const response = await axios.put(
        `${urlApi}/Trabajador/update`,
        dataTrabajador
      );
      await avisoExito();
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      await avisoError("No fue posible actualizar la contraseña");
    }
    cerrarLoading();
  };

  return (
    <>
      <Modal centered size="md" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="px-2">Actualizar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontWeight: "400" }} className="p-2 h5">
            Nombre de usuario: <b>{props.dataTrabajador.nombre}</b>
          </p>
          <FloatingLabel label="Nueva contraseña" className="mb-3">
            <Form.Control
              type={typePass}
              name="password"
              onChange={handleInputsChange}
              placeholder="Nueva contraseña"
            />
          </FloatingLabel>
          <Form.Check
            className="mx-2 mt-0"
            label="Mostrar contraseña"
            type="checkbox"
            onChange={() => {
              changePass();
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-2" onClick={handleSubmit} variant="success">
            Aceptar
          </Button>
          <Button className="mx-2" onClick={handleClose} variant="primary">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPassword;
