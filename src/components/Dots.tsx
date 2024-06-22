import React, { useRef, useState } from 'react';
import p5 from 'p5';
import TextInput from './UI/TextInput';
import FormRow from './UI/FormRow';
import FormLabel from './UI/FormLabel';
import Button from './UI/Button';

interface DotProps {
  x: number;
  y: number;
}

const Dots: React.FC = () => {
    const sketchRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<p5 | null>(null); // Use useRef to persist p5 instance between re-renders
    const canvasSize = 620;

    const [vertexNum, setVertexNum] = useState(6);
    const [dotSize, setDotSize] = useState(1);
    const [ratio, setRatio] = useState(1 / 3);
    const [delay, setDelay] = useState(1);
    const [dotAmount, setDotAmount] = useState(100000);

    const handleRestart = () => {
        if (typeof window == 'undefined') {
            return;
        }
        if (p5InstanceRef.current) {
            p5InstanceRef.current.remove();
        }
        p5InstanceRef.current = new p5(sketch, sketchRef.current as HTMLDivElement);
    };

    const sketch = (p: p5) => {
        let dots: DotProps[] = [];
        let dot1: DotProps;
        let dot2: DotProps;

        p.setup = () => {
            p.createCanvas(canvasSize, canvasSize);
            p.background(255);
            dots = drawInitialDots();
            dot1 = dots[0]; // dot1 is the first dot in the hexagon

            performDrawing();
        };

        let count = 0;
        const performDrawing = () => {
            if (count < dotAmount) {
                dot2 = dots[Math.floor(p.random(0, vertexNum))];
                dot1 = drawDotBetween(dot1, dot2);
                count++;
                setTimeout(performDrawing, delay);
            }
        };

        const drawInitialDots = () => {
            const centerX = p.width / 2;
            const centerY = p.height / 2;
            const radius = canvasSize / 2 - 10;
            const dotsArray = [];

            for (let i = 0; i < vertexNum; i++) {
                const angle = p.TWO_PI / vertexNum * i;
                const x = centerX + radius * p.cos(angle);
                const y = centerY + radius * p.sin(angle);
                p.fill(0);
                p.ellipse(x, y, dotSize, dotSize);
                dotsArray.push({ x, y });
            }

            return dotsArray;
        };

        const drawDotBetween = (dot1: DotProps, dot2: DotProps): DotProps => {
            const dot3 = {
                x: dot2.x + (dot1.x - dot2.x) * ratio,
                y: dot2.y + (dot1.y - dot2.y) * ratio,
            };

            p.ellipse(dot3.x, dot3.y, dotSize, dotSize);

            return dot3;
        };
    };

    return (
        <div className="flex w-[930px] mx-auto">
            <div id="settings" className="w-[300px] mx-2">
                <FormRow className="xs:grid-cols-3">
                    <FormLabel>Number of vertex</FormLabel>
                    <div className='col-span-2'>
                        <TextInput
                            type="number"
                            value={vertexNum}
                            min="2"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setVertexNum(parseInt(e.currentTarget.value))}
                        />
                    </div>
                </FormRow>
                <FormRow className="xs:grid-cols-3">
                    <FormLabel>Dot size</FormLabel>
                    <div className='col-span-2'>
                        <TextInput
                            type="number"
                            value={dotSize}
                            min="1"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setDotSize(parseInt(e.currentTarget.value))}
                            />
                    </div>
                </FormRow>
                <FormRow className="xs:grid-cols-3">
                    <FormLabel>Ratio</FormLabel>
                    <div className='col-span-2'>
                        <TextInput
                            type="number"
                            step="0.1"
                            value={ratio}
                            min="0.1"
                            max="0.9"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRatio(parseFloat(e.currentTarget.value))}
                        />
                    </div>
                </FormRow>
                <FormRow className="xs:grid-cols-3">
                    <FormLabel>Number of dots</FormLabel>
                    <div className='col-span-2'>
                        <TextInput
                            type="number"
                            value={dotAmount}
                            min="1"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setDotAmount(parseInt(e.currentTarget.value))}
                        />
                    </div>
                </FormRow>
                <FormRow className="xs:grid-cols-3">
                    <FormLabel>Delay, ms</FormLabel>
                    <div className='col-span-2'>
                        <TextInput
                            type="number"
                            value={delay}
                            min="1"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setDelay(parseInt(e.currentTarget.value))}
                        />
                    </div>
                </FormRow>

                <Button onClick={handleRestart} className="mt-2 my-2 mx-auto block">Start</Button>
            </div>
            <div id="Dots" className="" ref={sketchRef}></div>
        </div>
    )
};

export default Dots;
