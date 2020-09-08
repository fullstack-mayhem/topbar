import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DownArrow from './assets/arrow.svg'

export function Item({ floatRight, classNames, id, content, openedMenu, setOpenedMenu }) {
    if (!floatRight) floatRight = false
    if (!classNames) classNames = ''

    let divProps = {
        id: id,
        className: !classNames ? 'topbar_item' : 'topbar_item ' + classNames,
        style: { float: floatRight ? 'right' : 'left'}
    }

    useEffect(() => {
        if (content.type == 'dropdown') {
            let menu = document.querySelector('#' + id + '_menu')
            if (menu) {
                let style = getComputedStyle(menu)
                let marginLeft = parseInt(style.marginLeft)
                let left = parseInt(style.left)
                let width = menu.offsetWidth
                if (window.innerWidth - width < left) {
                    let shift = `${marginLeft - (left + width - window.innerWidth)}px`
                    menu.style.marginLeft = shift
                }
            }
        }
    })
    
    switch(content.type) {
        case 'logo':
            if (content.icon !== "") {
                return <div {...divProps}><img src={content.icon} alt={content.altText} /></div>
            } else {
                return <div {...divProps}>{content.altText}</div>
            }
        case 'link':
            return (
                <div {...divProps}>
                    <Link to={content.to}>
                        {content.text}
                    </Link>
                </div>
                )
        case 'text':
            return (
                <div {...divProps}>
                    {content.text}
                </div>
            )
        case 'dropdown':
            let { className } = divProps
            className = className + ' topbar_dropdown'
            divProps = {...divProps, className}
            return (
                <div id={id} {...divProps}>
                    <span className="menu_link" onClick={() => setOpenedMenu(openedMenu === id ? '': id)}>
                        {content.text} &nbsp;
                        <img src={DownArrow} width={10} alt={content.text} />
                    </span>

                    {openedMenu === id ?
                    <div id={id + `_menu`} className="topbar_dropdown_menu">
                        {content.items.map((item, index)=> <span key={index}>{item}</span>)}
                    </div>
                    : null}
                </div>
            )
        default:
            return null
    }
}