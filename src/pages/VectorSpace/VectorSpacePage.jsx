import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Container, InputWithSide, Button } from "@/components/UI";

import styles from "./VectorSpacePage.module.scss";

const MAX_VECTORS = 100;
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;

const DEFAULT_BASIS = {
    i: { x: 1, y: 0, z: 0 },
    j: { x: 0, y: 1, z: 0 },
    k: { x: 0, y: 0, z: 1 },
};

const INITIAL_VECTOR_FORM = { x: "", y: "", z: "" };
const INITIAL_BASIS_FORM = {
    i: { x: "1", y: "0", z: "0" },
    j: { x: "0", y: "1", z: "0" },
    k: { x: "0", y: "0", z: "1" },
};

const isCompleteNumericInput = (value) => /^-?\d+(\.\d+)?$/.test(value);

const parseCoordinate = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const generateRandomVectorColor = () => {
    const color = new THREE.Color();
    color.setHSL(Math.random(), Math.random() * 0.9 + 0.5, Math.random() * 0.6 + 0.2);
    return `#${color.getHexString()}`;
};

const disposeGroupChildren = (group) => {
    while (group.children.length > 0) {
        const child = group.children[0];
        group.remove(child);

        if (child.geometry) child.geometry.dispose();
        if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
        } else if (child.material) {
            child.material.dispose();
        }
        if (child.line?.geometry) child.line.geometry.dispose();
        if (child.line?.material) child.line.material.dispose();
        if (child.cone?.geometry) child.cone.geometry.dispose();
        if (child.cone?.material) child.cone.material.dispose();
    }
};

const createPlaneGrid = (basisA, basisB, size, color) => {
    const points = [];

    for (let step = -size; step <= size; step += 1) {
        const fixedAStart = basisA.clone().multiplyScalar(step).add(basisB.clone().multiplyScalar(-size));
        const fixedAEnd = basisA.clone().multiplyScalar(step).add(basisB.clone().multiplyScalar(size));
        points.push(fixedAStart, fixedAEnd);

        const fixedBStart = basisB.clone().multiplyScalar(step).add(basisA.clone().multiplyScalar(-size));
        const fixedBEnd = basisB.clone().multiplyScalar(step).add(basisA.clone().multiplyScalar(size));
        points.push(fixedBStart, fixedBEnd);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
    });

    return new THREE.LineSegments(geometry, material);
};

const VectorSpacePage = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const spaceGroupRef = useRef(null);
    const vectorGroupRef = useRef(null);
    const basisGroupRef = useRef(null);
    const vectorsRef = useRef([]);

    const [vectors, setVectors] = useState([]);
    const [vectorForm, setVectorForm] = useState(INITIAL_VECTOR_FORM);
    const [basis, setBasis] = useState(DEFAULT_BASIS);
    const [basisForm, setBasisForm] = useState(INITIAL_BASIS_FORM);
    const [isControlsOpen, setIsControlsOpen] = useState(true);

    const canAddVector = useMemo(() => {
        if (vectors.length >= MAX_VECTORS) return false;
        return ["x", "y", "z"].every((axis) => vectorForm[axis] !== "");
    }, [vectorForm, vectors.length]);

    useEffect(() => {
        vectorsRef.current = vectors;
    }, [vectors]);

    useEffect(() => {
        if (!mountRef.current) return undefined;

        const mountNode = mountRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#f6f7fb");

        const camera = new THREE.OrthographicCamera(CANVAS_WIDTH / -100, CANVAS_WIDTH / 100, CANVAS_HEIGHT / 100, CANVAS_HEIGHT / -100);
        camera.position.set(100, 80, 100);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0, 0);

        const ambientLight = new THREE.AmbientLight("#ffffff", 1.1);
        const directionalLight = new THREE.DirectionalLight("#ffffff", 1.4);
        directionalLight.position.set(8, 10, 6);

        const spaceGroup = new THREE.Group();
        const vectorGroup = new THREE.Group();
        const basisGroup = new THREE.Group();

        scene.add(camera);
        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(spaceGroup);
        scene.add(vectorGroup);
        scene.add(basisGroup);

        mountNode.appendChild(renderer.domElement);

        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;
        controlsRef.current = controls;
        spaceGroupRef.current = spaceGroup;
        vectorGroupRef.current = vectorGroup;
        basisGroupRef.current = basisGroup;

        const renderScene = () => {
            controls.update();
            renderer.render(scene, camera);
        };

        const syncRendererSize = () => {
            const width = mountNode.clientWidth || CANVAS_WIDTH;
            const height = mountNode.clientHeight || CANVAS_HEIGHT;

            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderScene();
        };

        syncRendererSize();

        const resizeObserver = new ResizeObserver(syncRendererSize);
        resizeObserver.observe(mountNode);

        const animate = () => {
            renderScene();
        };

        renderer.setAnimationLoop(animate);

        return () => {
            resizeObserver.disconnect();
            renderer.setAnimationLoop(null);
            controls.dispose();
            renderer.dispose();
            scene.clear();
            mountNode.removeChild(renderer.domElement);
        };
    }, []);

    const redrawSpaceGroup = (currentBasis) => {
        if (!spaceGroupRef.current) return;

        const group = spaceGroupRef.current;
        disposeGroupChildren(group);

        const basisI = new THREE.Vector3(currentBasis.i.x, currentBasis.i.y, currentBasis.i.z);
        const basisJ = new THREE.Vector3(currentBasis.j.x, currentBasis.j.y, currentBasis.j.z);
        const basisK = new THREE.Vector3(currentBasis.k.x, currentBasis.k.y, currentBasis.k.z);

        const planeGrids = [
            createPlaneGrid(basisI, basisK, 10, "#d8a2a3"),
            createPlaneGrid(basisI, basisJ, 10, "#96b9d5"),
            createPlaneGrid(basisJ, basisK, 10, "#a3c78c"),
        ];

        planeGrids.forEach((grid) => group.add(grid));
    };

    const redrawBasisGroup = (currentBasis) => {
        if (!basisGroupRef.current) return;

        const group = basisGroupRef.current;
        disposeGroupChildren(group);

        const basisEntries = [
            { key: "i", color: "#ff4d4f" },
            { key: "j", color: "#40a9ff" },
            { key: "k", color: "#73d13d" },
        ];

        basisEntries.forEach(({ key, color }) => {
            const current = currentBasis[key];
            const direction = new THREE.Vector3(current.x, current.y, current.z);
            const length = Math.max(direction.length(), 0.001);
            const normalizedDirection = direction.lengthSq() === 0
                ? new THREE.Vector3(1, 0, 0)
                : direction.clone().normalize();

            const arrow = new THREE.ArrowHelper(
                normalizedDirection,
                new THREE.Vector3(0, 0, 0),
                length,
                color,
                0.25,
                0.12,
            );

            group.add(arrow);
        });
    };

    const redrawVectorGroup = (currentVectors, currentBasis) => {
        if (!vectorGroupRef.current) return;

        const group = vectorGroupRef.current;
        disposeGroupChildren(group);

        currentVectors.forEach((vector) => {
            const end = transformVector(vector.coordinates, currentBasis);
            const length = Math.max(end.length(), 0.001);
            const normalizedDirection = end.lengthSq() === 0
                ? new THREE.Vector3(1, 0, 0)
                : end.clone().normalize();

            const arrow = new THREE.ArrowHelper(
                normalizedDirection,
                new THREE.Vector3(0, 0, 0),
                length,
                vector.color,
                0.5,
                0.3,
            );

            arrow.line.material.linewidth = 3;
            group.add(arrow);
        });
    };

    useEffect(() => {
        redrawSpaceGroup(basis);
    }, [basis]);

    useEffect(() => {
        redrawBasisGroup(basis);
    }, [basis]);

    useEffect(() => {
        redrawVectorGroup(vectors, basis);
    }, [basis, vectors]);

    const transformVector = (coordinates, currentBasis) => {
        const basisI = currentBasis.i;
        const basisJ = currentBasis.j;
        const basisK = currentBasis.k;

        return new THREE.Vector3(
            coordinates.x * basisI.x + coordinates.y * basisJ.x + coordinates.z * basisK.x,
            coordinates.x * basisI.y + coordinates.y * basisJ.y + coordinates.z * basisK.y,
            coordinates.x * basisI.z + coordinates.y * basisJ.z + coordinates.z * basisK.z
        );
    };

    const handleBasisTransformationChange = (nextBasis) => {
        redrawSpaceGroup(nextBasis);
        redrawBasisGroup(nextBasis);
        redrawVectorGroup(vectorsRef.current, nextBasis);

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };

    const handleVectorInputChange = (axis, value) => {
        setVectorForm((prev) => ({ ...prev, [axis]: value }));
    };

    const handleBasisInputChange = (basisKey, axis, value) => {
        setBasisForm((prev) => ({
            ...prev,
            [basisKey]: {
                ...prev[basisKey],
                [axis]: value,
            },
        }));

        if (!isCompleteNumericInput(value)) return;

        setBasis((prev) => {
            const nextBasis = {
                ...prev,
                [basisKey]: {
                    ...prev[basisKey],
                    [axis]: Number(value),
                },
            };

            handleBasisTransformationChange(nextBasis);

            return nextBasis;
        });
    };

    const handleBasisInputBlur = (basisKey, axis) => {
        setBasisForm((prev) => ({
            ...prev,
            [basisKey]: {
                ...prev[basisKey],
                [axis]: String(basis[basisKey][axis]),
            },
        }));
    };

    const handleAddVector = () => {
        if (!canAddVector) return;

        const coordinates = {
            x: parseCoordinate(vectorForm.x),
            y: parseCoordinate(vectorForm.y),
            z: parseCoordinate(vectorForm.z),
        };

        setVectors((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                coordinates,
                color: generateRandomVectorColor(),
            },
        ]);

        setVectorForm(INITIAL_VECTOR_FORM);
    };

    const handleVectorColorChange = (vectorId, color) => {
        setVectors((prev) =>
            prev.map((vector) =>
                vector.id === vectorId
                    ? { ...vector, color }
                    : vector
            )
        );
    };

    const handleRemoveVector = (vectorId) => {
        setVectors((prev) => prev.filter((vector) => vector.id !== vectorId));
    };

    return (
        <div className={styles.vectorSpace}>
            <h1>Vector Space</h1>
            <p className="lead">
                Add vectors from the origin and redefine the basis vectors of the space.
            </p>

            <div className={styles.layout}>
                <div className={styles.canvasFrame}>
                    <div ref={mountRef} className={styles.canvasMount} />
                </div>

                <div className={styles.overlay}>
                    {isControlsOpen && (
                        <aside className={styles.controlsPanel}>
                            <section className={styles.panel}>
                                <div className={styles.panelHeader}>
                                    <h3>Basis</h3>
                                </div>

                                <div className={styles.basisTable}>
                                    {["i", "j", "k"].map((basisKey) => (
                                        <div key={basisKey} className={styles.basisBlock}>
                                            <span className={styles.basisLabel}>{basisKey}</span>
                                            <div className={styles.basisCoordinates}>
                                                {["x", "y", "z"].map((axis) => (
                                                    <InputWithSide
                                                        key={axis}
                                                        id={`basis-${basisKey}-${axis}`}
                                                        className={styles.field}
                                                        value={basisForm[basisKey][axis]}
                                                        onChange={(event) => handleBasisInputChange(basisKey, axis, event.currentTarget.value)}
                                                        onBlur={() => handleBasisInputBlur(basisKey, axis)}
                                                        placeholder={axis}
                                                        sideLabel={axis}
                                                        side="left"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className={styles.panel}>
                                <div className={styles.panelHeader}>
                                    <h3>Vectors</h3>
                                    <span>{vectors.length}/{MAX_VECTORS}</span>
                                </div>

                                <div className={styles.newVectorForm}>
                                    {["x", "y", "z"].map((axis) => (
                                        <InputWithSide
                                            key={axis}
                                            id={`vector-${axis}`}
                                            className={styles.field}
                                            value={vectorForm[axis]}
                                            onChange={(event) => handleVectorInputChange(axis, event.currentTarget.value)}
                                            placeholder={axis}
                                            sideLabel={axis}
                                            side="left"
                                        />
                                    ))}

                                </div>
                                <div className={styles.addRow}>
                                    <Button
                                        className={styles.primaryButton}
                                        disabled={!canAddVector}
                                        onClick={handleAddVector}
                                    >
                                        Add
                                    </Button>
                                </div>

                                <div className={styles.vectorList}>
                                    {vectors.length === 0 ? (
                                        <p className={styles.emptyState}>No vectors added yet.</p>
                                    ) : (
                                        vectors.map((vector, index) => (
                                            <div key={vector.id} className={styles.vectorRow}>
                                                <label
                                                    className={styles.vectorSwatch}
                                                    style={{ backgroundColor: vector.color }}
                                                >
                                                    <input
                                                        type="color"
                                                        value={vector.color}
                                                        className={styles.vectorColorInput}
                                                        onChange={(event) =>
                                                            handleVectorColorChange(
                                                                vector.id,
                                                                event.currentTarget.value
                                                            )
                                                        }
                                                        aria-label={`Change color of vector ${index + 1}`}
                                                    />
                                                </label>
                                                <span>
                                                    v{index + 1} = (
                                                    {vector.coordinates.x}, {vector.coordinates.y}, {vector.coordinates.z})
                                                </span>
                                                <button
                                                    type="button"
                                                    className={styles.removeVectorButton}
                                                    onClick={() => handleRemoveVector(vector.id)}
                                                    aria-label={`Remove vector ${index + 1}`}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </aside>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setIsControlsOpen((prev) => !prev)}
                    aria-label={isControlsOpen ? "Hide control panel" : "Show control panel"}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </div>
    );
};

export default VectorSpacePage;
