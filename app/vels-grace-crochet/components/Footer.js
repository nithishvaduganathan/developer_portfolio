export default function Footer() {
  return (
    <footer className="vgc-footer">
      <div className="vgc-container">
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          &copy; {new Date().getFullYear()} Vels Grace Crochet. All rights reserved.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#6d4c41' }}>
          Handmade with love 🧶
        </p>
      </div>
    </footer>
  );
}
