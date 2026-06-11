import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export const SearchBar = ({ onSearch, onLocation }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="search-container">
      <form className="search-input-wrapper" onSubmit={handleSubmit}>
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a city..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <button 
        className="icon-btn" 
        onClick={onLocation} 
        title="Use my location"
      >
        <MapPin size={24} />
      </button>
    </div>
  );
};
