import { useDispatch } from "react-redux";
import { setSearch } from "./searchslice";
import { useState } from "react";
import "./App.css";
import { search, searchImg } from "./api/service/search";

function App() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});
  const [imageResult, setImageResult] = useState({});
  const [currentTab, setCurrentTab] = useState("search"); 

  const handleSearch = async (query) => {

    try {
      const searchQuery = query || input; 
      dispatch(setSearch(searchQuery));
      const response = await search(searchQuery);
      setResult(response.data);
      setInput(searchQuery);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  const handleImageSearch = async (query) => {
    try {
      const searchQuery = query || input;
      dispatch(setSearch(searchQuery));
      const response = await searchImg(searchQuery);
      setImageResult(response.data);
      setInput(searchQuery);
    } catch (err) {
      console.error("Image Search Error:", err);
    }
  };

  // useEffect(() => {
  //   if (currentTab === "images" && input) {
  //     handleImageSearch(input);
  //   }
  // }, [currentTab, input]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === "search" && input) {
      handleSearch(input);
    } else if (tab === "images" && input) {
      handleImageSearch(input);
    }
  };

  const performSearch = () => {
    if (currentTab === "search") {
      handleSearch();
    } else {
      handleImageSearch();
    }
  };

  const handleRelatedSearch = (query) => {
    if (currentTab === "search") {
      handleSearch(query);
    } else {
      handleImageSearch(query);
    }
  };

  return (
    <div className="app">
      <h1>Google clone</h1>
      
      <div className="search-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
          onKeyPress={(e) => e.key === 'Enter' && performSearch()}
        />
        <button onClick={performSearch}>Search</button>
      </div>

      <div className="nav-tabs">
        <button 
          className={currentTab === "search" ? "active" : ""}
          onClick={() => handleTabChange("search")}
        >
          All
        </button>
        <button 
          className={currentTab === "images" ? "active" : ""}
          onClick={() => handleTabChange("images")}
        >
          Images
        </button>
      </div>

      <div className="results">
        {currentTab === "search" && (
          <>
            {Array.isArray(result.organic) &&
              result.organic.map((item, idx) => (
                <div key={idx} className="result-item">
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <h3>{item.title}</h3>
                  </a>
                  <p>{item.snippet}</p>

                  {item.sitelinks && (
                    <ul>
                      {item.sitelinks.map((s, i) => (
                        <li key={i}>
                          <a href={s.link} target="_blank" rel="noreferrer">
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

            {Array.isArray(result.relatedSearches) && result.relatedSearches.length > 0 && (
              <div className="related-searches">
                <h3>Related Searches</h3>
                <ul>
                  {result.relatedSearches.map((rs, idx) => (
                    <li key={idx}>
                      <button
                        className="related-btn"
                        onClick={() => handleRelatedSearch(rs.query)}
                      >
                        {rs.query}
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
              )}
          </>
        )}

        {currentTab === "images" && (
          <>
            {Array.isArray(imageResult.images) && (
              <div className="image-results">
                <div className="image-grid">
                  {imageResult.images.map((img, idx) => (
                    <div key={idx} className="image-item">
                      <a href={img.link} target="_blank" rel="noreferrer">
                        <img 
                          src={img.thumbnailUrl || img.imageUrl} 
                          alt={img.title}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(result.relatedSearches) && result.relatedSearches.length > 0 && (
              <div className="related-searches">
                <h3>Related Searches</h3>
                <ul>
                  {result.relatedSearches.map((rs, idx) => (
                    <li key={idx}>
                      <button
                        className="related-btn"
                        onClick={() => handleRelatedSearch(rs.query)}
                      >
                        {rs.query}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;