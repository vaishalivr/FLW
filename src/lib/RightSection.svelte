<script>
	import { selectedRectId, isDrawing, previewData, rectangles, currentView } from './store.js';

	// Reactive data to display
	$: selectedRect = $rectangles.find((rect) => rect.id === $selectedRectId);
	$: lastRect = $rectangles.length > 0 ? $rectangles[$rectangles.length - 1] : null;

	// Display logic:
	// 1. If drawing, show preview data
	// 2. If a rectangle is selected, show its data
	// 3. If no selection but rectangles exist, show the last created rectangle
	// 4. Otherwise show empty state
	$: displayData = $isDrawing
		? $previewData
		: selectedRect
			? selectedRect.data
			: lastRect
				? lastRect.data
				: null;

	// Button visibility logic
	$: showAboutButton = $currentView !== 'about';
	$: showContactButton = $currentView !== 'contact';
	$: showDrawingBoardButton = $currentView !== 'drawing';
	$: showClearButton = $currentView === 'drawing' && $rectangles.length > 0;

	// Clear all rectangles
	const clearDrawingBoard = () => {
		rectangles.set([]);
		selectedRectId.set(null);
		previewData.set(null);
	};

	// Navigate to About page
	const showAboutPage = () => {
		currentView.set('about');
	};

	// Navigate to Contact page
	const showContactPage = () => {
		currentView.set('contact');
	};

	// Navigate to Drawing view
	const showDrawingView = () => {
		currentView.set('drawing');
	};
</script>

<div class="right-section">
	<div>
		<div class="header">FRANK LLOYD WRIGHT</div>
		<div class="button-container">
			<!-- Navigate to About page to learn about Frank Lloyd Wright's life, work, and architectural ideas -->
			{#if showAboutButton}
				<button class="nav-button" on:click={showAboutPage}>His Life, Work, Ideas</button>
			{/if}
			<!-- Navigate to Contact page for visiting information and foundation contact details -->
			{#if showContactButton}
				<button class="nav-button" on:click={showContactPage}>Contact</button>
			{/if}
			<!-- Navigate back to Drawing Board -->
			{#if showDrawingBoardButton}
				<button class="nav-button" on:click={showDrawingView}>Drawing Board</button>
			{/if}
			<!-- Clear Drawing Board - only show when on drawing view and rectangles exist -->
			{#if showClearButton}
				<button class="nav-button" on:click={clearDrawingBoard}>Clear Drawing Board</button>
			{/if}
		</div>
	</div>
	<div>
		<div style="border-top:1px solid black">
			{#if displayData}
				<div class="drawing-details">Project Name: {displayData.projectName}</div>
				<div class="drawing-details">Project Address: {displayData.projectAddress}</div>
				<div class="drawing-details">Client Name: {displayData.clientName}</div>
				<div class="drawing-details">Drawing Title: {displayData.drawingTitle}</div>
			{:else}
				<div class="drawing-details">Project Name:</div>
				<div class="drawing-details">Project Address:</div>
				<div class="drawing-details">Client Name:</div>
				<div class="drawing-details">Drawing Title:</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.right-section {
		flex: 1;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.header {
		height: 75px;
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
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		padding: 8px 12px;
		background: white;
		border: none;
	}

	.nav-button:hover {
		border-bottom: 1px solid black;
		box-sizing: border-box;
	}

	.drawing-details {
		border-bottom: 1px solid black;
	}
</style>
