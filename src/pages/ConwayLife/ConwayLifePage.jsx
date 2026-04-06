import { useCallback, useEffect, useRef, useState } from "react";

import { CanvasOverlayLayout } from "@/components";
import { Button, Range, RadioGroup } from '@/components/UI'

import styles from "./ConwayLifePage.module.scss";

const DEFAULT_CELL_SIZE = 10;
const MIN_CELL_SIZE = 4;
const MAX_CELL_SIZE = 24;
const MIN_BOARD_SIDE = 120;
const MAX_CELL_AGE = 4095;

const COLOR_SCHEMES = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "rainbow", label: "Rainbow" },
    { value: "rings", label: "Rings" },
    { value: "heatmap", label: "Heatmap" },
    { value: "synthwave", label: "Synthwave" },
    { value: "matrix", label: "Matrix" },
    { value: "fire", label: "Fire" },
    { value: "animated", label: "Animated" },
    { value: "age", label: "Cell age" },
    { value: "aurora", label: "Aurora" },
    { value: "topographic", label: "Topographic" },
    { value: "plasma", label: "Plasma" },
    { value: "ocean", label: "Ocean" },
];

const createGrid = (cols, rows) => new Uint8Array(cols * rows);
const createAgeGrid = (cols, rows) => new Uint16Array(cols * rows);

const resizeGrid = (sourceGrid, prevCols, prevRows, nextCols, nextRows) => {
    const nextGrid = new sourceGrid.constructor(nextCols * nextRows);
    const copyCols = Math.min(prevCols, nextCols);
    const copyRows = Math.min(prevRows, nextRows);

    for (let y = 0; y < copyRows; y++) {
        const prevOffset = y * prevCols;
        const nextOffset = y * nextCols;
        for (let x = 0; x < copyCols; x++) {
            nextGrid[nextOffset + x] = sourceGrid[prevOffset + x];
        }
    }

    return nextGrid;
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const getAliveCellColor = ({
    colorScheme,
    cellX,
    cellY,
    pixelX,
    pixelY,
    generation,
    age,
    timeMs,
    width,
    height,
}) => {
    const normalizedX = width > 0 ? pixelX / width : 0;
    const normalizedY = height > 0 ? pixelY / height : 0;
    const centeredX = normalizedX - 0.5;
    const centeredY = normalizedY - 0.5;
    const radius = Math.sqrt(centeredX * centeredX + centeredY * centeredY);
    const wave = Math.sin(cellX * 0.18 + cellY * 0.16 + generation * 0.08);
    const ageRatio = clamp(age / 32, 0, 1);

    switch (colorScheme) {
        case "black": {
            return `hsl(0deg 0% 0%)`;
        }
        case "white": {
            return `hsl(0deg 0% 100%)`;
        }
        case "rings": {
            const hue = (radius * 920 + cellX * 0.8 + cellY * 0.4) % 360;
            const lightness = 50 + Math.sin(radius * 42 - generation * 0.04) * 12;
            return `hsl(${hue}deg 82% ${lightness}%)`;
        }
        case "heatmap": {
            const heat = clamp(
                0.55 * (1 - normalizedY) +
                0.25 * normalizedX +
                0.2 * ((wave + 1) / 2),
                0,
                1
            );
            const hue = 220 - heat * 220;
            const lightness = 34 + heat * 28;
            return `hsl(${hue}deg 92% ${lightness}%)`;
        }
        case "synthwave": {
            const hue = (285 + normalizedX * 85 + Math.sin(cellY * 0.12) * 24) % 360;
            const lightness = 48 + normalizedY * 14 + Math.sin(cellX * 0.2) * 6;
            return `hsl(${hue}deg 88% ${lightness}%)`;
        }
        case "matrix": {
            const hue = 120 + Math.sin(cellX * 0.1 + cellY * 0.05) * 18;
            const lightness = 28 + ageRatio * 34 + ((wave + 1) / 2) * 10;
            return `hsl(${hue}deg 72% ${lightness}%)`;
        }
        case "fire": {
            const flame = clamp(
                0.65 * (1 - normalizedY) +
                0.2 * ageRatio +
                0.15 * ((Math.sin(cellX * 0.24 - cellY * 0.1) + 1) / 2),
                0,
                1
            );
            const hue = 10 + flame * 55;
            const lightness = 28 + flame * 36;
            return `hsl(${hue}deg 96% ${lightness}%)`;
        }
        case "animated": {
            const phase = timeMs * 0.003 + radius * 10 + (cellX + cellY) * 0.04;
            const hue = (200 + Math.sin(phase) * 130 + normalizedX * 90 + normalizedY * 40 + 360) % 360;
            const lightness = 48 + Math.cos(phase * 1.3) * 10;
            return `hsl(${hue}deg 85% ${lightness}%)`;
        }
        case "age": {
            const hue = 210 - ageRatio * 190;
            const lightness = 35 + ageRatio * 30;
            return `hsl(${hue}deg 88% ${lightness}%)`;
        }
        case "aurora": {
            const hue = (150 + normalizedX * 120 + Math.sin(cellY * 0.14 + generation * 0.06) * 40 + 360) % 360;
            const lightness = 44 + Math.sin((normalizedY * 8 + normalizedX * 5 + generation * 0.05)) * 12;
            return `hsl(${hue}deg 80% ${lightness}%)`;
        }
        case "topographic": {
            const contour = Math.sin(radius * 38 + normalizedX * 8 - normalizedY * 6);
            const bands = Math.round((contour + 1) * 4) / 4;
            const hue = 80 + bands * 70 + normalizedY * 24;
            const lightness = 32 + bands * 26;
            return `hsl(${hue}deg 58% ${lightness}%)`;
        }
        case "plasma": {
            const field =
                Math.sin(cellX * 0.22 + timeMs * 0.0024) +
                Math.sin(cellY * 0.19 - timeMs * 0.0017) +
                Math.sin((cellX + cellY) * 0.12 + radius * 12);
            const plasma = (field + 3) / 6;
            const hue = (255 + plasma * 170 + normalizedX * 50) % 360;
            const lightness = 42 + plasma * 20;
            return `hsl(${hue}deg 90% ${lightness}%)`;
        }
        case "ocean": {
            const tide = Math.sin(normalizedX * 10 - generation * 0.05) + Math.cos(normalizedY * 12 + cellX * 0.05);
            const depth = clamp((tide + 2) / 4, 0, 1);
            const hue = 185 + depth * 45;
            const lightness = 28 + depth * 26;
            return `hsl(${hue}deg 78% ${lightness}%)`;
        }
        case "rainbow":
        default: {
            const hue = (normalizedX * 220 + normalizedY * 120 + (cellX + cellY) * 1.5) % 360;
            const saturation = 78;
            const lightness = 52 + Math.sin((cellX - cellY) * 0.18) * 8;
            return `hsl(${hue}deg ${saturation}% ${lightness}%)`;
        }
    }
};

const getBoardBackgroundColor = ({ colorScheme, generation, timeMs }) => {
    switch (colorScheme) {
        case "black":
            return "#ffffff";
        case "white":
            return "#000000";
        case "matrix":
        case "ocean":
        case "fire":
            return "#000000";
        case "synthwave":
            return "hsl(262deg 44% 10%)";
        case "animated": {
            const hue = (220 + Math.sin(timeMs * 0.0008 + generation * 0.04) * 24 + 360) % 360;
            return `hsl(${hue}deg 35% 8%)`;
        }
        case "aurora":
            return "hsl(198deg 45% 8%)";
        case "topographic":
            return "hsl(70deg 16% 92%)";
        case "plasma":
            return "hsl(246deg 38% 9%)";
        case "heatmap":
            return "hsl(210deg 40% 96%)";
        case "rings":
            return "hsl(0deg 0% 97%)";
        case "age":
            return "hsl(210deg 25% 95%)";
        case "rainbow":
        default:
            return "#ffffff";
    }
};

const ConwayLifePage = () => {
    const pageRef = useRef(null);
    const [cellSize, setCellSize] = useState(DEFAULT_CELL_SIZE);
    const [isRunning, setIsRunning] = useState(false);
    const [tickMs, setTickMs] = useState(120);
    const [generation, setGeneration] = useState(0);
    const [colorScheme, setColorScheme] = useState("rainbow");

    const [boundaryMode, setBoundaryMode] = useState("walls"); // "walls" | "wrap"
    const [randomPercent, setRandomPercent] = useState(20); // 0..100

    const canvasRef = useRef(null);

    const [boardMetrics, setBoardMetrics] = useState({
        width: 1000,
        height: 700,
        cols: Math.floor(1000 / DEFAULT_CELL_SIZE),
        rows: Math.floor(700 / DEFAULT_CELL_SIZE),
    });

    // Simulation buffers
    const gridRef = useRef(createGrid(boardMetrics.cols, boardMetrics.rows));
    const nextRef = useRef(createGrid(boardMetrics.cols, boardMetrics.rows));
    const ageRef = useRef(createAgeGrid(boardMetrics.cols, boardMetrics.rows));
    const nextAgeRef = useRef(createAgeGrid(boardMetrics.cols, boardMetrics.rows));

    // Latest refs
    const runningRef = useRef(isRunning);
    const boundaryModeRef = useRef(boundaryMode);
    const boardMetricsRef = useRef(boardMetrics);
    const generationRef = useRef(generation);
    const colorSchemeRef = useRef(colorScheme);

    useEffect(() => {
        runningRef.current = isRunning;
    }, [isRunning]);

    useEffect(() => {
        boundaryModeRef.current = boundaryMode;
    }, [boundaryMode]);

    useEffect(() => {
        boardMetricsRef.current = boardMetrics;
    }, [boardMetrics]);

    useEffect(() => {
        generationRef.current = generation;
    }, [generation]);

    useEffect(() => {
        colorSchemeRef.current = colorScheme;
    }, [colorScheme]);

    useEffect(() => {
        if (!pageRef.current) return;

        const updateBoardSize = () => {
            const pageBounds = pageRef.current.getBoundingClientRect();
            const availableWidth = Math.max(Math.floor(pageBounds.width), MIN_BOARD_SIDE);
            const availableHeight = Math.max(Math.floor(window.innerHeight), MIN_BOARD_SIDE);
            const nextCols = Math.max(1, Math.floor(availableWidth / cellSize));
            const nextRows = Math.max(1, Math.floor(availableHeight / cellSize));
            const nextWidth = nextCols * cellSize;
            const nextHeight = nextRows * cellSize;

            const prevMetrics = boardMetricsRef.current;
            if (
                prevMetrics.cols === nextCols &&
                prevMetrics.rows === nextRows &&
                prevMetrics.width === nextWidth &&
                prevMetrics.height === nextHeight
            ) {
                return;
            }

            gridRef.current = resizeGrid(
                gridRef.current,
                prevMetrics.cols,
                prevMetrics.rows,
                nextCols,
                nextRows
            );
            ageRef.current = resizeGrid(
                ageRef.current,
                prevMetrics.cols,
                prevMetrics.rows,
                nextCols,
                nextRows
            );
            nextRef.current = createGrid(nextCols, nextRows);
            nextAgeRef.current = createAgeGrid(nextCols, nextRows);
            setBoardMetrics({
                width: nextWidth,
                height: nextHeight,
                cols: nextCols,
                rows: nextRows,
            });
        };

        updateBoardSize();

        const ro = new ResizeObserver(updateBoardSize);
        ro.observe(pageRef.current);

        window.addEventListener("resize", updateBoardSize);

        return () => {
            window.removeEventListener("resize", updateBoardSize);
            ro.disconnect();
        };
    }, [cellSize]);

    // ---- Draw ----
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { cols, rows, width, height } = boardMetricsRef.current;
        const grid = gridRef.current;
        const ages = ageRef.current;
        const currentGeneration = generationRef.current;
        const currentScheme = colorSchemeRef.current;
        const timeMs = performance.now();

        // background
        ctx.fillStyle = getBoardBackgroundColor({
            colorScheme: currentScheme,
            generation: currentGeneration,
            timeMs,
        });
        ctx.fillRect(0, 0, width, height);

        // alive cells
        for (let y = 0; y < rows; y++) {
            const rowBase = y * cols;
            const py = y * cellSize;
            for (let x = 0; x < cols; x++) {
                const index = rowBase + x;
                if (grid[index] === 1) {
                    ctx.fillStyle = getAliveCellColor({
                        colorScheme: currentScheme,
                        cellX: x,
                        cellY: y,
                        pixelX: x * cellSize + cellSize / 2,
                        pixelY: py + cellSize / 2,
                        generation: currentGeneration,
                        age: ages[index],
                        timeMs,
                        width,
                        height,
                    });
                    ctx.fillRect(x * cellSize, py, cellSize, cellSize);
                }
            }
        }

        // grid lines only when large enough
        if (cellSize >= 6) {
            ctx.strokeStyle = "rgba(0,0,0,0.07)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x <= cols; x++) {
                const px = x * cellSize;
                ctx.moveTo(px, 0);
                ctx.lineTo(px, height);
            }
            for (let y = 0; y <= rows; y++) {
                const py = y * cellSize;
                ctx.moveTo(0, py);
                ctx.lineTo(width, py);
            }
            ctx.stroke();
        }
    }, [cellSize]);

    // ===== Canvas pixel buffer sync (DPR-aware) =====
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { width, height } = boardMetrics;
        const dpr = window.devicePixelRatio || 1;

        // internal bitmap size
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        // css size
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        draw();
    }, [boardMetrics, draw]);

    // ===== Simulation =====
    const applyCellSize = useCallback(
        (value) => {
            setIsRunning(false);
            setGeneration(0);
            generationRef.current = 0;
            setCellSize(clamp(Number(value), MIN_CELL_SIZE, MAX_CELL_SIZE));
        },
        []
    );

    const toggleRunning = useCallback(() => {
        setIsRunning((value) => !value);
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setGeneration(0);
        generationRef.current = 0;
        const { cols, rows } = boardMetricsRef.current;
        gridRef.current = createGrid(cols, rows);
        nextRef.current = createGrid(cols, rows);
        ageRef.current = createAgeGrid(cols, rows);
        nextAgeRef.current = createAgeGrid(cols, rows);
        draw();
    }, [draw]);

    const randomFill = useCallback(() => {
        const p = clamp(randomPercent, 0, 100) / 100;
        const { cols, rows } = boardMetricsRef.current;

        const grid = createGrid(cols, rows);
        const ages = createAgeGrid(cols, rows);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = Math.random() < p ? 1 : 0;
            ages[i] = grid[i] === 1 ? 1 : 0;
        }

        gridRef.current = grid;
        nextRef.current = createGrid(cols, rows);
        ageRef.current = ages;
        nextAgeRef.current = createAgeGrid(cols, rows);

        setGeneration(0);
        generationRef.current = 0;
        draw();
    }, [randomPercent, draw]);

    const step = useCallback(() => {
        const { cols, rows } = boardMetricsRef.current;
        const grid = gridRef.current;
        const next = nextRef.current;
        const ages = ageRef.current;
        const nextAges = nextAgeRef.current;
        const mode = boundaryModeRef.current;

        const idx = (x, y) => y * cols + x;

        const getCell = (x, y) => {
            if (mode === "wrap") {
                const xx = (x % cols + cols) % cols;
                const yy = (y % rows + rows) % rows;
                return grid[idx(xx, yy)];
            }
            if (x < 0 || y < 0 || x >= cols || y >= rows) return 0;
            return grid[idx(x, y)];
        };

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const neighbors =
                    getCell(x - 1, y - 1) +
                    getCell(x, y - 1) +
                    getCell(x + 1, y - 1) +
                    getCell(x - 1, y) +
                    getCell(x + 1, y) +
                    getCell(x - 1, y + 1) +
                    getCell(x, y + 1) +
                    getCell(x + 1, y + 1);

                const alive = grid[idx(x, y)] === 1;
                const willLive = alive
                    ? neighbors === 2 || neighbors === 3
                        ? 1
                        : 0
                    : neighbors === 3
                        ? 1
                        : 0;
                const index = idx(x, y);
                next[index] = willLive;
                nextAges[index] = willLive
                    ? alive
                        ? clamp(ages[index] + 1, 1, MAX_CELL_AGE)
                        : 1
                    : 0;
            }
        }

        gridRef.current = next;
        nextRef.current = grid;
        ageRef.current = nextAges;
        nextAgeRef.current = ages;

        const nextGeneration = generationRef.current + 1;
        generationRef.current = nextGeneration;
        setGeneration(nextGeneration);
        draw();
    }, [draw]);

    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            if (runningRef.current) step();
        }, tickMs);
        return () => clearInterval(id);
    }, [isRunning, tickMs, step]);

    useEffect(() => {
        if (colorScheme !== "animated") return;

        let frameId = 0;

        const animate = () => {
            draw();
            frameId = window.requestAnimationFrame(animate);
        };

        frameId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(frameId);
    }, [colorScheme, draw]);

    useEffect(() => {
        draw();
    }, [colorScheme, draw]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.repeat) return;

            if (event.key === "Enter") {
                event.preventDefault();
                toggleRunning();
                return;
            }

            if (event.key === "ArrowRight" && !runningRef.current) {
                event.preventDefault();
                step();
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                reset();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [reset, step, toggleRunning]);

    // ===== Input (click + drag) =====
    const isPointerDownRef = useRef(false);
    const lastPaintedRef = useRef(-1);

    const pointToIndex = useCallback(
        (clientX, clientY) => {
            const canvas = canvasRef.current;
            if (!canvas) return -1;

            const rect = canvas.getBoundingClientRect();

            // CSS pixels in canvas space
            const px = clientX - rect.left;
            const py = clientY - rect.top;

            const x = Math.floor(px / cellSize);
            const y = Math.floor(py / cellSize);

            const { cols, rows } = boardMetricsRef.current;
            if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;

            return y * cols + x;
        },
        [cellSize]
    );

    const toggleCell = useCallback(
        (clientX, clientY) => {
            const i = pointToIndex(clientX, clientY);
            if (i < 0) return;
            gridRef.current[i] ^= 1; // toggle (alive <-> dead)
            ageRef.current[i] = gridRef.current[i] === 1 ? 1 : 0;
            draw();
        },
        [pointToIndex, draw]
    );

    const paintAlive = useCallback(
        (clientX, clientY) => {
            const i = pointToIndex(clientX, clientY);
            if (i < 0 || i === lastPaintedRef.current) return;
            lastPaintedRef.current = i;
            gridRef.current[i] = 1;
            ageRef.current[i] = Math.max(ageRef.current[i], 1);
            draw();
        },
        [pointToIndex, draw]
    );

    const onPointerDown = (e) => {
        isPointerDownRef.current = true;
        lastPaintedRef.current = -1;
        toggleCell(e.clientX, e.clientY);
    };

    const onPointerMove = (e) => {
        if (!isPointerDownRef.current) return;
        paintAlive(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
        isPointerDownRef.current = false;
        lastPaintedRef.current = -1;
    };

    return (
        <div ref={pageRef} className={styles.page}>
            <h1 className={styles.title}>Conway's Game of Life</h1>

            <CanvasOverlayLayout
                width={`${boardMetrics.width}px`}
                height={`${boardMetrics.height}px`}
                toggleOpenLabel="Show controls panel"
                toggleCloseLabel="Hide controls panel"
                overlay={(
                    <aside>
                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Cell size</span>
                            </label>
                            <div className={styles.inputsRow}>
                                <Range
                                    className={styles.rangeInput}
                                    min={MIN_CELL_SIZE}
                                    max={MAX_CELL_SIZE}
                                    value={cellSize}
                                    label=" px"
                                    onChange={(e) => applyCellSize(e.target.value)}
                                />
                            </div>
                        </section>

                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Speed</span>
                            </label>
                            <div className={styles.inputsRow}>
                                <Range
                                    className={styles.rangeInput}
                                    min={20}
                                    max={1000}
                                    value={tickMs}
                                    label=" ms"
                                    onChange={(e) => setTickMs(+e.target.value)}
                                />
                            </div>
                        </section>

                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Field</span>
                            </label>
                            <div className={styles.inputsRow}>
                                <RadioGroup
                                    className={styles.radioGroup}
                                    name="boundaryMode"
                                    value={boundaryMode}
                                    onChange={(e) => setBoundaryMode(e.target.value)}
                                    options={[
                                        { value: "walls", label: "Bounded" },
                                        { value: "wrap", label: "Thorus" },
                                    ]}
                                    aria-label="Boundary mode selection"
                                />
                            </div>
                        </section>

                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Colors</span>
                            </label>
                            <div className={styles.colorSchemeGroup}>
                                <RadioGroup
                                    className={styles.radioGrid}
                                    name="colorScheme"
                                    value={colorScheme}
                                    onChange={(e) => setColorScheme(e.target.value)}
                                    options={COLOR_SCHEMES}
                                    aria-label="Color scheme selection"
                                />
                            </div>
                        </section>

                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Random fill</span>
                            </label>
                            <div className={styles.inputsRow}>
                                <Range
                                    className={styles.rangeInput}
                                    min={0}
                                    max={100}
                                    value={randomPercent}
                                    label="%"
                                    onChange={(e) => setRandomPercent(+e.target.value)}
                                />
                                <Button onClick={randomFill}>
                                    Fill
                                </Button>
                            </div>
                        </section>

                        <section className={styles.buttonsRow}>
                            <div className={styles.buttonWithHint}>
                                <Button onClick={toggleRunning}>
                                    {isRunning ? "Pause" : "Play"}
                                </Button>
                                <span className={styles.buttonHintText}>Enter</span>
                            </div>

                            <div className={styles.buttonWithHint}>
                                <Button
                                    className={`${isRunning ? styles.buttonDisabled : ""}`}
                                    disabled={isRunning}
                                    onClick={step}
                                    title={isRunning ? "Pause to advance manually" : "Advance one generation"}
                                >
                                    Next
                                </Button>
                                <span className={styles.buttonHintText}>Right Arrow</span>
                            </div>

                            <div className={styles.buttonWithHint}>
                                <Button onClick={reset}>
                                    Reset
                                </Button>
                                <span className={styles.buttonHintText}>Escape</span>
                            </div>
                        </section>

                        <section className={`${styles.panel} ${styles.metadataRow}`}>
                            <div className={styles.row}><span>Generation</span><strong>{generation}</strong></div>
                            <div className={styles.row}><span>Board</span><span>{boardMetrics.width}×{boardMetrics.height}px</span></div>
                            <div className={styles.row}><span>Cells</span><span>{boardMetrics.cols}×{boardMetrics.rows}</span></div>
                        </section>
                    </aside>
                )}
            >
                <div className={styles.boardColumn}>
                    <div
                        className={styles.boardWrapper}
                        style={{
                            width: `${boardMetrics.width}px`,
                            height: `${boardMetrics.height}px`,
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            className={styles.canvas}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerLeave={onPointerUp}
                        />
                    </div>
                </div>
            </CanvasOverlayLayout>
        </div>
    );
};

export default ConwayLifePage;
