import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // console.log(basket.length);

  return (
    <>
      <section className={classes.fixed}>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            {/* logo section */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* Search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search product" />
            <BsSearch size={40} />
          </div>

          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
                alt="English"
              />
              <section>
                <option value="">EN</option>
              </section>
            </Link>
            {/* three components */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p style={{ fontSize: "16px" }}>
                      Hello {user?.email?.split("@")[0]}
                    </p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "16px" }}>Hello, Sign in</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* Orders */}
            <Link
              to="/orders
          "
            >
              <p style={{ fontSize: "16px" }}>returns</p>
              <span>& Orders</span>
            </Link>
            {/* Carts */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
