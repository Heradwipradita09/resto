import React, { useEffect, useState } from 'react';
import jsonData from '../../data/data.json'; // Pastikan path ini sesuai dengan lokasi file data.json
import { FaStar } from 'react-icons/fa'; // Import FaStar untuk ikon bintang

const PopularCategoriesPage = () => {
    const [popularCategories, setPopularCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const categoryMap = new Map();

        // Menghitung total pesanan per kategori dari semua restoran
        jsonData.forEach(resto => {
            resto.menu.forEach(menuItem => {
                const { kategori, jml_dipesan } = menuItem;
                if (categoryMap.has(kategori)) {
                    categoryMap.set(kategori, categoryMap.get(kategori) + jml_dipesan);
                } else {
                    categoryMap.set(kategori, jml_dipesan);
                }
            });
        });

        // Mengubah Map menjadi array dan mengurutkannya berdasarkan jumlah pesanan dari yang terbesar
        const sortedCategories = [...categoryMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([kategori, totalPemesanan]) => ({ kategori, totalPemesanan }));

        setPopularCategories(sortedCategories);
    }, []);

    const handleCategoryClick = (kategori) => {
        setSelectedCategory(kategori);
    };

    const getRestaurantsByCategory = (kategori) => {
        return jsonData.filter(resto =>
            resto.menu.some(menuItem => menuItem.kategori === kategori)
        ).sort((a, b) => b.rating - a.rating); // Mengurutkan berdasarkan rating tertinggi ke terendah
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

    return (
        <div className="container-fluid">
            <h1 className="my-4">Kategori Populer</h1>
            <div className="row">
                <div className="col-md-4">
                    {popularCategories.map((category, index) => (
                        <div className="card mb-4" key={index}>
                            <div className={`card-body ${selectedCategory === category.kategori ? 'bg-primary text-white' : ''}`}>
                                <h5 className="card-title">Kategori {category.kategori}</h5>
                                <p className="card-text">Total Pemesanan: {category.totalPemesanan}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleCategoryClick(category.kategori)}
                                >
                                    Lihat Restoran dengan Kategori Ini
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-8">
                    {selectedCategory && (
                        <div className="selected-category-wrapper" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h2>Restoran dengan Kategori {selectedCategory}</h2>
                            <div className="row">
                                {getRestaurantsByCategory(selectedCategory).map(restaurant => (
                                    <div className="col-md-4 mb-4" key={restaurant.resto}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{restaurant.resto}</h5>
                                                <p className="card-text">
                                                    Rating: {restaurant.rating}/5 <br />
                                                    {renderRatingStars(restaurant.rating)}
                                                </p>
                                                <ul className="list-group list-group-flush">
                                                    <h6 className="card-subtitle mb-2 text-muted">Menu:</h6>
                                                    {restaurant.menu.filter(menuItem => menuItem.kategori === selectedCategory).map((menuItem, index) => (
                                                        <li key={index} className="list-group-item">
                                                            <strong>{menuItem.name}</strong> - {menuItem.jml_dipesan}x dipesan
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopularCategoriesPage;
