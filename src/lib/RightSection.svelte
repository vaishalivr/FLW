<div class="right-section">
	<div class="header">
		FRANK LLOYD WRIGHT
	</div>
	<div class="button-container">
		<button class="nav-button">ABOUT</button>
		<button class="nav-button">CONTACT</button>
	</div>
</div>

<style>
	.right-section {
		flex: 1;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 90px;
		font-weight: 600;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-bottom: 1px solid black;
		letter-spacing: 1px;
	}

	.button-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}

	.nav-button {
		font-weight: 500;
		font-size: 14px;
		letter-spacing: 0.5px;
		padding: 12px 20px;
		background: white;
		border: 2px solid black;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.nav-button:hover {
		background: teal;
	}
</style>