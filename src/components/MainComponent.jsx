import React, { useState } from 'react';
import axios from 'axios';

const MainComponent = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
      setCats(response.data);
    } catch (err) {
      setError('Failed to fetch cat images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cat Image Gallery</h1>
      <button
        onClick={fetchCats}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Fetch Cat Images
      </button>

      {loading && <p className="text-gray-600">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && cats.length === 0 && (
        <p className="text-gray-600">No cat images to display. Click the button to fetch some!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cats.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={cat.url} alt="Cat" className="w-full h-48 object-cover" />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
