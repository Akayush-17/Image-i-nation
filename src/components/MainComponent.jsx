import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const MainComponent = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const observer = useRef();
  const lastCatElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const fetchCats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`);
      setCats(prevCats => [...prevCats, ...response.data]);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cat images. Please try again.');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cat Image Gallery</h1>

      {error && <p className="text-red-500">{error}</p>}

      {cats.length === 0 && !loading && !error && (
        <p className="text-gray-600">No cat images to display. Scroll down to load images!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cats.map((cat, index) => (
          <div 
            key={cat.id} 
            ref={index === cats.length - 1 ? lastCatElementRef : null}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={cat.url} alt="Cat" className="w-full h-48 object-cover" />
            
          </div>
        ))}
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
