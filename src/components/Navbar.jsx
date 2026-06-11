export const Navbar = ({ onNavHome }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-logo" onClick={onNavHome} style={{ cursor: 'pointer' }}>
        <img 
          src="/favicon.png" 
          alt="Peacock feather" 
          style={{ width: '32px', height: '32px' }}
        />
        <span className="nav-title">Vātāvaraṇa</span>
      </div>
    </nav>
  );
};
