import { useState, useCallback, useRef, MouseEvent, TouchEvent } from 'react';

interface UseLongPressOptions {
    onLongPress: (event: MouseEvent | TouchEvent) => void;
    onClick?: (event: MouseEvent | TouchEvent) => void;
    ms?: number;
}

const useLongPress = ({
    onLongPress,
    onClick,
    ms = 300,
}: UseLongPressOptions) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<number | null>(null);

    const start = useCallback(
        (event: MouseEvent | TouchEvent) => {
            event.persist();

            timeout.current = window.setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, ms);
        },
        [onLongPress, ms]
    );

    const clear = useCallback(
        (event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            if (shouldTriggerClick && !longPressTriggered && onClick) {
                onClick(event);
            }
            setLongPressTriggered(false);
        },
        [onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e: MouseEvent) => start(e),
        onTouchStart: (e: TouchEvent) => start(e),
        onMouseUp: (e: MouseEvent) => clear(e),
        onMouseLeave: (e: MouseEvent) => clear(e, false),
        onTouchEnd: (e: TouchEvent) => clear(e),
    };
};

export default useLongPress;
