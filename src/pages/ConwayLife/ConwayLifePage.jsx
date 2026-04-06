import { useCallback, useEffect, useRef, useState } from "react";

import { CanvasOverlayLayout } from "@/components";
import { Button, Range, RadioGroup } from '@/components/UI'

import styles from "./ConwayLifePage.module.scss";

const DEFAULT_CELL_SIZE = 10;
const MIN_CELL_SIZE = 4;
const MAX_CELL_SIZE = 24;
const MIN_BOARD_SIDE = 120;

const createGrid = (cols, rows) => new Uint8Array(cols * rows);

const resizeGrid = (sourceGrid, prevCols, prevRows, nextCols, nextRows) => {
    const nextGrid = createGrid(nextCols, nextRows);
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

const ConwayLifePage = () => {
    const pageRef = useRef(null);
    const [cellSize, setCellSize] = useState(DEFAULT_CELL_SIZE);
    const [isRunning, setIsRunning] = useState(false);
    const [tickMs, setTickMs] = useState(120);
    const [generation, setGeneration] = useState(0);

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

    // Latest refs
    const runningRef = useRef(isRunning);
    const boundaryModeRef = useRef(boundaryMode);
    const boardMetricsRef = useRef(boardMetrics);

    useEffect(() => {
        runningRef.current = isRunning;
    }, [isRunning]);

    useEffect(() => {
        boundaryModeRef.current = boundaryMode;
    }, [boundaryMode]);

    useEffect(() => {
        boardMetricsRef.current = boardMetrics;
    }, [boardMetrics]);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

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
            nextRef.current = createGrid(nextCols, nextRows);
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

        // background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // alive cells
        ctx.fillStyle = "#000000";
        for (let y = 0; y < rows; y++) {
            const rowBase = y * cols;
            const py = y * cellSize;
            for (let x = 0; x < cols; x++) {
                if (grid[rowBase + x] === 1) {
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
        const { cols, rows } = boardMetricsRef.current;
        gridRef.current = createGrid(cols, rows);
        nextRef.current = createGrid(cols, rows);
        draw();
    }, [draw]);

    const randomFill = useCallback(() => {
        const p = clamp(randomPercent, 0, 100) / 100;
        const { cols, rows } = boardMetricsRef.current;

        const grid = createGrid(cols, rows);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = Math.random() < p ? 1 : 0;
        }

        gridRef.current = grid;
        nextRef.current = createGrid(cols, rows);

        setGeneration(0);
        draw();
    }, [randomPercent, draw]);

    const step = useCallback(() => {
        const { cols, rows } = boardMetricsRef.current;
        const grid = gridRef.current;
        const next = nextRef.current;
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
                next[idx(x, y)] = alive
                    ? neighbors === 2 || neighbors === 3
                        ? 1
                        : 0
                    : neighbors === 3
                        ? 1
                        : 0;
            }
        }

        gridRef.current = next;
        nextRef.current = grid;

        setGeneration((g) => g + 1);
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
                            <Button onClick={toggleRunning}>
                                {isRunning ? "Pause" : "Play"}
                            </Button>

                            <Button
                                className={`${isRunning ? styles.buttonDisabled : ""}`}
                                disabled={isRunning}
                                onClick={step}
                                title={isRunning ? "Pause to advance manually" : "Advance one generation"}
                            >
                                Next
                            </Button>

                            <Button onClick={reset}>
                                Reset
                            </Button>
                        </section>

                        <section className={styles.buttonHintsRow} aria-label="Keyboard shortcuts">
                            <span>Enter</span>
                            <span>Right Arrow</span>
                            <span>Escape</span>
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
