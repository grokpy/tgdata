export function validateBoard(board, GRID_WIDTH, GRID_HEIGHT) {
    if (!Array.isArray(board) || board.length !== GRID_HEIGHT) {
        throw new Error(`Invalid board: expected ${GRID_HEIGHT} rows, got ${board.length}`);
    }
    for (let row = 0; row < GRID_HEIGHT; row++) {
        if (!Array.isArray(board[row]) || board[row].length !== GRID_WIDTH) {
            throw new Error(`Invalid board row ${row}: expected ${GRID_WIDTH} columns, got ${board[row]?.length || 'undefined'}`);
        }
    }
}

export function getTileFromEvent(event, canvas, state, isTouch = false) {
    if (!canvas) {
        throw new Error('Canvas is undefined');
    }
    const rect = canvas.getBoundingClientRect();
    const x = isTouch ? event.changedTouches[0].clientX - rect.left : event.clientX - rect.left;
    const y = isTouch ? event.changedTouches[0].clientY - rect.top : event.clientY - rect.top;
    const col = Math.floor(x / state.TILE_SIZE);
    const row = Math.floor(y / state.TILE_SIZE);
    if (row < 0 || row >= state.GRID_HEIGHT || col < 0 || col >= state.GRID_WIDTH || !state.board[row]?.[col]) {
        return null;
    }
    return { row, col };
}

export function isAdjacent(r1, c1, r2, c2) {
    return (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
}
