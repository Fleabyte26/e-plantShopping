import React from 'react';
import './CartItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const CartItems = useSelector((state) => state.cart.items);

    const calculateTotalAmount = () => {
        let total = 0;
        CartItems.forEach(item => {
            const cost = parseFloat(item.cost.substring(1));
            total += cost * item.quantity;
        });
        return total.toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleContinue = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {CartItems.length === 0 ? <p>Your cart is empty.</p> : (
                <>
                    {CartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div>{item.name}</div>
                            <div>{item.cost}</div>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                {item.quantity}
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div>Subtotal: ${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}</div>
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    ))}
                    <h2>Total: ${calculateTotalAmount()}</h2>
                    <button onClick={handleContinue}>Continue Shopping</button>
                </>
            )}
        </div>
    );
}

export default