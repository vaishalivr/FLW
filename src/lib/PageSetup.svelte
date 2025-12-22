<script>
	import DrawingArea from './DrawingArea.svelte';
	import RightSection from './RightSection.svelte';
</script>

<div class="drawing-sheet">
	<div class="inner-area">
		<DrawingArea />
		<RightSection />
	</div>
</div>

<style>
	.drawing-sheet {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		border: 3px solid black;
		padding: 30px;
	}

	.inner-area {
		width: 100%;
		height: 100%;
		display: flex;
		gap: 30px;
	}
</style>
