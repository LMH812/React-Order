import { useState, useRef } from 'react'
import classes from './CheckOut.module.css'

const isEmpty = (value) => value.trim() === ''
const isFiveCheck = (value) => value.trim().length === 5

const CheckOut = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    })
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()
    const confirmHandler = (event) => {
        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enterNameIsValid = !isEmpty(enteredName)
        const enterStreetIsValid = !isEmpty(enteredStreet)
        const enterPostalIsValid = isFiveCheck(enteredPostal)
        const enterCityIsValid = !isEmpty(enteredCity)
        console.log(enterPostalIsValid)
        const isValid = enterNameIsValid && enterStreetIsValid && enterPostalIsValid && enterCityIsValid
        setFormInputsValidity({
            name: enterNameIsValid,
            street: enterStreetIsValid,
            postal: enterPostalIsValid,
            city: enterCityIsValid,
        })
        console.log(isValid)
        if (!isValid) {
            return
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity,
        })
    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name ? classes.invalid : ''}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.street ? classes.invalid : ''}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postal ? classes.invalid : ''}`}>
                <label htmlFor="PostalCode">Postal Code</label>
                <input type="text" id="PostalCode" ref={postalInputRef} />
                {!formInputsValidity.postal && <p>Please enter a valid postal!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.city ? classes.invalid : ''}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOut
