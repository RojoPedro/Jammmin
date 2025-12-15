import React from "react";

const SearchResults = ({toRender}) =>{
    return (
        <>
            {toRender.map(track=>{
                return (<div key={track.id}>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>)
            })}
        </>
    ) 
}

export default SearchResults;