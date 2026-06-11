export const Navbar = ({ onNavHome }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-logo" onClick={onNavHome} style={{ cursor: 'pointer' }}>
        <img 
          src={`${import.meta.env.BASE_URL}favicon.png`} 
          alt="Peacock feather" 
          style={{ width: '32px', height: '32px' }}
        />
        <span className="nav-title">Vātāvaraṇa</span>
      </div>
    </nav>
  );
};
