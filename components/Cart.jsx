import React from "react";
import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { useRouter } from 'next/router';
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const router = useRouter();
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handlePayment = async () => {
    router.push('/checkout'); // Redirect to checkout page
    setShowCart(false);
  };

  let cartDisplay = null;
  let cartDisplay2 = null;

  if (cartItems.length < 1) {
    cartDisplay = (
      <div className="empty-cart">
        <AiOutlineShopping size={150} />
        <h3>Your shopping bag is empty</h3>
        <Link href={"/product/bestindex"}>
          <button
            type="button"
            onClick={() => setShowCart(false)}
            className="btn"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  } else if (cartItems.length >= 1) {
    cartDisplay2 = cartItems.map((item) => (
      <div className="product" key={item._id}>
        <img src={urlFor(item?.image[0])} className="cart-product-image" />
        <div className="item-desc">
          <div className="flex top">
            <h5>{item.name}</h5>
            <h4>Gh {item.price}</h4>
          </div>
          <div className="flex bottom">
            <div>
              <p className="quantity-desc">
                <span
                  className="minus"
                  onClick={() => toggleCartItemQuantity(item._id, "dec")}
                >
                  <AiOutlineMinus />
                </span>
                <span className="num" onClick="">
                  {item.quantity}
                </span>
                <span
                  className="plus"
                  onClick={() => toggleCartItemQuantity(item._id, "inc")}
                >
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <button
              type="button"
              className="remove-item"
              onClick={() => onRemove(item)}
            >
              <TiDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  let subDisplay = null;

  if (cartItems.length >= 1) {
    subDisplay = (
      <div className="cart-bottom">
        <div className="btn-container">
          <button type="button" className="btn-stripe" onClick={handlePayment}>
            Pay With Stripe
          </button>
          <button type="button" className="btn-momo" onClick={handlePayment}>
            Pay With Momo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        <div className="total">
          <h3>Subtotal:</h3>
          <h3>Gh {totalPrice}</h3>
        </div>
        {cartDisplay}
        <div className="product-container">
          {cartDisplay2}
          {subDisplay}
        </div>
      </div>
    </div>
  );
};

export default Cart;
