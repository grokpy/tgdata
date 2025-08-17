import state from './state.js';
import { isAdjacent, getTileFromEvent } from './utils.js';
import { updateScoreDisplay, updateTaskDisplay } from './ui.js';
import {
    handleBonusTileAction,
    handleBonusStarSwap,
    checkMatches,
    handleMatches
} from './match.js';
import { checkTaskCompletion } from './tasks.js';
import { canvas } from './game.js';
import { initBoard, swapTiles, dropTiles, fillBoard } from './board.js';
import { render } from './render.js';

export function handleTouchStart(event) {
    if (state.isProcessing) return;
    event.preventDefault();
    const tile = getTileFromEvent(event, canvas, state, true);
    if (!tile) return;
    const { row, col } = tile;

    state.touchStartTile = { row, col };
    state.touchMoved = false;
    state.selectedTile = { row, col };
    render();
}

export function handleTouchMove(event) {
    if (!state.touchStartTile) return;
    event.preventDefault();
    state.touchMoved = true;
}

export function handleTouchEnd(event) {
    if (!state.touchStartTile) return;
    event.preventDefault();
    const tile = getTileFromEvent(event, canvas, state, true);
    if (!state.touchMoved) {
        const tile = state.board[state.touchStartTile.row][state.touchStartTile.col];
        if (tile.bonusType === 'horizontal_arrow' || tile.bonusType === 'vertical_arrow') {
            state.isProcessing = true;
            handleBonusTileAction(
                state.touchStartTile.row,
                state.touchStartTile.col,
                tile.bonusType,
                render,
                (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
                dropTiles,
                fillBoard
            ).then(() => {
                checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render);
                state.isProcessing = false;
                render();
            });
        }
    } else if (tile) {
        const sr = state.touchStartTile.row;
        const sc = state.touchStartTile.col;
        const { row, col } = tile;
        if (isAdjacent(sr, sc, row, col)) {
            state.isProcessing = true;
            state.movesLeft--;
            updateTaskDisplay(state.task, state.collectedShapes, state.movesLeft, state.shapeCanvases, state.selectedColors, state.selectedShapes);
            const tile1 = state.board[sr][sc];
            const tile2 = state.board[row][col];
            if (tile1.bonusType === 'bonus_star' || tile2.bonusType === 'bonus_star') {
                handleBonusStarSwap(
                    sr, sc, row, col,
                    render,
                    (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
                    dropTiles,
                    fillBoard
                ).then(() => {
                    checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render);
                    state.isProcessing = false;
                    render();
                });
            } else {
                swapTiles(sr, sc, row, col).then(() => {
                    const matches = checkMatches();
                    if (matches) {
                        handleMatches(
                            render,
                            (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
                            dropTiles,
                            fillBoard
                        ).then(() => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render));
                    } else {
                        swapTiles(sr, sc, row, col).then(() => {
                            state.isProcessing = false;
                            state.movesLeft++;
                            updateTaskDisplay(state.task, state.collectedShapes, state.movesLeft, state.shapeCanvases, state.selectedColors, state.selectedShapes);
                            render();
                        });
                    }
                    state.selectedTile = null;
                });
            }
        }
    }

    state.touchStartTile = null;
    state.selectedTile = null;
    render();
}

export function handleDoubleClick(event) {
    if (state.isProcessing) return;
    const tile = getTileFromEvent(event, canvas, state);
    if (!tile) return;
    const { row, col } = tile;

    const tileData = state.board[row][col];
    if (tileData.bonusType === 'horizontal_arrow' || tileData.bonusType === 'vertical_arrow') {
        state.isProcessing = true;
        handleBonusTileAction(
            row, col, tileData.bonusType,
            render,
            (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
            dropTiles,
            fillBoard
        ).then(() => {
            checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render);
            state.isProcessing = false;
            render();
        });
    }
}

export function handleClick(event) {
    if (state.isProcessing) return;
    const tile = getTileFromEvent(event, canvas, state);
    if (!tile) return;
    const { row, col } = tile;

    if (!state.selectedTile) {
        state.selectedTile = { row, col };
        render();
    } else {
        const sr = state.selectedTile.row;
        const sc = state.selectedTile.col;
        if (isAdjacent(sr, sc, row, col)) {
            state.isProcessing = true;
            state.movesLeft--;
            updateTaskDisplay(state.task, state.collectedShapes, state.movesLeft, state.shapeCanvases, state.selectedColors, state.selectedShapes);
            const tile1 = state.board[sr][sc];
            const tile2 = state.board[row][col];
            if (tile1.bonusType === 'bonus_star' || tile2.bonusType === 'bonus_star') {
                handleBonusStarSwap(
                    sr, sc, row, col,
                    render,
                    (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
                    dropTiles,
                    fillBoard
                ).then(() => {
                    checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render);
                    state.isProcessing = false;
                    render();
                });
            } else {
                swapTiles(sr, sc, row, col).then(() => {
                    const matches = checkMatches();
                    if (matches) {
                        handleMatches(
                            render,
                            (...args) => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render),
                            dropTiles,
                            fillBoard
                        ).then(() => checkTaskCompletion(initBoard, updateTaskDisplay, updateScoreDisplay, render));
                    } else {
                        swapTiles(sr, sc, row, col).then(() => {
                            state.isProcessing = false;
                            state.movesLeft++;
                            updateTaskDisplay(state.task, state.collectedShapes, state.movesLeft, state.shapeCanvases, state.selectedColors, state.selectedShapes);
                            render();
                        });
                    }
                    state.selectedTile = null;
                });
            }
        } else {
            state.selectedTile = { row, col };
            render();
        }
    }
}