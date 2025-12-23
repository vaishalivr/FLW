import { writable } from 'svelte/store';

export const drawingData = [
	{
		imageUrl: '/src/lib/assets/images/fallingWater.png',
		projectName: 'John Doe',
		projectAddress: 'Address 1',
		clientName: 'Falling Water Client',
		drawingTitle: 'Side Perspective'
	},
	{
		imageUrl: '/src/lib/assets/images/unityTemple.png',
		projectName: 'John Doe',
		projectAddress: 'Address 2 ',
		clientName: 'Unity Temple Client',
		drawingTitle: 'Front Elevation'
	}
];

// Selection state management
export const selectedRectId = writable(null);
export const isDrawing = writable(false);
export const previewData = writable(null);
export const rectangles = writable([]);

// Navigation state management
export const currentView = writable('drawing'); // 'drawing', 'about', or 'contact'
