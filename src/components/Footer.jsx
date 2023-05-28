function Footer() {
  
  const today = new Date();
  const year = today.getUTCFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">© {year} Mesto Russia</p>
    </footer>
  )

}

export default Footer;