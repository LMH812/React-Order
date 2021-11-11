import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(null)
    useEffect(() => {
        const fetchMeals = async function () {
            setIsLoading(true)
            const response = await fetch('https://nextjs-course-576a8-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()
            const loadMeals = []
            for (const key in responseData) {
                loadMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadMeals)
            setIsLoading(false)
        }
        fetchMeals().catch((error) => {
            setIsLoading(false)
            setHasError(error.message)
        })
    }, [])

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if (hasError) {
        return (
            <section>
                <p className={classes.mealsError}>{hasError}</p>
            </section>
        )
    }
    const mealsList = meals.map((meal) => (
        <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    ))
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
