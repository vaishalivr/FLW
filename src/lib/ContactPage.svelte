<script>
	import { currentView } from './store.js';

	const goBackToDrawing = () => {
		currentView.set('drawing');
	};
</script>

<div class="contact-page">
	<div class="contact-header">
		<button class="back-button" on:click={goBackToDrawing}>← Back to Drawing</button>
		<h1>Contact & Visit</h1>
	</div>

	<div class="contact-content">
		<div class="contact-info">
			<div class="info-section">
				<h2>Frank Lloyd Wright Foundation</h2>
				<p>
					The Frank Lloyd Wright Foundation continues to preserve and share Wright's architectural 
					legacy through education, preservation, and public programs at Taliesin and Taliesin West.
				</p>
			</div>

			<div class="info-section">
				<h2>Visit Taliesin</h2>
				<div class="location">
					<h3>Taliesin - Spring Green, Wisconsin</h3>
					<p><strong>Address:</strong> 5481 County Road C, Spring Green, WI 53588</p>
					<p><strong>Phone:</strong> (608) 588-7900</p>
					<p><strong>Tours:</strong> Available May through October</p>
					<p>Wright's home, studio, and school in the beautiful Wisconsin countryside.</p>
				</div>
			</div>

			<div class="info-section">
				<h2>Visit Taliesin West</h2>
				<div class="location">
					<h3>Taliesin West - Scottsdale, Arizona</h3>
					<p><strong>Address:</strong> 12621 N Frank Lloyd Wright Blvd, Scottsdale, AZ 85259</p>
					<p><strong>Phone:</strong> (480) 860-2700</p>
					<p><strong>Tours:</strong> Available year-round</p>
					<p>Wright's winter home and desert laboratory in the Sonoran Desert.</p>
				</div>
			</div>

			<div class="info-section">
				<h2>Other Wright Sites</h2>
				<ul>
					<li><strong>Fallingwater</strong> - Mill Run, Pennsylvania</li>
					<li><strong>Unity Temple</strong> - Oak Park, Illinois</li>
					<li><strong>Guggenheim Museum</strong> - New York City</li>
					<li><strong>Robie House</strong> - Chicago, Illinois</li>
					<li><strong>Darwin D. Martin House</strong> - Buffalo, New York</li>
				</ul>
			</div>

			<div class="info-section">
				<h2>Foundation Contact</h2>
				<p><strong>Website:</strong> franklloydwright.org</p>
				<p><strong>Email:</strong> info@franklloydwright.org</p>
				<p><strong>Education Programs:</strong> education@franklloydwright.org</p>
				<p><strong>Preservation:</strong> preservation@franklloydwright.org</p>
			</div>
		</div>
	</div>
</div>

<style>
	.contact-page {
		flex: 4;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		background: white;
	}

	.contact-header {
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

	.contact-content {
		flex: 1;
		padding: 30px;
		overflow-y: auto;
	}

	.contact-info {
		max-width: 800px;
		margin: 0 auto;
	}

	.info-section {
		margin-bottom: 30px;
	}

	.location {
		background: #f9f9f9;
		padding: 20px;
		border: 1px solid #ddd;
		margin-top: 15px;
	}

	h2 {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 15px;
		border-bottom: 1px solid black;
		padding-bottom: 5px;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 10px;
		color: #333;
	}

	p {
		line-height: 1.6;
		margin-bottom: 10px;
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