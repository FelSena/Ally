import { Link } from "@mui/material";
import { FooterBar } from "../../styles/footer";

const Footer = () => {
  return (
    <FooterBar>
      <h3>Desenvolvido por:</h3>
      <Link underline="none" href="https://www.linkedin.com/in/felipeasena/">
        Felipe Sena
      </Link>
    </FooterBar>
  );
};

export default Footer;
