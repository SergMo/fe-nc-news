import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default function MainPage() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 10;

	useEffect(() => {
		axios
			.get('https://news-project-baar.onrender.com/api/articles/')
			.then((response) => {
				setArticles(response.data.articles);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching article:', error);
				setError(error);
				setLoading(false);
			});
	}, []);

	const indexOfLastArticle = currentPage * articlesPerPage; //10= 1*10
	const indexOfFirstArtcile = indexOfLastArticle - articlesPerPage; //0= 10-10 
	const currentArticles = articles.slice(indexOfFirstArtcile, indexOfLastArticle);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	}
	return (
		<div className='main-page'>
			<h1>Main Page</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error loading articles. Please try again later.</p>
			) : (
				<div>
					{currentArticles.map((article) => (
						<Link key={article.article_id} to={`/articles/${article.article_id}`}>
							<ArticleCard
								article={article}
							/>
						</Link>
					))}
				</div>
			)}
			<Pagination
				articlesPerPage={articlesPerPage}
				totalArticles={articles.length}
				onPageChange={handlePageChange}
			/>

		</div>
	)
}
