// src/normal/Normalpage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Normalpage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/category/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (err) {
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) return <h3>Loading categories...</h3>;
    if (error) return <h3 className="text-danger">Error: {error}</h3>;

    return (
        <div className="normal-container">
            <h2>Select a Category</h2>
            <div className="category-list">
                {categories.map(category => (
                    <Link to={`/normal/category/${category.cid}`} key={category.cid} className="category-card">
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Normalpage;