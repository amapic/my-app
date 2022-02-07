
import React, { useState, useEffect, useRef, useCallback } from 'react';




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
            </>
        </div>
    )
}