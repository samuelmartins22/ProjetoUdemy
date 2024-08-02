import './styles.css';

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input className="styled-input"
        onChange={handleChange} 
        type="search" 
        value={searchValue}
        placeholder="type your search"/>
        
    );
}