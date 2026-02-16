import "./footer.scss";
const Footer = () => {
  const links = ["VK", "Telegramm", "OK", "Viber", "Instagram"];
  return (
    <>
      <div className="footer">
        <h1>Footer</h1>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, similique.</div>
        <div className="footer_links">
        {links.map((link, ind) => (
          <a key={ind} href="#">
            {link}
          </a>
        ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
