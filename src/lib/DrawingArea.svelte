<script>
	import { createCursorDataUri } from './customCursor.js';
	
	// Get custom cursor data URI
	const cursorDataUri = createCursorDataUri();
</script>

<div class="left-section" style="--cursor: {cursorDataUri};">
	<svg width="100%" height="100%" class="drawing-svg"></svg>
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