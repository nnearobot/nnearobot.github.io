import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CanvasOverlayLayout } from "@/components";
import { Button, Range, RadioGroup } from '@/components/UI'

import styles from "./ConwayLifePage.module.scss";


const ConwayLifePage = () => {
    const pageRef = useRef(null);
    const [size, setSize] = useState(100); // 50..300
    const [isRunning, setIsRunning] = useState(false);
    const [tickMs, setTickMs] = useState(120);
    const [generation, setGeneration] = useState(0);

    const [boundaryMode, setBoundaryMode] = useState("walls"); // "walls" | "wrap"
    const [randomPercent, setRandomPercent] = useState(20); // 0..100

    const canvasRef = useRef(null);
    const boardWrapperRef = useRef(null);

    // computed by algorithm (fixed px)
    const [cellSize, setCellSize] = useState();
    const [boardSize, setBoardSize] = useState(1000);

    // Simulation buffers
    const gridRef = useRef(new Uint8Array(size * size));
    const nextRef = useRef(new Uint8Array(size * size));

    // Latest refs
    const sizeRef = useRef(size);
    const runningRef = useRef(isRunning);
    const boundaryModeRef = useRef(boundaryMode);

    useEffect(() => {
        sizeRef.current = size;
    }, [size]);

    useEffect(() => {
        runningRef.current = isRunning;
    }, [isRunning]);

    useEffect(() => {
        boundaryModeRef.current = boundaryMode;
    }, [boundaryMode]);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    useEffect(() => {
        if (!boardWrapperRef.current || !pageRef.current) return;

        const updateBoardSize = () => {
            const pageBounds = pageRef.current.getBoundingClientRect();
            const availableWidth = Math.max(pageBounds.width, 300);
            const basePx = Math.min(availableWidth, window.innerHeight - 40); // leave some margin

            const cellSize = basePx / sizeRef.current;
            setCellSize(cellSize);
            setBoardSize(Math.ceil(cellSize * sizeRef.current));
        };

        updateBoardSize();

        const ro = new ResizeObserver(updateBoardSize);
        ro.observe(pageRef.current);

        window.addEventListener("resize", updateBoardSize);

        return () => {
            window.removeEventListener("resize", updateBoardSize);
            ro.disconnect();
        };
    }, [size]); // recalc when grid size changes

    // ---- Draw ----
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const n = sizeRef.current;
        const grid = gridRef.current;
        const cs = cellSize;
        const bs = cs * n;

        // background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, bs, bs);

        // alive cells
        ctx.fillStyle = "#000000";
        for (let y = 0; y < n; y++) {
            const rowBase = y * n;
            const py = y * cs;
            for (let x = 0; x < n; x++) {
                if (grid[rowBase + x] === 1) {
                    ctx.fillRect(x * cs, py, cs, cs);
                }
            }
        }

        // grid lines only when large enough
        if (cs >= 6) {
            ctx.strokeStyle = "rgba(0,0,0,0.07)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) {
                const p = i * cs;
                ctx.moveTo(p, 0);
                ctx.lineTo(p, bs);
                ctx.moveTo(0, p);
                ctx.lineTo(bs, p);
            }
            ctx.stroke();
        }
    }, [cellSize]);

    // ===== Canvas pixel buffer sync (DPR-aware) =====
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const n = sizeRef.current;
        const cssSize = cellSize * n; // must match boardWrapper fixed size
        const dpr = window.devicePixelRatio || 1;

        // internal bitmap size
        canvas.width = Math.floor(cssSize * dpr);
        canvas.height = Math.floor(cssSize * dpr);

        // css size
        canvas.style.width = `${cssSize}px`;
        canvas.style.height = `${cssSize}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        draw();
    }, [cellSize, size, draw]);

    // ===== Simulation =====
    const applySize = useCallback(
        (value) => {
            const n = clamp(Number(value), 50, 300);

            setIsRunning(false);
            setGeneration(0);
            setSize(n);

            sizeRef.current = n;
            gridRef.current = new Uint8Array(n * n);
            nextRef.current = new Uint8Array(n * n);

            // board size will be recomputed by the sizing effect
            requestAnimationFrame(draw);
        },
        [draw]
    );

    const reset = useCallback(() => {
        setIsRunning(false);
        setGeneration(0);
        const n = sizeRef.current;
        gridRef.current = new Uint8Array(n * n);
        nextRef.current = new Uint8Array(n * n);
        draw();
    }, [draw]);

    const randomFill = useCallback(() => {
        const n = sizeRef.current;
        const p = clamp(randomPercent, 0, 100) / 100;

        const grid = new Uint8Array(n * n);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = Math.random() < p ? 1 : 0;
        }

        gridRef.current = grid;
        nextRef.current = new Uint8Array(n * n);

        setGeneration(0);
        draw();
    }, [randomPercent, draw]);

    const step = useCallback(() => {
        const n = sizeRef.current;
        const grid = gridRef.current;
        const next = nextRef.current;
        const mode = boundaryModeRef.current;

        const idx = (x, y) => y * n + x;

        const getCell = (x, y) => {
            if (mode === "wrap") {
                const xx = (x % n + n) % n;
                const yy = (y % n + n) % n;
                return grid[idx(xx, yy)];
            }
            if (x < 0 || y < 0 || x >= n || y >= n) return 0;
            return grid[idx(x, y)];
        };

        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
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

            const n = sizeRef.current;
            if (x < 0 || y < 0 || x >= n || y >= n) return -1;

            return y * n + x;
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
                width={`${boardSize}px`}
                height={`${boardSize}px`}
                toggleOpenLabel="Show controls panel"
                toggleCloseLabel="Hide controls panel"
                overlay={(
                    <aside>
                        <section className={styles.panel}>
                            <label className={styles.controlLabel}>
                                <span>Field size</span>
                            </label>
                            <div className={styles.inputsRow}>
                                <Range
                                    className={styles.rangeInput}
                                    min={50}
                                    max={300}
                                    value={size}
                                    formatValue={(v) => `${v}×${v} cells`}
                                    onChange={(e) => applySize(e.target.value)}
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
                                    max={800}
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
                            <Button onClick={() => setIsRunning((v) => !v)}>
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

                        <section className={styles.metadataRow}>
                            <span>Generation</span>
                            <strong>{generation}</strong>
                        </section>

                        <section className={styles.metadataRow}>
                            <span>Board: {boardSize}px</span>
                            <span>{size}×{size}</span>
                            <span>Cell: {cellSize != undefined ? cellSize.toFixed(2) : ""}px</span>
                        </section>
                    </aside>
                )}
            >
                <div className={styles.boardColumn}>
                    <div
                        ref={boardWrapperRef}
                        className={styles.boardWrapper}
                        style={{
                            width: `${boardSize}px`,
                            height: `${boardSize}px`,
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
