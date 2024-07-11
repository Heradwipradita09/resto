import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantDetail = ({ restaurant }) => {
    // Sorting menu items by totalDibeli descending
    const sortedMenu = [...restaurant.menu].sort((a, b) => b.jml_dipesan - a.jml_dipesan);

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>{restaurant.resto}</Card.Title>
                <ListGroup variant="flush">
                    {sortedMenu.map((menuItem, index) => (
                        <ListGroup.Item key={index}>
                            {menuItem.name} <br />
                            <small>{menuItem.jml_dipesan}x dipesan</small> <br />
                            Kategori: {menuItem.kategori}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default RestaurantDetail;
