import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from './../redux/actions/handleSearch/index';

const Navbar: React.FC = () => {
  const searchText = useSelector((state:AppState) => state.searchText);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-light bg-light mb-2">
      <h3 className="text-muted">Notes App</h3>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
      </form>
      <Link to="/create-note" className="btn btn-success">
        Add new note
      </Link>
    </nav>
  );
};

export default Navbar;
