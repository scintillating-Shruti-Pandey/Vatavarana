import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const formatSuggestion = (item) => {
  const parts = [item.name, item.state, item.country].filter(Boolean);
  return parts.join(', ');
};

export const SearchBar = ({ onSearch, onLocation, fetchSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (typeof fetchSuggestions !== 'function') {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    const debounceId = window.setTimeout(async () => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      const results = await fetchSuggestions(trimmedQuery);

      if (requestIdRef.current !== requestId) {
        return;
      }

      setSuggestions(results);
      setIsOpen(results.length > 0);
    }, 250);

    return () => window.clearTimeout(debounceId);
  }, [fetchSuggestions, query]);

  const selectedSuggestionLabel = useMemo(() => {
    return suggestions.length > 0 ? formatSuggestion(suggestions[0]) : '';
  }, [suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(selectedSuggestionLabel || query.trim());
      setQuery('');
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const label = formatSuggestion(suggestion);
    setQuery(label);
    setSuggestions([]);
    setIsOpen(false);
    onSearch(label);
  };

  return (
    <div className="search-container">
      <form className="search-input-wrapper" onSubmit={handleSubmit}>
        <div className="search-field">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a city, state, or country..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
          />

          {isOpen && suggestions.length > 0 && (
            <div className="search-suggestions" role="listbox" aria-label="Location suggestions">
              {suggestions.map((suggestion) => {
                const label = formatSuggestion(suggestion);

                return (
                  <button
                    key={`${suggestion.lat}-${suggestion.lon}-${label}`}
                    type="button"
                    className="search-suggestion"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <MapPin size={14} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
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
