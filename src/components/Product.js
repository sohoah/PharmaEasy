import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  //const addToCartHandler = (product) => {
  //  props.history.push(`/cart/${productId}?qty=1`);
  //};
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <div className="img-hover-zoom">
          <img className="medium" src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">{product.price} Rs</div>
          <div>
            {/*<Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
            */}
            {product.countInStock > 0 ? (
              <Link to={`/cart/${product._id}?qty=1`}>
                <i className="fa fa-shopping-cart fa-2x CI-Color"></i>
              </Link>
            ) : (
              <p style={{ color: "red" }}>out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
