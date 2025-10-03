import React from "react";

const SearchInput = ({ value, onChange, onSearch, placeholder }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="search-input">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchInput;