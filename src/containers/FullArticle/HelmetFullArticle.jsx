import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetFullArticle = ({ title, desc, keywords, slug, headerImageLink }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="keywords" content={keywords} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={'https://curiositytakeover.com/blog/' + slug} />
            <meta property="og:site_name" content="Curiosity Takeover" />
            <meta property="og:image" content={headerImageLink} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="800" />
            <meta property="og:image:type" content="image/png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@curiosity__blog" />
            <meta name="twitter:site" content="@curiosity__blog" />
            <meta name="twitter:image" content={headerImageLink} />
        </Helmet>
    );
};

export default HelmetFullArticle;
