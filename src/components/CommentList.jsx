import CommentCard from './CommentCard';

export default function CommentList({ comments }) {
	console.log("Rendering with comments:", comments);

	return (
		<div className="comment-list">
			<h2>Comments</h2>
			{comments && comments.length > 0 ? (
				comments.map((comment) => (
					<CommentCard key={comment.comment_id} comment={comment} />
				))
			) : (
				<p>No comments available.</p>
			)}
		</div>
	);
}