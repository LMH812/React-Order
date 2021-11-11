import React, { useState, useContext } from 'react'
import Modal from '../UI/Modal'
import CheckOut from './CheckOut'
import classes from './Cart.module.css'
import CartContext from '../../store/card-context'
import CartItem from './CartItem'
const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const actionCheckOutHandler = () => {
        setIsCheckOut(true)
    }

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true)
        fetch('https://react-http-7d455-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            }),
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearItem()
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    )
    const orderButton = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={actionCheckOutHandler}>
                    Order
                </button>
            )}
        </div>
    )
    const cartModelContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckOut && orderButton}
        </React.Fragment>
    )
    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    )
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModelContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
