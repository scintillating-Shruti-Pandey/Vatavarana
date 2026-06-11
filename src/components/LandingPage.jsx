import { ArrowRight } from 'lucide-react';
import { PaintedMapPin, PaintedSun, PaintedWind } from './CustomIcons';

export const LandingPage = ({ onExplore }) => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1 className="main-title main-title-large">
          <span className="hindi-title">वातावरण</span>
          <span className="english-title">Vātāvaraṇa</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience the weather like never before with beautiful, dynamic, pastel-painted skies.
        </p>

        <button className="explore-btn" onClick={onExplore}>
          <span>Explore Weather</span>
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="features-section">
        <div className="feature-card glass-panel">
          <PaintedMapPin size={45} />
          <h3>Real-time Location</h3>
          <p>Get instant accurate weather data for your exact GPS coordinates with a single click.</p>
        </div>
        
        <div className="feature-card glass-panel">
          <PaintedSun size={45} />
          <h3>Detailed Forecasts</h3>
          <p>Plan your week with 5-day daily forecasts and 24-hour detailed hourly predictions.</p>
        </div>
        
        <div className="feature-card glass-panel">
          <PaintedWind size={45} />
          <h3>Dynamic Aesthetics</h3>
          <p>Watch the app transform with beautiful, AI-generated painted backgrounds matching the sky.</p>
        </div>
      </div>
    </div>
  );
};
