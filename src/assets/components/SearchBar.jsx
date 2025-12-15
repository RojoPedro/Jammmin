import React from "react";

const SearchBar = ({searchFunc}) =>{
    return (<>
        <p>Search a song:</p>
        <input type="text" onChange={({target})=>searchFunc(target.value)}/>
        <br></br>
    </>)
}

export default SearchBar;