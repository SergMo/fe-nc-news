
export default function ArticleCard({ article }) {

	return (
		<div className="article-card">
			<h2>{article.title}</h2>
			<p>Author: {article.author}</p>
			<p>Topic: {article.topic}</p>
			<p>Date: {article.created_at}</p>
			<p>Votes: {article.votes}</p>
			<img src={article.article_img_url} alt={article.title} />
		</div>
	)
}
