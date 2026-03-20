import "./footer.scss";
const Footer = () => {
  const links = [ 
    {name:"VK", src:'https://vk.com/yellowhaskinaalyaske'},
    {name:"Telegramm",src:'https://t.me/etiletil'},
    {name:"Мобильный",src:'tel:8-900-127-80-47'},
    {name:"Email",src:'https://kimkonstantin2118@gmail.com'},
    {name:"Instagram", src:'https://www.instagram.com/p/DFFvP5Iq44M/?igsh=cWNuajJremNvYTg4'}
  ];
  return (
    <>
      <div className="footer">
        <h1>Если необходима поддержка</h1>
        <div>Свяжитесь или напишите мне по ссылкам ниже</div>
        <div className="footer_links">
        {links.map((link) => (
          <a key={link.name} href={link.src} target="_blank">
            {link.name}
          </a>
        ))}
        </div>
        <p style={{color:'white'}}>Instagram запрещен на территории РФ</p>
      </div>
    </>
  );
};

export default Footer;
