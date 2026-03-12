function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer>
      Todos los derechos reservados por JS {año}
    </footer>
  );
}

export default Footer;
