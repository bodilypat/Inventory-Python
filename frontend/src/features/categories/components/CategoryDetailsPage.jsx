/* **************************************************************** */
/* File: src/features/categories/components/CategoryDetailsPage.jsx */ 
/* **************************************************************** */

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button, Loading, ErrorMessage } from "../../../components/ui";

import CategoryDetail from "../components/CategoryDetails";
import { useCategories } from "../hooks/useCategories";

const CategoryDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        category,
        loading,
        error,
        fetchCategory,
    } = useCategories();

    useEffect(() => {

        if (id) {
            fetchCategory(id);
        }
    }, [id, fetchCategory]);

    const handleBack = () => {
        navigate("/categories");
    };

    if (!loadin && !category) {
        return (
            <section className=""
        )
    }
}
