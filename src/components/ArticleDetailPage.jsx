import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import CommentCard from './CommentCard';


export default function ArticleDetailPage() {
	const [article, setArticle] = useState({});
	const [comments, setComments] = useState([])
	const [loading, setLoading] = useState(true)
	const { article_id } = useParams();

	useEffect(() => {
		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${article_id}`)
			.then(({ data }) => {
				setArticle(data.article);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching article: ', error);
				setLoading(false);
			});

		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${article_id}/comments`)
			.then(({ data }) => {
				setComments(data.comments)
			})
			.catch((error) => {
				console.error('Error fetching comments: ', error);
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
					<h2>Comments</h2>
					{comments.map((comment) => (
						<CommentCard key={comment.comment_id} comment={comment} />
					))}
				</div>

			)}
		</div>
	)
}
