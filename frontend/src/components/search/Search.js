import React from 'react';
import styles from './Search.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <AiOutlineSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search tools"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
