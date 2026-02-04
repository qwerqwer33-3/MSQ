export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">© {year} MSQ Lab. All rights reserved.</div>
    </footer>
  );
}
