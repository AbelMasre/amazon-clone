import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const [cardError, setCardError] = useState(null);

  const [processing, setProcessing] = useState(false);

  // console.log(user.email);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // 1. get client secrete

    try {
      setProcessing(true);

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;

      // 2. client conformation (react side conformation)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(confirmation);
      // 3. after the conformation, clear basket and send to order page

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // clear the basket

      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header for payment */}
      <div className={classes.payment__header}>
        <h2>Checkout ({totalItem}) items</h2>
      </div>
      {/* payment methode */}
      <section className={classes.payment}>
        {/* addresses */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Lideta, saotome street</div>
            <div>Addis Ababa, LD</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small
                    style={{
                      color: "red",
                    }}
                  >
                    {cardError}
                  </small>
                )}
                {/* card */}
                <CardElement onChange={handleChange} />
                {/* Price */}
                <div className={classes.payment__price}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        gap: "15px",
                        padding: "15px 0px",
                      }}
                    >
                      <p>Total Order </p>| <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div>
                        <ClipLoader color="black" size={15} />
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
