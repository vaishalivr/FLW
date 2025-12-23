<script>
	import { currentView } from './store.js';

	const goBackToDrawing = () => {
		currentView.set('drawing');
	};
</script>

<div class="about-page">
	<div class="about-header">
		<button class="back-button" on:click={goBackToDrawing}>← Back to Drawing</button>
		<h1>Frank Lloyd Wright</h1>
	</div>

	<div class="about-content">
		<div class="architect-info">
			<div class="info-section">
				<h2>About the Architect</h2>
				<p>
					Frank Lloyd Wright (1867-1959) was an American architect, designer, writer, and educator 
					who designed more than 1,000 structures over a creative period of 70 years. Wright played 
					a key role in the architectural movements of the twentieth century, influencing architects 
					worldwide through his works and mentoring hundreds of apprentices in his Taliesin Fellowship.
				</p>
			</div>

			<div class="info-section">
				<h2>Architectural Philosophy</h2>
				<p>
					Wright believed in designing in harmony with humanity and the environment, a philosophy 
					he called "organic architecture." This philosophy was exemplified in Fallingwater (1935), 
					which has been called "the best all-time work of American architecture."
				</p>
			</div>

			<div class="info-section">
				<h2>Notable Works</h2>
				<ul>
					<li><strong>Fallingwater (1935)</strong> - Mill Run, Pennsylvania</li>
					<li><strong>Unity Temple (1908)</strong> - Oak Park, Illinois</li>
					<li><strong>Guggenheim Museum (1959)</strong> - New York City</li>
					<li><strong>Robie House (1910)</strong> - Chicago, Illinois</li>
					<li><strong>Taliesin (1911)</strong> - Spring Green, Wisconsin</li>
				</ul>
			</div>

			<div class="info-section">
				<h2>Design Principles</h2>
				<ul>
					<li>Harmony between humanity and environment</li>
					<li>Integration of site and structure</li>
					<li>Use of natural materials</li>
					<li>Horizontal lines and open spaces</li>
					<li>Built-in furniture and lighting</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.about-page {
		flex: 4;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		background: white;
	}

	.about-header {
		border-bottom: 3px solid black;
		padding: 20px;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.back-button {
		background: white;
		border: 2px solid black;
		padding: 8px 16px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.back-button:hover {
		background: black;
		color: white;
	}

	h1 {
		margin: 0;
		font-size: 24px;
		font-weight: 600;
		letter-spacing: 1px;
	}

	.about-content {
		flex: 1;
		padding: 30px;
		overflow-y: auto;
	}

	.architect-info {
		max-width: 800px;
		margin: 0 auto;
	}

	.info-section {
		margin-bottom: 30px;
	}

	h2 {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 15px;
		border-bottom: 1px solid black;
		padding-bottom: 5px;
	}

	p {
		line-height: 1.6;
		margin-bottom: 15px;
		color: #333;
	}

	ul {
		line-height: 1.6;
		color: #333;
	}

	li {
		margin-bottom: 8px;
	}

	strong {
		font-weight: 600;
	}
</style>