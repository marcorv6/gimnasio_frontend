import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Table,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import {
  faCaretDown,
  faSearch,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./tabla.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
//import SpinnerLoading from "../general/spinnerLoading";
import moment from "moment";
import axios from "axios";

//const urlApi = process.env.API_ROOT;
const urlApi = "http://localhost:3000";

const Tabla = () => {
  const [dataCompleta, setDataCompleta] = useState([]);
  const [data, setData] = useState([]);
  const [dataPlan, setDataPlan] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [reverse, setReverse] = useState(false);
  const [caret] = useState([
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
  ]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNextPage = (producto) => {
    router.push({
      pathname: "/pagoUnico",
      query: {
        idPago: 1,
      },
    });
  };

  async function getData() {
    try {
      const response = await axios.get(`${urlApi}/Pago/pagos`);
      setDataCompleta(response.data);
      setData(response.data);
      //console.log(response.data);
    } catch (error) {
      avisoError("No fue posible cargar los pedidos");
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function predicateBy(array) {
    return function (a, b) {
      if (a[array] > b[array]) {
        return 1;
      } else if (a[array] < b[array]) {
        return -1;
      }
      return 0;
    };
  }

  const ordenar = (array, ordenarPor) => {
    array.sort(predicateBy(ordenarPor));
    if (reverse === true) {
      array.reverse();
    }
    setData([...array]);
  };

  const campos = [
    { id: 1, nombre: "Folio", nombreVar: "folio" },
    { id: 2, nombre: "Fecha de pago", nombreVar: "fechaPago" },
    { id: 3, nombre: "Clave del cliente", nombreVar: "idCliente" },
    { id: 4, nombre: "Nombre del trabajdor", nombreVar: "Trabajador.nombre" },
    { id: 5, nombre: "Plazo", nombreVar: "Plan.nombre" },
    { id: 6, nombre: "Cantidad", nombreVar: "cantidad" },
    { id: 7, nombre: "Monto", nombreVar: "monto" },
  ];

  const filtrarElementos = (terminoBusqueda) => {
    let search = dataCompleta.filter((item) => {
      if (
        item.folio.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        item.fechaPago.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        String(item.idCliente)
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        String(item.Trabajador.nombre)
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        String(item.Plan.nombre)
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        String(item.monto).toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return item;
      }
    });
    setData(search);
  };

  const changeCaret = (index, reverse) => {
    if (reverse) {
      caret[index] = faCaretUp;
    } else {
      caret[index] = faCaretDown;
    }
  };

  return (
    <Container
      style={{ backgroundColor: "#fff" }}
      className={`${styles.container} ${styles.shadow} rounded my-5`}
    >
      <div>
        {dataCompleta.length === 0 ? (
          <Row style={{ textAlign: "center", padding: "200px 0 200px 0" }}>
            <p className="h2">No hay registros</p>
          </Row>
        ) : (
          <div className="p-4">
            <div style={{ textAlign: "left", width: "15rem" }}>
              <InputGroup className="mt-2" size="sm">
                <FormControl
                  placeholder="Folio, fecha, nombre, monto"
                  value={busqueda}
                  onChange={(value) => {
                    setBusqueda(value.target.value);
                    filtrarElementos(value.target.value);
                  }}
                />
                <InputGroup.Text>
                  <FontAwesomeIcon className={`btnPrimario`} icon={faSearch} />
                </InputGroup.Text>
              </InputGroup>
            </div>
            {data.length === 0 ? (
              <Row style={{ textAlign: "center", margin: "100px 0 200px 0" }}>
                <p className="h2">No hay coincidencias</p>
              </Row>
            ) : (
              <div
                style={{
                  marginTop: "30px",
                  overflow: "scroll",
                  maxHeight: "25rem",
                  minHeight: "12rem",
                }}
              >
                <Table hover responsive className="table table-striped">
                  <thead>
                    <tr>
                      {campos.map((campo, index) => (
                        <th style={{ textAlign: "center" }} key={campo.id}>
                          {campo.nombre}{" "}
                          <FontAwesomeIcon
                            className={`mt-2 ${styles.caretDown}`}
                            icon={caret[index]}
                            onClick={() => {
                              ordenar(data, campo.nombreVar);
                              //console.log("Se ordena " + data + " por " + campo.nombreVar);
                              setReverse(!reverse);
                              changeCaret(index, reverse);
                            }}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((cliente, index) => (
                      <tr
                        key={index}
                        /*onClick={() => {
                            handleNextPage(cliente);
                          }}
                          style={{ cursor: "pointer" }}*/
                      >
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.folio}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p>{" "}
                          {moment(cliente.fechaPago).format("YYYY-MM-DD")}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.idCliente}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.Trabajador.nombre}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.Plan.nombre}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.cantidad}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> ${cliente.monto}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Tabla;
