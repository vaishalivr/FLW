<script>
	import DrawingArea from './DrawingArea.svelte';
	import RightSection from './RightSection.svelte';
	import AboutPage from './AboutPage.svelte';
	import ContactPage from './ContactPage.svelte';
	import { currentView } from './store.js';
</script>

<div class="drawing-sheet">
	<div class="inner-area">
		{#if $currentView === 'drawing'}
			<DrawingArea />
		{:else if $currentView === 'about'}
			<AboutPage />
		{:else if $currentView === 'contact'}
			<ContactPage />
		{/if}
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
