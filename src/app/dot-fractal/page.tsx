'use client';

import H1 from '@/components/UI/H1';
import Dots from '@/components/Dots';
import Container from '@/components/UI/Container';
import H3 from '@/components/UI/H3';
import H4 from '@/components/UI/H4';

export default function DotsPage() {
    return (
        <>
            <H1 className="!mb-0">Dot fractal generator</H1>
            <Container>
                <p className="text-center mb-10">Vizualization of a fractal drawing using random dot selection</p>
            </Container>

            <Dots />

            <Container className="mt-5">
                <H3>The algorithm</H3>
                <ol>
                    <li>Draw initial dots arranged in a circular pattern (6 by default)</li>
                    <li>Select the start dot&mdash;the first dot initially</li>
                    <li>Select a random dot</li>
                    <li>Draw a new dot that divides the segment between start and selected dots in a certain ratio (1/3 by default)</li>
                    <li>Now this dot is a start dot</li>
                    <li>Repeat steps 3&mdash;5</li>
                </ol>

                <H3 className="mt-5">Features</H3>
                <H4>Interactive Control Panel:</H4>
                <ul>
                    <li>Number of vertex: set the number of initial dots in the shape.</li>
                    <li>Dot size: define the size of the dots.</li>
                    <li>Ratio: specify the ratio for positioning new dots.</li>
                    <li>Number of dots: determine the total number of dots to be drawn.</li>
                    <li>Delay: set the delay between drawing new dots.</li>
                </ul>

                <H4>Dynamic Visualization:</H4>
                <p>Utilize <a href="https://p5js.org/">p5.js</a> for real-time graphics rendering.</p>
                <p>Visualize the algorithm step-by-step with a delay, creating an engaging experience.</p>
            </Container>
        </>
    )
}
