import { Link } from "react-router-dom";
import kitchen from "./PHOTOS/kitchen.png";
import { useState } from "react";

const Heading = () => (
  <Link to="/">
    <img src={kitchen} alt="logo" className="logo" />
  </Link>
);

const HeaderComponent = () => {
  const [title, settitle] = useState("FOOD PARADISE");
  const [style, setStyle] = useState("dark");
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const changeTitle = () => {
    if (title !=="FOOD PARADISE" ) settitle("FOOD PARADISE");
    else settitle("DELICACY");
  };
  const changeStyle = () => {
    if (style !== "light") setStyle("light");
    else setStyle("dark");
  };
  return (
    <div className={style}>
      <Heading />
      <div >
        <h1>{title}</h1>
        <button className="title"
          onClick={() => {
            changeTitle("DELICACY");
            changeStyle("light");
          }}
        >
          CHANGE TITLE
        </button>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li><Link to="/About">About</Link>
            
          </li>
          <li><Link to="/Contact">Contact</Link></li>
          <li>Cart</li>
        </ul>
      </div>
      {isLoggedIn ? (
        <button onClick={() => setisLoggedIn(false)}>login</button>
      ) : (
        <button onClick={() => setisLoggedIn(true)}>logout</button>
      )}
    </div>
  );
};
export default HeaderComponent;
