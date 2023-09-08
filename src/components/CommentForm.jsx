import { useState } from "react";

export default function CommentForm({ onSubmit }) {
	const [username, setUsername] = useState('');
	const [newComment, setNewComment] = useState('');

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting comment...");

		if (username.trim() === '' || newComment.trim() === '') {
			alert("Both username and comment must be filled out!");
			return;
		}

		if (onSubmit) {
			onSubmit(username, newComment);
		}
		setNewComment('');
		setUsername('');
	}

	return (
		<div className="comment-form">
			<h3>Add a Comment</h3>
			<form onSubmit={handleCommentSubmit}>
				<input
					type="text"
					placeholder="Enter your username..."
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<textarea
					placeholder="Write your comment..."
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
