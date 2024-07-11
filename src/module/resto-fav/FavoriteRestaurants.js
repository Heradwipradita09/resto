import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaStar } from 'react-icons/fa';
import jsonData from '../../data/data.json'; // Pastikan path ini sesuai dengan lokasi file data.json

const FavRes = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        // Sorting restaurants by rating from highest to lowest
        const sortedRestaurants = [...jsonData].sort((a, b) => b.rating - a.rating);
        setRestaurants(sortedRestaurants);
    }, []);

    const handleRestaurantClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const renderRatingStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <>
                {[...Array(fullStars)].map((star, index) => (
                    <FaStar key={index} color="orange" />
                ))}
                {halfStar > 0 && <FaStar key="half" color="orange" half />}
                {[...Array(emptyStars)].map((star, index) => (
                    <FaStar key={`empty-${index}`} color="grey" />
                ))}
            </>
        );
    };

    const calculateTotalOrders = (menu) => {
        return menu.reduce((total, menuItem) => total + menuItem.jml_dipesan, 0);
    };

    return (
        <div className="App container">
            <h1 className="my-4">Restoran Favorit</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        {restaurants.map((resto, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`list-group-item list-group-item-action ${selectedRestaurant === resto ? 'active' : ''}`}
                                onClick={() => handleRestaurantClick(resto)}
                            >
                                {resto.resto}
                                <br />
                                Rating: {resto.rating}/{5} <br />
                                {renderRatingStars(resto.rating)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-9">
                    {selectedRestaurant && (
                        <Card className="mb-4">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Card.Title>{selectedRestaurant.resto}</Card.Title>
                                        <Card.Text>
                                            Rating: {selectedRestaurant.rating}/{5} <br />
                                            {renderRatingStars(selectedRestaurant.rating)}
                                        </Card.Text>
                                    </div>
                                </div>
                                <hr />
                                <ListGroup variant="flush">
                                    {selectedRestaurant.menu.map((menuItem, index) => (
                                        <ListGroup.Item key={index}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{menuItem.name}</strong>
                                                    <br />
                                                    <small>{menuItem.jml_dipesan}x dipesan</small>
                                                    <br />
                                                    Kategori: {menuItem.kategori}
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Card.Footer>
                                    <small>Total Pemesanan Keseluruhan: {calculateTotalOrders(selectedRestaurant.menu)}</small>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavRes;
