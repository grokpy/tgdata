// state.js

// Главное состояние игры
const state = {
    GRID_WIDTH: 6,
    GRID_HEIGHT: 6,
    TILE_SIZE: 50,
    ALL_SHAPES: ['square', 'circle', 'triangle', 'diamond', 'pentagon'],
    ALL_COLORS: ['#ff5555', '#55ff55', '#5555ff', '#ffaa00', '#ff55ff'],
    selectedShapes: ['square', 'circle', 'triangle', 'diamond', 'pentagon'],
    selectedColors: ['#ff5555', '#55ff55', '#5555ff', '#ffaa00', '#ff55ff'],
    board: [],
    selectedTile: null,
    isProcessing: false,
    score: 0,
    taskScore: 0,
    task: { shape: 'square', count: 10 },
    collectedShapes: { square: 0 },
    movesLeft: 15,
    shapeCanvases: {},
    animations: [],
    currentTaskIndex: 0,
    predefinedTasks: [
        { shape: 'square', count: 10, moves: 3, allowedShapes: ['square', 'circle', 'triangle'] },
        { shape: 'circle', count: 12, moves: 3, allowedShapes: ['square', 'circle', 'triangle'] },
        { shape: 'triangle', count: 8, moves: 2, allowedShapes: ['square', 'circle', 'triangle', 'diamond'] },
        { shape: 'diamond', count: 15, moves: 3, allowedShapes: ['diamond', 'circle', 'pentagon'] },
        { shape: 'circle', count: 10, moves: 2, allowedShapes: ['diamond', 'circle', 'pentagon'] },
        { shape: 'pentagon', count: 14, moves: 3, allowedShapes: ['diamond', 'circle', 'pentagon'] },
        { shape: 'square', count: 12, moves: 4, allowedShapes: ['square', 'circle', 'triangle', 'diamond'] },
        { shape: 'circle', count: 16, moves: 3, allowedShapes: ['diamond', 'circle', 'pentagon'] },
        { shape: 'triangle', count: 10, moves: 2, allowedShapes: ['square', 'circle', 'triangle', 'diamond'] },
        { shape: 'pentagon', count: 18, moves: 3, allowedShapes: ['diamond', 'circle', 'pentagon'] }
    ],
    isGameInitialized: false,
    isTaskProcessing: false,
    touchStartTile: null,
    touchMoved: false,
};

export default state;
