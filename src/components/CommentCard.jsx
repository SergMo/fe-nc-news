
export default function CommentCard({ comment }) {
	return (
		<div className="comment-card">
			<h4>{comment.author}</h4>
			<p>{comment.body}</p>
			<p>Votes: {comment.votes}</p>
			<p>Date: {comment.created_at}</p>
		</div>
	);
}
