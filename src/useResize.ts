import { useEffect, useState } from "react";

export const useResize = (width: number) => {
    const [isVisible, setVisible] = useState(false);


    const hide = () => {
        if (window.innerWidth <= width) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }
    useEffect(() => {
        hide()
        window.addEventListener('resize', hide)
    }, [])

    return { isVisible, width }
}