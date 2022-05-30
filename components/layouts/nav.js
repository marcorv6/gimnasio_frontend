import Link from "next/link";
import { useState, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Offcanvas } from "react-bootstrap";
import styles from "../../styles/nav.module.css";

const Nav = (props) => {
  const [tipoUsuario, setTipoUsusario] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function fetchData() {
      setTipoUsusario(parseInt(localStorage.getItem("idTipoUsuario")));
    }
    fetchData();
  });

  return (
    <div className={`${styles.nav}`}>
      <div className={`${styles.centro} container`}>
        <FontAwesomeIcon
          className={`${styles.bars} fa-2x d-inline-flex`}
          onClick={handleShow}
          icon={faBars}
        />
        <p className={`${styles.titulo} col-5 h4`}>{props.titulo}</p>
        <div className={`col-5 offset-5 d-inline-flex justify-content-end`}>
          <p className={`${styles.departamento}`}>
            Sistema Integral de Administración
            <br />
          </p>
        </div>
        <div className={styles.triangle}></div>
      </div>

      <Offcanvas className={styles.sidebar} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <FontAwesomeIcon
            className={`fa-2x d-inline-flex`}
            onClick={handleShow}
            icon={faBars}
          />
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.contenedor}>
          {tipoUsuario === 1 ? (
            <div>
              <br />
              <Link href="/matricula">
                <a className={`${styles.link} my-5`}>Matrícula</a>
              </Link>
              <br />
              <Link href="/inscripciones">
                <a className={`${styles.link} my-5`}>Inscripciones</a>
              </Link>
              <br />
              <Link href="/registroPagos">
                <a className={`${styles.link} my-5`}>Registro de pagos</a>
              </Link>
              <br />
              <Link href="/pagos">
                <a className={`${styles.link} my-5`}>Pagos</a>
              </Link>
              <br />
              <Link href="/altaTrabajador">
                <a className={`${styles.link} my-5`}>Alta de trabajador</a>
              </Link>
              <br />
              <Link href="/matriculaTrabajadores">
                <a className={`${styles.link} my-5`}>Trabajadores</a>
              </Link>
              <br />
            </div>
          ) : (
            <></>
          )}
          {tipoUsuario === 2 ? (
            <div>
              <br />
              <Link href="/matricula">
                <a className={`${styles.link} my-5`}>Matrícula</a>
              </Link>
              <br />
              <Link href="/inscripciones">
                <a className={`${styles.link} my-5`}>Inscripciones</a>
              </Link>
              <br />
              <Link href="/registroPagos">
                <a className={`${styles.link} my-5`}>Registro de pagos</a>
              </Link>
              <br />
              <Link href="/pagos">
                <a className={`${styles.link} my-5`}>Pagos</a>
              </Link>
              <br />
            </div>
          ) : (
            <></>
          )}
          <Link href="/">
            <a className={`${styles.link} ${styles.cerrar}`}>Cerrar sesión</a>
          </Link>
          <br />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Nav;
