'use client';

import Matter, { type Body } from 'matter-js';
import { useEffect, useRef, useState } from 'react';

import './FallingText.css';

interface FallingTextProps {
  className?: string;
  text?: string;
  /** When provided, each entry is rendered as its own falling body (spaces preserved). */
  units?: string[];
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'click' | 'hover' | 'scroll';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

interface WordBody {
  elem: HTMLElement;
  body: Body;
}

const FallingText = ({
  className = '',
  text = '',
  units,
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(trigger === 'auto');

  useEffect(() => {
    if (!textRef.current || !units) return;
    const newHTML = units
      .map((unit) => {
        const isHighlighted = highlightWords.some((hw) => unit.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${unit}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [units, highlightWords, highlightClass]);

  useEffect(() => {
    if (!textRef.current || units) return;
    const words = text.split(' ');
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass, units]);

  useEffect(() => {
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, setEffectStarted]);

  useEffect(() => {
    if (!effectStarted) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !textElement || !canvasContainer) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Matter.Engine.create();
    engine.world.gravity.y = gravity;

    const render = Matter.Render.create({
      element: canvasContainer,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    };
    const floor = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const wordSpans = textElement.querySelectorAll<HTMLElement>('.word');
    const wordBodies: WordBody[] = [...wordSpans].map((elem) => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    Matter.World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine, 16.666);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (render.canvas && canvasContainer) {
        canvasContainer.removeChild(render.canvas);
      }
      Matter.World.clear(engine.world, true);
      Matter.Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
