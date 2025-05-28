import { useEffect, useRef, useState } from "react";

const AnimatedNum = ({ value, className, duration = 300 }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const timeoutRef = useRef(null);

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        if (value === displayValue) return;

        const start = displayValue;
        const diff = value - start;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.round(start + diff * progress);

            setDisplayValue(currentValue);
            if (progress < 1) {
                timeoutRef.current = requestAnimationFrame(animate);
            }
        };

        timeoutRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(timeoutRef.current);
    }, [value]);

    return (
        <span className={`transition-all duration-300 ease-in-out ${className}`}>
            {displayValue}
        </span>
    );
};

export default AnimatedNum;
