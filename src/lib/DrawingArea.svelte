<script>
	import { createCursorDataUri } from './customCursor.js';

	const cursorDataUri = createCursorDataUri();
	let startPoint = null;
	let currentPoint = null;
	let rectangles = [];  // Store completed rectangles
	let rectCounter = 1;  // Counter for rectangle IDs
	
	// Calculate rectangle properties for rendering
	function getRectProps(start, current) {
		if (!start || !current) return null;
		
		const width = current.x - start.x;
		const height = current.y - start.y;
		
		// Handle negative dimensions (dragging up/left)
		const x = width >= 0 ? start.x : current.x;
		const y = height >= 0 ? start.y : current.y;
		const w = Math.abs(width);
		const h = Math.abs(height);
		
		return { x, y, width: w, height: h };
	}
	
	const handleMouseDown = (event) => {
		startPoint = { x: event.offsetX, y: event.offsetY };
		currentPoint = { x: event.offsetX, y: event.offsetY };
		console.log('Started drawing at:', startPoint);
	}
	
	const handleMouseMove = (event) => {
		if (!startPoint) return;
		currentPoint = { x: event.offsetX, y: event.offsetY };
		console.log('Drawing to:', currentPoint);
	}

	const handleMouseUp = (event) => {
		if (!startPoint) return;
		const rectProps = getRectProps(startPoint, currentPoint);
		if (rectProps && rectProps.width > 5 && rectProps.height > 5) {
			rectCounter += 1;  // Increment counter
			rectangles = [...rectangles, {
				id: `rect-${rectCounter}`,
				...rectProps
			}];
		}	
		console.log('Finished drawing. Total rectangles:', rectangles.length);
		startPoint = null;
		currentPoint = null;
	}
	
	// Get current preview rectangle properties
	$: previewRect = getRectProps(startPoint, currentPoint);
</script>

<div class="left-section" style="--cursor: {cursorDataUri};">
	<svg 
		width="100%" 
		height="100%" 
		class="drawing-svg" 
		on:mousedown={handleMouseDown} 
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		role="button" 
		tabindex="0"
	>
		<!-- Completed rectangles -->
		{#each rectangles as rect (rect.id)}
			<rect
				x={rect.x}
				y={rect.y}
				width={rect.width}
				height={rect.height}
				fill="none"
				stroke="black"
				stroke-width="2"
			/>
		{/each}
		
		<!-- Preview rectangle (while drawing) -->
		{#if previewRect && startPoint}
			<rect
				x={previewRect.x}
				y={previewRect.y}
				width={previewRect.width}
				height={previewRect.height}
				fill="none"
				stroke="black"
				stroke-width="2"
			/>
		{/if}
	</svg>
</div>

<style>
	.left-section {
		flex: 4;
		border: 3px solid black;
	}

	.drawing-svg {
		display: block;
		cursor: var(--cursor);
	}
</style>
