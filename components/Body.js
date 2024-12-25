import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Restaurantcard = ({ name, cloudinaryImageId, avgRating,areaName }) => {
  return (
    <div className="card">
      <img
        alt="img1"
        className="img1"
        src={
          " https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
      />
      <h2>*{name}</h2>
      <h3>*{avgRating}</h3>
      <h3>*{areaName}</h3>
    </div>
  );
};

function filterData(searchtext, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchtext.toLowerCase())
  );
  return  filterData;
}

function Body() {
  const [searchtext, setsearchtext] = useState("");
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [allRestaurants, setallRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants();
  }, []);
  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.7386923&lng=74.8525078&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setfilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setallRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  return allRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchtext}
          onChange={(e) => {
            setsearchtext(e.target.value);
          }}
        />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            const data = filterData(searchtext, allRestaurants);
            setfilteredRestaurants(data);
          }}
        >
          search
        </button>
      </div>
      { filteredRestaurants.length == 0?
    (<h1>no restaurant found</h1> ):(

      <div className="restaurantlist">
        
        {filteredRestaurants.map((restaurant) => {
          return (<Link to={"/restaurant/"+ restaurant.info.id}><Restaurantcard {...restaurant.info} /></Link>) 
        })}
      </div>)}
    </>
  );
}
export default Body;
