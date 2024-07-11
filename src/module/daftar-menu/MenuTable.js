import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { FaSearch, FaStar } from 'react-icons/fa'; // Import FaStar untuk ikon bintang
import 'bootstrap/dist/css/bootstrap.min.css';
import jsonData from '../../data/data.json';

const MenuTable = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Mengolah data JSON untuk mendapatkan menu yang diurutkan berdasarkan total di beli
    const menuMap = new Map();
    jsonData.forEach(resto => {
      resto.menu.forEach(menuItem => {
        if (menuMap.has(menuItem.name)) {
          menuMap.get(menuItem.name).totalDibeli += menuItem.jml_dipesan;
        } else {
          menuMap.set(menuItem.name, {
            no: menuMap.size + 1,
            namaMenu: menuItem.name,
            kategori: menuItem.kategori,
            totalDibeli: menuItem.jml_dipesan,
            rating: resto.rating, // Tambahkan rating dari restoran
          });
        }
      });
    });

    // Urutkan berdasarkan total di beli tertinggi ke terendah
    const sortedData = Array.from(menuMap.values()).sort((a, b) => b.totalDibeli - a.totalDibeli);
    setMenuData(sortedData);
  }, []);

  const handleShow = (menuName) => {
    setSelectedMenu(menuName);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="my-4">Daftar Menu Favorite</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Menu</th>
            <th>Kategori</th>
            <th>Total Di Beli</th>
            <th>Lihat Rekomendasi</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.namaMenu}</td>
              <td>{item.kategori}</td>
              <td>{item.totalDibeli}</td>
              <td>
                <Button variant="link" onClick={() => handleShow(item.namaMenu)}>
                  <FaSearch />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Restoran yang Menyajikan {selectedMenu}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {jsonData
            // Urutkan resto berdasarkan rating tertinggi ke terendah
            .sort((a, b) => b.rating - a.rating)
            .map((resto, index) => (
              resto.menu
                .filter(menuItem => menuItem.name === selectedMenu)
                // Urutkan menuItem berdasarkan rating resto (b.rating - a.rating)
                .sort((a, b) => b.rating - a.rating)
                .map((menuItem, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Title>{resto.resto}</Card.Title>
                      <Card.Text>
                        <strong>Rating:</strong> {resto.rating}/5 {' '}
                        {[...Array(resto.rating)].map((star, i) => (
                          <FaStar key={i} color="gold" />
                        ))}
                        <br />
                        <strong>Jumlah Dipesan:</strong> {menuItem.jml_dipesan}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
            ))}
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default MenuTable;
