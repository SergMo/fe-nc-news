import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';



export default function CommentsList({ articleId }) {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`https://news-project-baar.onrender.com/api/articles/${articleId}/comments`)
			.then(({ data }) => {
				setComments(data.comments);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching comments: ', err);
				setLoading(false);
			})
	}, [articleId]);

	return (
		<div className="comment-list">
			<h2>Comments</h2>
			{loading ? (
				<p>Loading comments...</p>
			) : comments.length > 0 ? (
				comments.map((comment) => (
					<CommentCard key={comment.comment_id} comment={comment} />
				))
			) : (
				<p>No comments available.</p>
			)}
		</div>
	);
}
