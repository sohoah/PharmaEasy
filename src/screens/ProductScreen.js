import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    product.price = product.price - product.price * 0.2;

    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const DiscountaddToCartHandler = (discount) => {
    props.history.push(`/dcart/${productId}?qty=${qty}?price+${discount}`);
  };

  const discountHandeler = () => {
    {
      setDiscount(product.price - product.price * 0.2);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  const [discount, setDiscount] = useState(0);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                style={{ width: "90%" }}
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : {product.price} Rs</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    {/** 
                    Seller{" "}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                    */}
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">{product.price} Rs</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>

                  {/* 
                 YAHAN HM NY WISHLIST IMPLEMENT KRNA HY
                 JUST LIKE CART USER NUMBER OF PRODUCT SAVE KR K UNAVAILABLE PARTS KO ORDER KR SKTA HY
                 IS MEIN PAYMENT METHOD AVAILABILITY PY ALLOW HO JYE GA
                 PRODUCT KO RESERVE KR PAYE 
                 Mr. Majid Bashir - Feb 26, 2021, 10:57 AM
                 > Allow customer to book (order) currently unavailable parrts
                 {product.countInStock == 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToWishListHandler}
                          className="primary block"
                        >
                          Add to WishList
                        </button>
                      </li>
                    </>
                  )}
                  */}

                  {product.countInStock > 0 ? (
                    <>
                      <li>
                        <div className="row">
                          <div>In Stock</div>
                          <div>{product.countInStock} items</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div>Select Qty</div>
                          <div>
                            <input
                              style={{
                                width: "25%",
                                marginLeft: "65%",
                                borderRadius: "5rem",
                                alignContent: "center",
                              }}
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            ></input>
                            {/**  <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x+1}
                                  </option>
                                )
                              )}
                                </select>
                                */}
                          </div>
                        </div>
                      </li>

                      <li>
                        {qty <= product.countInStock && qty > 0 ? (
                          <>
                            <button
                              onClick={addToCartHandler}
                              className="primary block"
                            >
                              Add to Cart
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              disabled="true"
                              className="dangercart block"
                            >
                              Please Select Valid Option
                            </button>
                          </>
                        )}
                      </li>
                    </>
                  ) : (
                    <div>
                      <ul>
                        <li>
                          <div className="row">
                            {discount == 0 && (
                              <button
                                onClick={discountHandeler}
                                className="primary block"
                              >
                                Show Discounted Price
                              </button>
                            )}

                            <div>Discount Price</div>
                            <div className="price danger">{discount}Rs</div>
                            <button
                              onClick={() => {
                                DiscountaddToCartHandler(discount);
                              }}
                              className="primary block"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
