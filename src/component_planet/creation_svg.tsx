
import React, { useState, useEffect, useRef, useCallback } from 'react';
// import CaretIcon_up from '../img/icons/caret_up.svg';
// import CaretIcon_down from '../img/icons/caret_down.svg';
// import ee from '../img/icons_as_text/img1.js';
// import ff from '../img/icons_as_text/img2.js';
// // import SVG from '@svgdotjs/svg.js'
// import { useSpring, animated, config } from 'react-spring';
// import { useResizeDetector } from 'react-resize-detector';



export function LegendeSvg(props: any): any {
    const dist_max = props.items.at(-1).semi_major_axis
    // console.log(dist_max);
    const width: number = dist_max > 1 ? 100 / dist_max : 98
    const strokeWidth: number = 1
    const texte = dist_max > 1 ? "Distance Terre-Soleil" : "1/" + (Math.round(1 / dist_max)).toString() + " de la distance terre-soleil"
    return (
        <div style={{ margin: "0px 0 0 22px", width: width.toString() + "%" }}>
            <>
                <svg width="100%" height="50" viewBox="0 0 100% 50" >
                    <line x1="1" y1="10" x2="1" y2="15" stroke="black" strokeWidth={strokeWidth} />
                    <line x1="1" y1="15" x2="98%" y2="15" stroke="black" strokeWidth={strokeWidth} />

                    <line x1="98%" y1="15" x2="98%" y2="10" stroke="black" strokeWidth={strokeWidth} />
                    <text alignmentBaseline="middle" textAnchor="middle" fontFamily="Roboto, Helvetica, Arioal, sans-serif" x="50%" y="28" fill="black">{texte}</text>
                </svg>
                {/* <svg width="150" height="100" viewBox="0 0 3 2">
                    <rect width="1" height="2" x="0" fill="#008d46" />
                    <rect width="1" height="2" x="1" fill="#ffffff" />
                    <rect width="1" height="2" x="2" fill="#d2232c" />
                </svg> */}
                {/* <svg preserveAspectRatio="xMinYMid meet" width="100" height="50" viewBox="0 0 100 50">
                    <text alignment-baseline="middle" fontFamily="Roboto, Helvetica, Arioal, sans-serif" x="0" y="0" fill="black">Distance Terre-Soleil</text>
                </svg> */}
            </>
        </div>
    )
}