import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function ArticleDetailPage() {
	const [article, setArticle] = useState({});
	const [loading, setLoading] = useState(true);
	// const [loadingArticle, setLoadingArticle] = useState(true);
	// const [loadingComments, setLoadingComments] = useState(true);
	const [error, setError] = useState(null);
	const { article_id } = useParams();
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState(null);

	useEffect(() => {
		if (newComment) {
			setComments(prevComments => [...prevComments, newComment]);
		}
	}, [newComment]);

	useEffect(() => {

		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${article_id}`)
			.then(({ data }) => {
				setArticle(data.article);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching article: ', err);
				setError('Failed');
				setLoading(false);
			});

		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${article_id}/comments`)
			.then(({ data }) => {
				setComments(data.comments);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching comments: ', err);
				setLoading(false);
			});
	}, [article_id]);


	const handleNewComment = (username, commentBody) => {
		console.log("Handling new comment...");
		axios
			.post(`https://news-project-baar.onrender.com/api/articles/${article_id}/comments`, {
				username: username,
				body: commentBody
			})
			.then(({ data }) => {
				console.log("New comment added:", data.comment);
				setNewComment(data.comment)
				// setComments(prevComments => [...prevComments, data.comment]);
			})
			.catch((err) => {
				console.error('Error submitting comment: ', err);
				console.log('Error response:', err.response);
			});
	}


	return (
		<div className="article-detail-page">
			<h1>Article Detail Page</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<div>
					<ArticleCard article={article} showVoteButtons={true} />
					<CommentForm onSubmit={handleNewComment} />
					<CommentList articleId={article_id} comments={comments} />
				</div>
			)}
		</div>
	)
}