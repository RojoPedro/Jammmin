import React from "react";

const Playlist = ({tracks,title,onRemove,setTitle}) =>{

    return (
        <>  
            <>------------------------------------------</>
            <br></br>
            <input value={title} onChange={({target})=>setTitle(target.value)} type="text"/>
            {tracks.length ?    
            tracks.map(track=>{ return (<div key={track.id}>
                                    <h3>{track.name}</h3>
                                    <p>{track.artist} | {track.album}</p>
                                    <button onClick={()=>onRemove(track.id)}>&times;</button>
                                </div>)}) : 
            <p>No tracks in playlist</p>}
        </>
    )
}

export default Playlist;