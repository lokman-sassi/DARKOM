import { useEffect, useState } from "react";
import CardItem from "./Card.js";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/account'); // Redirect to login page if not authenticated
          return;
        }
  
        try {
          const response = await fetch('http://localhost:8000/api/favorites', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
          const data = await response.json();
          setFavorites(data.favorites);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchFavorites();
    }, [navigate]);
  
    if (loading) {
      return <Spinner size="xl" />;
    }
  
    if (favorites.length === 0) {
      return <p>No listings saved.</p>;
    }
  
    return (
      <>
        {favorites.map((listing, index) => (
  <CardItem key={index} listing={listing} favorites={favorites} />
))}
      </>
    );
  }

  export default Favorites;
  
