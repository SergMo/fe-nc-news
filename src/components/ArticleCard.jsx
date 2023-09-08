import { useState } from "react";
import axios from "axios";

export default function ArticleCard({ article, showVoteButtons }) {
	const [votes, setVotes] = useState(article.votes);
	const [isError, setIsError] = useState(false);

	const handleVote = (voteChange) => {
		setVotes(votes + voteChange); // Optimistic change in votes
		axios
			.patch(`https://news-project-baar.onrender.com/api/articles/${article.article_id}`, {
				inc_votes: voteChange
			})
			.then(({ data }) => {
				setVotes(data.article.votes);
			})
			.catch((err) => {
				console.error('Error updating the vote. Please try again: ', err);
				setVotes(votes - voteChange);
				setIsError(true)
			});
	};

	return (
		<div className="article-card">
			<h2>{article.title}</h2>
			<p>Author: {article.author}</p>
			<p>Topic: {article.topic}</p>
			<p>Date: {article.created_at}</p>
			<img src={article.article_img_url} alt={article.title} />
			<p>Votes: {votes}</p>

			{showVoteButtons && (
				<div>
					<button onClick={() => { handleVote(1) }}>Upvote</button>
					<button onClick={() => { handleVote(-1) }}>Downvote</button>
				</div>
			)}
			{isError && <p>{isError}</p>}
		</div>
	)
}
