import React, { useEffect, useState } from "react";
import { KRW } from "./CommonFunc";

const AnimatedNumber = ({ targetValue, duration = 1000 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startValue = displayValue;
        const increment = (targetValue - startValue) / (duration / 10); // 10ms 간격으로 업데이트

        const intervalId = setInterval(() => {
            startValue += increment;
            if (
                (increment > 0 && startValue >= targetValue) ||
                (increment < 0 && startValue <= targetValue)
            ) {
                startValue = targetValue;
                clearInterval(intervalId);
            }
            setDisplayValue(Math.round(startValue));
        }, 10); // 10ms 간격으로 업데이트

        return () => clearInterval(intervalId);
    }, [targetValue, duration]);

    return KRW(displayValue);
};

export default AnimatedNumber;
