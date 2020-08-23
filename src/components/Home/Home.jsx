import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import arrowUp from "../../assets/arrow-up.svg";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import ScrollObserver from "../../utils/ScrollObserver";
import { useScroll } from "../../utils/useScroll";

const Home = () => {
  const key = process.env.REACT_APP_PUBLIC_KEY;
  const gallery = "72157712150290108";

  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Handle initial data
  const fetchData = useCallback(
    async (page, perPage) => {
      const url = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${key}&gallery_id=${gallery}&page=${page}&per_page=${perPage}&extras=tags,path_alias&format=json&nojsoncallback=1`;
      setLoading(true);

      try {
        const res = await axios.get(url);
        const { status, data } = res;
        setLoading(false);
        return { status, data };
      } catch (e) {
        setLoading(false);
        return e;
      }
    },
    [key]
  );

  const handleInitialData = useCallback(
    async (page) => {
      const perPage = 10;
      const newPhotos = await fetchData(page, perPage);
      const { status, data } = newPhotos;
      if (status === 200) {
        setPhotos((photos) => [...photos, ...data.photos.photo]);
      }
    },
    [fetchData]
  );

  // Handle pagination
  ScrollObserver(element, handleInitialData);

  // Handle data search by input value
  const handleSearch = useCallback(async () => {
    const defaultPage = 1;
    const maxQuery = 500; // The maximum allowed value from Flickr API.
    const searchPhotos = await fetchData(defaultPage, maxQuery);
    const { status, data } = searchPhotos;

    if (status === 200) {
      let searchedPhotos = data.photos.photo;
      let searchValue = searchString.trim().toLowerCase();
      let filter = searchedPhotos.filter(({ title, tags }) => {
        if (
          (title && tags && title.toLowerCase().match(searchValue)) ||
          tags.toLowerCase().match(searchValue)
        ) {
          return true;
        }
        return false;
      });
      if (searchValue.length > 0) {
        searchedPhotos = filter;
        setSearching(true);
      }
      setSearchResults(searchedPhotos);
    }
  }, [fetchData, searchString]);

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchString);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setSearchString("");
    setSearching(false);
  };

  // Handling arrow visibility
  let arrowDisplayed = useRef(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    arrowDisplayed.current = scrollY < -300 ? true : false;
  }, [scrollY]);

  return (
    <>
      <Header
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
      />
      <main className="main">
        {searching && searchResults.length >= 0 && (
          <div className="search-info">
            <p>{searchResults.length} results</p>
            <button className="btn" onClick={resetSearch}>
              Reset
            </button>
          </div>
        )}
        {searching && searchResults.length === 0 && (
          <div className="search-empty">
            <h2>Feeling adventurous?</h2>
            <p>Try searching for:</p>
            <div className="categories">
              <p>People</p>
              <span> | </span>
              <p>Architecture</p>
              <span> | </span>
              <p>Nature</p>
            </div>
          </div>
        )}
        <Gallery
          gallery={gallery}
          photos={
            searching && searchResults.length >= 0 ? searchResults : photos
          }
        />
        {!searching && (
          <a
            href="#home"
            className={
              arrowDisplayed.current ? "arrow-hidden" : "arrow-visible"
            }
          >
            <img src={arrowUp} alt="arrow up" />
          </a>
        )}
        <div ref={setElement}>{loading && <div className="loader"></div>}</div>
      </main>
    </>
  );
};

export default Home;
