
export default function Pagination({ articlesPerPage, totalArticles, onPageChange }) {
	const pageNumbers = [];

	for (let i = 1; i < Math.ceil(totalArticles / articlesPerPage); i++) {
		pageNumbers.push(i)
	}

	const handlePageClick = (pageNumber) => {
		onPageChange(pageNumber)
	}
	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<button onClick={() => handlePageClick(number)} className="page-link">
							{number}
						</button>
					</li>
				))}
			</ul>

		</nav>
	)
}
