import { withBasePath } from "../lib/basePath";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div className="footerTop">
          <div className="footerBrand">
            <div className="footerLogo">
              <img
                src={withBasePath("/images/Home/ajou_logo.png")}
                alt="Ajou University logo"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="footerTitle">Materials Modeling Laboratory, Ajou University</div>
          </div>
          <div className="footerGrid">
            <div className="footerBlock">
              <div className="footerLabel">Address</div>
              <div className="footerValue">
                Room 203, West Hall, Ajou University, 206 Worldcup-ro, Yeongtong-gu,
                Suwon 16499, Republic of Korea
              </div>
            </div>
            <div className="footerBlock">
              <div className="footerLabel">Contact</div>
              <div className="footerValue">Tel: +82(0)31-219-2466</div>
              <div className="footerValue">
                Email: <a href="mailto:csb@ajou.ac.kr">csb@ajou.ac.kr</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">© {year} MSQ Lab. All rights reserved.</div>
      </div>
    </footer>
  );
}
