import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuTable from './daftar-menu/MenuTable';
import FavRes from './resto-fav/FavoriteRestaurants';
import PopulerCategories from './kategori-populer/PopulerCategories';

const RecommendationPage = () => {
    const location = useLocation();
    const [showFavRes, setShowFavRes] = useState(false); // State untuk menentukan tampilan
    const [activeMenuFavorit, setActiveMenuFavorit] = useState(location.pathname === '/daftar-menu-favorit');
    const [activeRestoFavorit, setActiveRestoFavorit] = useState(location.pathname === '/daftar-resto-favorit');
    const [showPopulerCategories, setShowPopulerCategories] = useState(false); // State untuk Kategori Populer

    const handleShowFavRes = () => {
        setShowFavRes(true);
        setShowPopulerCategories(false); // Pastikan state PopulerCategories tidak tampil
        setActiveMenuFavorit(false);
        setActiveRestoFavorit(true);
    };

    const handleShowMenuTable = () => {
        setShowFavRes(false);
        setShowPopulerCategories(false); // Pastikan state PopulerCategories tidak tampil
        setActiveMenuFavorit(true);
        setActiveRestoFavorit(false);
    };

    const handleShowPopulerCategories = () => {
        setShowFavRes(false);
        setShowPopulerCategories(true); // Tampilkan halaman PopulerCategories
        setActiveMenuFavorit(false);
        setActiveRestoFavorit(false);
    };

    return (
        <div className="container">
            <h1 className="my-4">Rekomendasi Tempat Makan di Ibik</h1>
            <div className="d-flex mb-3">
                <Link
                    to="/daftar-menu-favorit"
                    className={`btn btn-outline-primary me-2 ${activeMenuFavorit ? 'active' : ''}`}
                    onClick={handleShowMenuTable}
                >
                    Daftar Menu Favorit
                </Link>
                <Link
                    to="/daftar-resto-favorit"
                    className={`btn btn-outline-primary me-2 ${activeRestoFavorit ? 'active' : ''}`}
                    onClick={handleShowFavRes}
                >
                    Resto Favorit
                </Link>
                <button
                    className={`btn btn-outline-primary ${showPopulerCategories ? 'active' : ''}`}
                    onClick={handleShowPopulerCategories}
                >
                    Kategori Populer
                </button>
            </div>
            {/* Tampilkan komponen yang sesuai berdasarkan state */}
            {showFavRes ? <FavRes /> : showPopulerCategories ? <PopulerCategories /> : <MenuTable />}
        </div>
    );
};

export default RecommendationPage;
