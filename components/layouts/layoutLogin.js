import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";

const LayoutLogin = (props) => (
  <div className="Layout">
    <Header />
    <div
      style={{
        backgroundImage: "url(fondo-login.jpeg)",
        backgroundSize: "cover",
        minHeight: "30rem",
      }}
      className="Content p-5"
    >
      {props.children}
    </div>
    <Footer />
  </div>
);

export default LayoutLogin;
