import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [Restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);
  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=32.7386923&lng=74.8525078&restaurantId=" +
        id +
        " &catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json.data);

    setRestaurant(json?.data?.cards[2]?.card?.card?.info);
  }

  return !Restaurant ? (
    <Shimmer />
  ) : (
    <div className="RestaurantMenu ">
      <div className="RestaurantMenu1">
        <h1>restaurant id:{Restaurant.id}</h1>
        <h2>{Restaurant.name}</h2>
        <img
          className="restimg"
          src={
            " https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            Restaurant.cloudinaryImageId
          }
        />
        <h2>{Restaurant.city}</h2>
      </div>
      <div>
        <h2>{Restaurant.locality}</h2>
        <h2>{Restaurant.costForTwoMessage}</h2>
      </div>
    </div>
  );
};
export default RestaurantMenu;
