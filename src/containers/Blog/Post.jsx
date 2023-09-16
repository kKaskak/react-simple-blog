import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "../../client";
import { blogCard, hover } from "./animations-blog";
import { Link } from "react-router-dom";
import "./Blog.css";

const Post = ({ post }) => {
    return (
        <motion.div
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            variants={blogCard}
            whileHover={hover}
            key={post.slug.current}
            className="ct__blog-article-component"
        >
            <Link style={{ textDecoration: "none" }} to={`/blog/${post.slug.current}`}>
                <img src={urlFor(post.previewImage)} alt={post.title} />
                <div className="ct__blog-article-component-date">
                    <p>{post.categories.map((category) => category.title).join(", ")}</p>
                    <p>{post.publishedAt}</p>
                </div>
                <div className="ct__blog-article-component-title">
                    <h3
                        style={{
                            color: `${post.titleColorCard}`,
                            filter: `${post.titleFilter}`,
                        }}
                    >
                        {post.title}
                    </h3>
                    <p>{post.desc}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default Post;
