import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import MainPage from './components/MainPage'
import ArticleDetailPage from './components/ArticleDetailPage'
import { Route, Routes } from 'react-router-dom'

function App() {


	return (
		<div className="app">
			<Header />
			<Navigation />

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/articles/:article_id" element={<ArticleDetailPage />} />
			</Routes>

		</div >
	)
}

export default App
