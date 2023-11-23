import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { Link } from "react-router-dom";
import kohSamui from "../images/kohSamui.png";
import locationMarker from "../images/icons8-location-30.png";
import phoneIcon from "../images/icons8-phone-30.png";
import map from "../images/icons8-map-48.png";
import SideBar from "./SideBar";
import pots from "../images/potspic.png";
import salad from "../images/saladpic.png";
import vegies from "../images/vegiespic.png";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants`
      );
      const data = await response.json();
      setRestaurants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="listCont">
        <div className="sideBar1">
          <SideBar />
        </div>
        <div className="topcont">
          <p className="photoBy"></p>

          <div className="updated">
            
          </div>

          <div className="introCont">
            <div className="intro">
              <div className="welcome">Taste Harmony, Sip Delight</div>
              Embark on a culinary adventure at DineEasy, where your dining desires take center stage.
               Whether it's an intimate dinner, a vibrant celebration, or a laid-back brunch, we're here to 
               turn your gastronomic dreams into reality. Allow DineEasy to be your trusted guide on a journey 
               filled with unforgettable flavors and exceptional dining moments.
               Welcome to a realm where every bite is a revelation, and every meal is a masterpiece.
               <b>DineEasy - Where Culinary Dreams Unfold.</b> 
            </div>
            <div className="photoGallery">
              <img src={pots} alt="restaurantPic" className="pots" />
              <img src={salad} alt="restaurantPic" className="salad" />
              <img src={vegies} alt="restaurantPic" className="vegies" />
            </div>
          </div>
          <div className="topPick">
            <p className="topPickHeading">
              This month's <strong>TOP PICK!</strong>
            </p>
            <p className="taramaHeading">
              <strong>Tarama</strong>
            </p>
            <div className="tarama">
              <img src={kohSamui} alt="Tarama" />
            </div>
            <div className="pickDialog">
              <p className="pickDescription">
              Step into the culinary magic of Tarama, where our menu weaves a tapestry of 
              authentic Indian flavors. From the aromatic spice of our Masala Chai to the 
              perfectly balanced Butter Chicken, each bite is a journey into the heart of 
              Indian cuisine. Immerse yourself in the richness of our aromatic Chicken Biryani 
              or relish the crispy delights of our Samosas. Every dish at Tarama is a work of art, 
              meticulously crafted with a touch of tradition, showcasing the culinary expertise of 
              our skilled chefs. Join us on a flavorful expedition at Tarama, where each plate tells 
              a tale, and every bite is a thrilling adventure into the captivating world of Indian gastronomy.
              </p>
            </div>
            <div className="topDetails">
              <img
                src={locationMarker}
                alt="address"
                className="addressMarker"
              />
              <p className="address">Katpadi, Vellore, Tamil Nadu</p>

              <img src={phoneIcon} alt="phone" className="phoneIcon" />
              <p className="phoneNumber">9492123137</p>
              <div className="map">
                <img src={map} alt="map" className="topMap" />
              </div>
            </div>
          </div>
          <div className="recommend">
            <h1 className="restaurantLabel">Recommended Eats</h1>
          </div>
        </div>

        <div className="mainListCont">
          <ul className="restaurantListContainer">
            {restaurants.map((restaurant) => {
              return (
                <li className="singleRestaurant" key={restaurant.id}>
                  <Link to={"/restaurants/" + restaurant.id}>
                    <img src={restaurant.image} alt={restaurant.name} />
                  </Link>

                  <div className="restaurant-info">
                    <div className="discount">{restaurant.discount}</div>
                    <div className="rating">{restaurant.rating}</div>
                    <div className="listRestaurantName">
                      <strong className="restoname">{restaurant.name}</strong>
                    </div>
                    <div className="cuisine">{restaurant.cuisine}</div>
                    <div className="morebtn">
                      <Link to={"/restaurants/" + restaurant.id}>
                        <button className="morebutton">
                          Learn More &rarr;
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RestaurantList;
