import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import PropTypes from "prop-types";
import {
  SearchbarHeader,
  SearchbarForm,
  SearchbarButton,
  Searchbarlabel,
  SearchbarInput,
} from "../Searchbar/Searchbar.styled";

export default function Searchbar({ onSubmit }) {
  const [seacrhQuery, setSeacrhQuery] = useState("");

  const handleNameChange = (event) => {
    const value = event.currentTarget.value.toLowerCase();
    setSeacrhQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (seacrhQuery.trim() === "") {
      toast.error("please write clearly!");
      return;
    }
    if (seacrhQuery.length > 10) {
      toast.error("Please enter a more specific query!");
      return;
    }
    if (seacrhQuery === event) {
      return;
    }
    onSubmit(seacrhQuery);
    setSeacrhQuery("");
  };
  return (
    <SearchbarHeader>
      <ToastContainer />
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchbarButton type="submit">
          <IconContext.Provider value={{ color: "blue", size: "20px" }}>
            <BiSearch />
          </IconContext.Provider>
          <Searchbarlabel>Search</Searchbarlabel>
        </SearchbarButton>
        <SearchbarInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="seacrhQuery"
          value={seacrhQuery}
          onChange={handleNameChange}
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
