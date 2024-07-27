import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "../../Components/Product/Product.module.css";
import Loader from "../../Components/Loader/Loader";

function Result() {
  const { catagoryName } = useParams();

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(catagoryName);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${catagoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory / {catagoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                renderAdd={true}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
