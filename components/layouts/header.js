import Image from "next/image";
import Logo from "./../../public/logoGym.png";
//import LogoFes from "./../../public/logo_fesa.png";
import styles from "../../styles/default.module.css";
import { Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <div
      className={`${styles.divMaster} container-fluid ${styles.header} cl-12 ${styles.bgColor}`}
    >
      <Container className={`d-flex`}>
        <Row className="text-center">
          <Col className="col-12 text-center" style={{ width: "9rem" }}>
            <Image src={Logo}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
