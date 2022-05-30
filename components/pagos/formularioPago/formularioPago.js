import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import styles from "./formularioPago.module.css";
import { useState, useEffect } from "react";
import {
  avisoError,
  avisoExito,
  avisoFalta,
  avisoLoading,
  cerrarLoading,
} from "../../../funciones/avisos";
import axios from "axios";

//const PRECIO_SEMANA = process.env.PRECIO_SEMANA;
const PRECIO_SEMANA = 100;
const PRECIO_MES = 250;
const PRECIO_ANUAL = 1000;

const urlApi = "http://localhost:3000";

const FormularioPago = () => {
  const [idPlan, setIdPlan] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [idCliente, setIdCliente] = useState("");
  const [monto, setMonto] = useState(0);
  const [selectedPago, setSelectedPago] = useState(
    "Seleccione el plan de pago"
  );
  const [disabled] = useState([true]);
  const [dataPlan, setDataPlan] = useState([]);
  const [idTrabajador, setIdTrabajador] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${urlApi}/Plan/planes`);
        setDataPlan(response.data);
      } catch (error) {
        avisoError("No fue posible cargar los datos de los planes");
        console.log(error);
      }
      const params = new URLSearchParams(window.location.search);
      const idURL = params.get("idCliente") || "";
      setIdCliente(idURL);
      setIdTrabajador(parseInt(localStorage.getItem("idTrabajador")));
    }
    getData();
  }, []);

  const dataPago = {
    idPlan: idPlan,
    cantidad: cantidad,
    idCliente: parseInt(idCliente),
    monto: monto,
    idTrabajador: idTrabajador,
  };

  const pagar = async () => {
    console.log(dataPago);
    if (
      !dataPago.idPlan ||
      !dataPago.cantidad === 0 ||
      !dataPago.idCliente === "" ||
      !dataPago.monto === 0 ||
      !dataPago.idTrabajador
    ) {
      avisoFalta("Algún campo está vacío");
      return;
    }
    avisoLoading();
    try {
      await axios.post(`${urlApi}/Pago/nuevo`, dataPago);
      await avisoExito();
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      await avisoError("No fue posible realizar el pago");
    }
    cerrarLoading();
  };

  return (
    <Container
      style={{ backgroundColor: "#fff" }}
      className={`${styles.shadow} rounded col-12 col-md-11 col-lg-10 col-xl-9 col-xxl-8 my-5`}
    >
      <p className="h2 p-4">Pagos</p>
      <Row className="px-4 pb-3">
        <Col className="col-12 col-lg-5 mb-2">
          <Dropdown>
            <Dropdown.Toggle
              className="w-100"
              id={1}
              variant="outline-secondary"
            >
              {selectedPago}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ width: "100%" }}
              onClick={(event) => {
                setIdPlan(parseInt(event.target.id) + 1);
                setSelectedPago(dataPlan[event.target.id].nombre);
                setMonto(parseInt(dataPlan[event.target.id].precio));
                disabled[0] = false;
                setCantidad(1);
              }}
            >
              {dataPlan.map((plan, index) => (
                <Dropdown.Item key={index} id={index}>
                  {plan.nombre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="col-12 col-sm-4 col-lg-2">
          <h5 className="pt-1">Cantidad:</h5>
        </Col>
        <Col className="col-12 col-sm-8 col-lg-5">
          <FormControl
            disabled={disabled[0]}
            type="number"
            value={cantidad}
            min={1}
            onChange={(value) => {
              setCantidad(value.target.value);
              if (idPlan === 1) {
                setMonto(
                  parseInt(PRECIO_SEMANA) * parseInt(value.target.value)
                );
              }
              if (idPlan === 2) {
                setMonto(parseInt(PRECIO_MES) * parseInt(value.target.value));
              }
              if (idPlan === 3) {
                setMonto(parseInt(PRECIO_ANUAL) * parseInt(value.target.value));
              }
              if (value.target.value === "") {
                setMonto(0);
              }
            }}
          />
        </Col>
      </Row>
      <Row className="px-4 pb-3">
        <Col className="col-12 col-sm-6 col-md-4 col-lg-3">
          <h5 className="pt-1">ID del cliente:</h5>
        </Col>
        <Col className="col-12 col-sm-6 col-md-8 col-lg-9">
          <FormControl
            value={idCliente}
            onChange={(value) => {
              setIdCliente(value.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="px-4 pb-4">
        <Col className="col-4 col-sm-4 col-md-4 col-lg-3">
          <h5>Monto:</h5>
        </Col>
        <Col>{monto != 0 ? <h5>${monto}.00</h5> : <></>}</Col>
      </Row>
      <Row className="pb-4 text-center">
        <Col>
          <Button onClick={pagar}>Aceptar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioPago;
