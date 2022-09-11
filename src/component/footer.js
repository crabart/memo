function Footer() {
  return (
    <footer>
      <div className="footerTitle">Thank you for using!!</div>

      <style jsx="true">{`
        footer {
          height: 100px;
          background-color: #c1e0ff;
        }

        .footerTitle {
          float: left;
          font-size: 12px;
          margin: 40px 20px;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
