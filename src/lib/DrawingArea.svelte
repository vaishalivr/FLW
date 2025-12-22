<script>
	import { createCursorDataUri } from './customCursor.js';
	import { drawingData, selectedRectId, isDrawing, previewData, rectangles } from './store.js';

	const cursorDataUri = createCursorDataUri();
	let startPoint = null;
	let currentPoint = null;
	let localRectangles = []; // Local rectangles array
	let rectCounter = 1; // Counter for rectangle IDs

	// Sync local rectangles with store
	$: rectangles.set(localRectangles);

	// Listen for external changes to rectangles store (like clearing)
	rectangles.subscribe((value) => {
		if (value.length === 0 && localRectangles.length > 0) {
			localRectangles = [];
		}
	});

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
		isDrawing.set(true);
		console.log('Started drawing at:', startPoint);
	};

	const handleMouseMove = (event) => {
		if (!startPoint) return;
		currentPoint = { x: event.offsetX, y: event.offsetY };
		console.log('Drawing to:', currentPoint);
	};

	const handleMouseUp = (event) => {
		if (!startPoint) return;
		const rectProps = getRectProps(startPoint, currentPoint);
		if (rectProps && rectProps.width > 5 && rectProps.height > 5) {
			rectCounter += 1; // Increment counter
			// Assign data from store (cycling through available data)
			const dataIndex = (rectCounter - 1) % drawingData.length;
			const newRect = {
				id: `rect-${rectCounter}`,
				...rectProps,
				data: drawingData[dataIndex]
			};

			// Update rectangles first
			localRectangles = [...localRectangles, newRect];

			// Then update drawing state
			isDrawing.set(false);
			previewData.set(null);

			// Finally select the newly created rectangle
			selectedRectId.set(newRect.id);
		} else {
			// If rectangle is too small, just clear drawing state
			isDrawing.set(false);
			previewData.set(null);
		}
		console.log('Finished drawing. Total rectangles:', localRectangles.length);
		startPoint = null;
		currentPoint = null;
	};

	// Handle rectangle selection
	const handleRectClick = (rectId) => {
		selectedRectId.set(rectId);
	};

	// Handle clicking on empty space to clear selection
	const handleSvgClick = (event) => {
		// Only clear selection if clicking directly on SVG (not on rectangles)
		if (event.target.tagName === 'svg') {
			selectedRectId.set(null);
		}
	};

	// Handle keyboard events for SVG
	const handleSvgKeydown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			selectedRectId.set(null);
		}
	};

	// Handle keyboard events for rectangle selection
	const handleRectKeydown = (event, rectId) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectedRectId.set(rectId);
		}
	};

	// Get current preview rectangle properties
	$: previewRect = getRectProps(startPoint, currentPoint);

	// Calculate image scaling and positioning for cover behavior
	function calculateImageProps(rectProps, imageNaturalWidth = 800, imageNaturalHeight = 600) {
		if (!rectProps) return null;

		const { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rectProps;

		// Calculate scale to fill rectangle (cover behavior)
		const scaleX = rectWidth / imageNaturalWidth;
		const scaleY = rectHeight / imageNaturalHeight;
		const scale = Math.max(scaleX, scaleY); // Use larger scale to fill completely

		// Calculate scaled dimensions
		const scaledWidth = imageNaturalWidth * scale;
		const scaledHeight = imageNaturalHeight * scale;

		// Center the scaled image within rectangle
		const imageX = rectX - (scaledWidth - rectWidth) / 2;
		const imageY = rectY - (scaledHeight - rectHeight) / 2;

		return {
			x: imageX,
			y: imageY,
			width: scaledWidth,
			height: scaledHeight
		};
	}

	// Get current preview image data
	$: previewImageData = startPoint ? drawingData[rectCounter % drawingData.length] : null;
	$: previewImageProps = previewRect ? calculateImageProps(previewRect) : null;

	// Update preview data store when drawing
	$: if (startPoint && previewImageData) {
		previewData.set(previewImageData);
	}
</script>

<div class="left-section" style="--cursor: {cursorDataUri};">
	<svg
		width="100%"
		height="100%"
		class="drawing-svg"
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		on:click={handleSvgClick}
		on:keydown={handleSvgKeydown}
		role="button"
		tabindex="0"
	>
		<!-- Define clipping paths for images -->
		<defs>
			<!-- Clipping paths for completed rectangles -->
			{#each localRectangles as rect (rect.id)}
				<clipPath id="clip-{rect.id}">
					<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} />
				</clipPath>
			{/each}

			<!-- Clipping path for preview rectangle -->
			{#if previewRect && startPoint}
				<clipPath id="clip-preview">
					<rect
						x={previewRect.x}
						y={previewRect.y}
						width={previewRect.width}
						height={previewRect.height}
					/>
				</clipPath>
			{/if}
		</defs>

		<!-- Completed rectangles with images -->
		{#each localRectangles as rect (rect.id)}
			{@const imageProps = calculateImageProps(rect)}
			{@const isSelected = $selectedRectId === rect.id}
			<g
				class="rectangle-group"
				on:click={() => handleRectClick(rect.id)}
				on:keydown={(event) => handleRectKeydown(event, rect.id)}
				role="button"
				tabindex="0"
			>
				<!-- Image element (behind rectangle border) -->
				{#if imageProps && rect.data}
					<image
						href={rect.data.imageUrl}
						x={imageProps.x}
						y={imageProps.y}
						width={imageProps.width}
						height={imageProps.height}
						clip-path="url(#clip-{rect.id})"
						class="rectangle-image"
					/>
				{/if}
				<!-- Rectangle border -->
				<rect
					x={rect.x}
					y={rect.y}
					width={rect.width}
					height={rect.height}
					fill="none"
					stroke={isSelected ? 'red' : 'black'}
					stroke-width={isSelected ? '3' : '2'}
					class="drawn-rectangle"
				/>
			</g>
		{/each}

		<!-- Preview rectangle with image (while drawing) -->
		{#if previewRect && startPoint}
			<g class="preview-group">
				<!-- Preview image element -->
				{#if previewImageProps && previewImageData}
					<image
						href={previewImageData.imageUrl}
						x={previewImageProps.x}
						y={previewImageProps.y}
						width={previewImageProps.width}
						height={previewImageProps.height}
						clip-path="url(#clip-preview)"
						class="preview-image"
					/>
				{/if}
				<!-- Preview rectangle border -->
				<rect
					x={previewRect.x}
					y={previewRect.y}
					width={previewRect.width}
					height={previewRect.height}
					fill="none"
					stroke="black"
					stroke-width="2"
					class="preview-rectangle"
				/>
			</g>
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

	.rectangle-image,
	.preview-image {
		pointer-events: none; /* Prevent images from interfering with mouse events */
	}

	.rectangle-group {
		cursor: pointer;
		outline: none; /* Remove default focus outline since we have visual selection feedback */
	}
</style>
