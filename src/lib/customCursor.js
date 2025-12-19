export const CURSOR_WIDTH = 90;
export const CURSOR_HEIGHT = 120;

export function createCursorSvg() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${CURSOR_WIDTH}" height="${CURSOR_HEIGHT}" viewBox="0 0 ${CURSOR_WIDTH} ${CURSOR_HEIGHT}">
		<text x="${CURSOR_WIDTH / 2}" y="${CURSOR_WIDTH / 2}" text-anchor="middle" dominant-baseline="middle">+</text>
		<circle cx="${CURSOR_WIDTH / 2}" cy="${CURSOR_WIDTH / 2}" r="40" fill="none" stroke="black"></circle>
		<text x="${CURSOR_WIDTH / 2}" y="${CURSOR_HEIGHT - 20}" text-anchor="middle" font-size="13" dominant-baseline="start">DRAW</text>
	</svg>`;
}

export function createCursorDataUri() {
	const cursorSvg = createCursorSvg();
	// Set hotspot to center of the crosshair/circle for better edge behavior
	const hotspotX = CURSOR_WIDTH / 2;  // 45px - center of the crosshair
	const hotspotY = CURSOR_WIDTH / 2;  // 45px - center of the crosshair (not HEIGHT)
	return `url('data:image/svg+xml;utf8,${encodeURIComponent(cursorSvg)}') ${hotspotX} ${hotspotY}, crosshair`;
}