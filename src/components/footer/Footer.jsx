import "./Footer.css";

const Footer = () => (
  <footer>
    <div className="footer__container">
      <a
        className="footer__rss"
        href="https://rs.school/#about-school"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="footer__rss-year">`22</span>{" "}
      </a>
      <div className="footer__github-link ">
        <a
          href="https://github.com/Marina2609"
          target="_blank"
          rel="noopener noreferrer"
        >
          Марина
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
