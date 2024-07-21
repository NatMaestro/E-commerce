import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";

function Checkout() {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [payresult, setPayresult] = useState("");
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setCartItems,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      } = useStateContext();

    const url = "https://grandmafoods.com.ng/paystack_API";

    const router = useRouter();

    // Load Paystack script dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
        document.body.removeChild(script);
        };
    }, []);

    const payWithPaystack = async (e) => {
        e.preventDefault();

        const handler = PaystackPop.setup({
        key: "pk_test_0b4ea1418ce3bb47e7049bc41b2a0f6d5c012ea9", // Replace with your public key
        email: email,
        amount: amount * 100,
        currency: "GHS",
        ref: "" + Math.floor(Math.random() * 1000000000 + 1), // Generates a pseudo-unique reference. Replace with a reference you generated, or remove the line entirely so the API generates one for you.
        onClose: function () {
            alert("Window closed.");
        },
        callback: function (response) {
            let message = "Payment complete! Reference: " + response.reference;
            setPayresult(message);
            // Optionally, you can send this reference to your backend to verify the transaction
            
        },
        });

        handler.openIframe();
    };
    return (
        <div>
          <div className="w3-container w3-row">
            <div className="w3-container w3-green">
              <h1 className="w3-center">Payment</h1>
              <pre>{payresult}</pre>
            </div>
            <div className="w3-container w3-quarter"></div>
            <div className="w3-container w3-half">
              <div className="w3-container w3-card-4"></div>
              <form onSubmit={payWithPaystack}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w3-input w3-border w3-round-large"
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={() => setAmount(totalPrice)}
                    className="w3-input w3-border w3-round-large"
                  />
                </div>
                <div>
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w3-input w3-border w3-round-large"
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w3-input w3-border w3-round-large"
                  />
                </div>
                <div>
                  <input
                    className="w3-btn w3-green w3-block"
                    type="submit"
                    value="Pay with Paystack"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

export default  Checkout