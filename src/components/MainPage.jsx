import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';


export default function MainPage() {
	const [articles, setArticles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 10;

	useEffect(() => {
		fetch('https://news-project-baar.onrender.com/api/articles/')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setArticles(data.articles);
			})
			.catch((error) => {
				console.error('Erro fetching article:', error);
			})
	}, [])

	const indexOfLastArticle = currentPage * articlesPerPage; //10= 1*10
	const indexOfFirstArtcile = indexOfLastArticle - articlesPerPage; //0= 10-10 
	const currentArticles = articles.slice(indexOfFirstArtcile, indexOfLastArticle);

	const handePageChange = (newPage) => {
		setCurrentPage(newPage);
	}
	return (
		<div className='main-page'>
			<h1>main Page</h1>
			{currentArticles.map((article) => (
				<ArticleCard
					key={article.article_id}
					article={article}
				/>))}

			<Pagination
				articlesPerPage={articlesPerPage}
				totalArticles={articles.length}
				onPageChange={handePageChange}
			/>

		</div>
	)
}
