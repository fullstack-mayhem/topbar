import React, { useState, useRef, useEffect } from 'react'
import { Item } from './Item'
import './style.css'

export function Topbar({ data }) {
    const [openedMenu, setOpenedMenu] = useState('')

    const node = useRef();

    const handleClick = e => {
        if (!node.current.contains(e.target)) {
            setOpenedMenu('')
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [])

    return (
        <div id="topbar" ref={node}>
            {data.map(el => {
                return (
                    <Item
                        key={el.htmlId}
                        id={el.htmlId}
                        classNames={el.class}
                        floatRight={el.floatRight}
                        content={el.content}
                        openedMenu={openedMenu}
                        setOpenedMenu={setOpenedMenu}>
                            {el.content}
                    </Item>
                )
            })}
        </div>
    )
}