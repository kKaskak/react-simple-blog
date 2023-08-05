import React from "react";
import "./FeaturedArticle.css";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";
const FeaturedArticle = ({ article }) => {
  if (!article) {
    return null;
  }
  // Destucturing objects
  const {
    title,
    categories,
    desc,
    previewImage,
    author,
    slug,
    titleColorFeatured,
  } = article || {};
  const { image, name } = author;

  return (
    <motion.div className="ct__featured-article__article">
      <img src={urlFor(previewImage).url()} alt={title} />
      <div className="ct__featured-article__article-components">
        <p>{categories?.map((category) => category.title).join(", ")}</p>
        <h1 style={{ color: `${titleColorFeatured}` }}>{title}</h1>
        <div className="ct__featured-article__article-components-ba">
          <Link style={{ textDecoration: "none" }} to={`/blog/${slug.current}`}>
            <button>
              Read article <FiArrowUpRight style={{ marginLeft: 5 }} />
            </button>
          </Link>
          <div className="ct__featured-article__article-components-article">
            <img src={urlFor(image).url()} alt={name} />
            <p>by {name}</p>
          </div>
        </div>
      </div>
      <div className="ct__featured-article__article-desc">
        <div className="ct__featured-article__article-line"></div>
        <p>{desc}</p>
      </div>
    </motion.div>
  );
};

export default FeaturedArticle;
