import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items); // Get items from Redux

    const handleRemove = (name) => {
        dispatch(removeItem(name));
    };

    const handleQuantityChange = (name, newQuantity) => {
        if (newQuantity < 1) return; // Avoid quantity < 1
        dispatch(updateQuantity({ name, quantity: newQuantity }));
    };

    const totalCost = cartItems.reduce((total, item) => {
        return total + item.cost * item.quantity;
    }, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div className="cart-card" key={index}>
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>Unit Price: ${item.cost}</p>
                                <p>Total: ${item.cost * item.quantity}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item.name, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.name, item.quantity + 1)}>+</button>
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item.name)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="cart-footer">
                <h3>Total Cost: ${totalCost}</h3>
                <button onClick={onContinueShopping}>Continue Shopping</button>
                <button>Checkout</button>
            </div>
        </div>
    );
}

export default CartItem;