import Cart from "../models/Cart";
import React from "react";

interface CartButtonProps {
    cart: Cart
}

export function CartButton(props: CartButtonProps) {
    return (
        <div className="navbar-item">
            <button
                className="button is-dark has-text-weight-bold" >
                <span className="icon">
                    <i className="fas fa-shopping-cart"></i>
                </span>
                <span>Cart</span>
                {getCartCount(props.cart)}
            </button >
        </div>
    );
}

function getCartCount(cart: Cart) {
    if(cart.getItineraries.length > 0)
        return <div className="numberCircle">{cart.getItineraries.length}</div>;
    return;
}