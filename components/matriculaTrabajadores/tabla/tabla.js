import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Table,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import axios from "axios";
import {
  faCaretDown,
  faSearch,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./tabla.module.css";
import { useState, useEffect } from "react";
import ModalEditar from "../modal/modalEditar";
import ModalPassword from "../modal/modalPassword";
import { avisoError } from "../../../funciones/avisos";
import moment from "moment";

//const urlApi = process.env.API_ROOT;
const urlApi = "http://localhost:3000";

const Tabla = () => {
  const [dataCompleta, setDataCompleta] = useState([]);
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [reverse, setReverse] = useState(false);
  const [caret] = useState([faCaretDown, faCaretDown, faCaretDown]);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [dataEditar, setDataEditar] = useState({});

  const handleCloseModalEditar = () => {
    setShowModalEditar(!showModalEditar);
  };

  async function getData() {
    try {
      const response = await axios.get(`${urlApi}/Trabajador/trabajadores`);
      setDataCompleta(response.data);
      setData(response.data);
    } catch (error) {
      avisoError("No fue posible cargar los trabajadores");
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
    { id: 1, nombre: "Nombre", nombreVar: "nombre" },
    { id: 2, nombre: "Usuario", nombreVar: "usuario" },
    { id: 3, nombre: "Fecha actualización", nombreVar: "fechaUltimaActualizacion" },
  ];

  const filtrarElementos = (terminoBusqueda) => {
    console.log("lwjhrbvwikne");
    let search = dataCompleta.filter((item) => {
      if (
        item.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        item.usuario.toLowerCase().includes(terminoBusqueda.toLowerCase())
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
                  placeholder="Nombre, usuario"
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
                        onClick={() => {
                          //handleNextPage(cliente);
                          setDataEditar(dataCompleta[index]);
                          setShowModalEditar(!showModalEditar);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.nombre}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p> {cliente.usuario}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="m-2"></p>{" "}
                          {moment(cliente.fechaUltimaActualizacion).format(
                            "YYYY-MM-DD"
                          )}
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
      <ModalEditar
        show={showModalEditar}
        handleClose={handleCloseModalEditar}
        dataTrabajador={dataEditar}
        setDataTrabajador={setDataEditar}
        renderData={getData}
      ></ModalEditar>
    </Container>
  );
};

export default Tabla;
