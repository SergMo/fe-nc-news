import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import CommentsList from './CommentsList';


export default function ArticleDetailPage() {
	const [article, setArticle] = useState({});
	const [loading, setLoading] = useState(true)
	const { article_id } = useParams();

	useEffect(() => {
		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${article_id}`)
			.then(({ data }) => {
				setArticle(data.article);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching article: ', err);
				setLoading(false);
			});
	}, [article_id]);

	return (
		<div className="article-detail-page">
			<h1>Article Detail Page</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<ArticleCard article={article} />
					<CommentsList articleId={article_id} />
				</div>

			)}
		</div>
	)
}
