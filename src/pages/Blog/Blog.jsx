import { useState, useEffect } from 'react';
import { client } from '../../client';
import BlogPost from './BlogPost';
import { Loading, PageLayout } from '../../components';
import './Blog.css';
import BlogHelmet from './BlogHelmet';

const Blog = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		function timeout() {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
		const query = '*[_type == "post"]{..., categories[]->{title}}';
		client.fetch(query).then(timeout());
	}, []);

	return (
		<>
			<PageLayout>
				<BlogHelmet />
				{isLoading ? (
					<Loading />
				) : (
					<>
						<div className='ct__blog-heading-container'>
							<h1>Discover</h1>
							<h4>New Articles</h4>
						</div>
						<BlogPost />
					</>
				)}
			</PageLayout>
		</>
	);
};

export default Blog;
