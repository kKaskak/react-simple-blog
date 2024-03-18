import { useState, useEffect } from 'react';
import { client } from '../../client';
import BlogHelmet from './BlogHelmet';
import BlogPost from './BlogPost/BlogPost';
import { Loading, PageLayout } from '../../components';
import './Blog.css';

const Blog = () => {
	const [isLoading, setIsLoading] = useState(true);

	const timeout = () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	useEffect(() => {
		const query = '*[_type == "post"]{..., categories[]->{title}}';
		client.fetch(query).then(timeout());
	}, []);

	return (
		<>
			<PageLayout>
				<BlogHelmet />
				{
					isLoading ?
						<Loading />
					:
						<>
							<div className='blog-heading-container'>
								<h1>Discover</h1>
								<h4>New Articles</h4>
							</div>
							<BlogPost />
						</>
				}
			</PageLayout>
		</>
	);
};

export default Blog;
