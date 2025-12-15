import React ,{useState} from "react";
import Playlist from "./Playlist.jsx";
import SearchBar from "./SearchBar.jsx";
import SearchResults from "./SearchResults.jsx";
import Track from "./Track.jsx";
import Tracklist from "./Tracklist.jsx";

const App = () => {
    const [searchResults, setSearchResults] = useState([]);

    const onSearch = () => { 
        //search functionality will go here
        const fakeFetch = [
            {name: "name", artist: "artist", album: "album", id: 1},
            {name: "name2", artist: "artist2", album: "album2", id: 2}]; 
        setSearchResults(fakeFetch)
    }

    return (
        <div>
            <SearchBar />
            <Playlist />
            <SearchResults toRender={searchResults}/>
            <Track />
            <Tracklist />
            <button>Save to Spotify</button>
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default App;
