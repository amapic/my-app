// import { boolean } from 'mathjs';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image'
import Ratio from 'react-bootstrap/Ratio'
import mars from "./../img/frise/mars.png";
import mars2 from "./../img/frise/mars2.png";
import gaz from "./../img/frise/gaz.jpg";
import gaz2 from "./../img/frise/gaz2.png";
import gaz3 from "./../img/frise/gaz3.png";
import gaz4 from "./../img/frise/gaz4.png";
import gaz5 from "./../img/frise/gaz5.png";
import gaz6 from "./../img/frise/gaz6.png";
import sun from "./../img/frise/sun.jpg";
import wait from "./../img/wait.gif";
import { LegendeSvg } from "./creation_svg"
import { countBy } from 'underscore'
import shortid from 'shortid'
import { useResizeDetector } from 'react-resize-detector';
import logo from '../img/ezgif.com-gif-maker2.gif'
import CSS from 'csstype'
import {
    ScatterChart,
    XAxis,
    YAxis,
    Scatter,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Dot,
    ReferenceDot,
    ReferenceLine,

} from 'recharts'
import { chercheData } from '../fonction/fonction'
import { sSolaireT, dataT, typePlaneteT } from '../types/interface'
import { debounce } from "ts-debounce";

export const DessinSystemeSolaire = (props: any) => {
    const dataTEmpty = {} as dataT[]
    const [sSolaire, setsSolaire] = useState<string>("HD 219134");
    const [items, setItems] = useState<dataT[] | null>(null);
    useEffect(() => {
        let isMounted = true;
        if (sSolaire !== "") {
            chercheData().then((tt) => {
                var gg = Object.values(tt)

                for (var i = gg.length - 1; i >= 0; i--) {
                    if (gg[i].star_name !== sSolaire) {
                        gg.splice(i, 1);
                    }
                }
                let arrayofPlanet = Array.from(gg)
                function sortByKey(arrayofPlanet: any[], key: string) {
                    return arrayofPlanet.sort(function (a: any, b: any) {
                        var x = a[key]; var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }
                sortByKey(arrayofPlanet, "semi_major_axis")

                if (isMounted) setItems(arrayofPlanet)

            });
        }
        return () => { isMounted = false };
    }, [sSolaire])
    return (
        items &&
        <>
            <Table setSsolaire={setsSolaire} />

            <h4 className="feature-title text-center">Planètes du système sélectionné</h4>

            <div id="frise-container">
                <div className="frise-item-first">
                    <Image width="50px" height="50px" src={sun} />
                </div>
                {

                    Array.from(items).map((item, index) => {

                        var dist: number | string = index == 0 ? Array.from(items)[index].semi_major_axis : Array.from(items)[index].semi_major_axis - Array.from(items)[index - 1].semi_major_axis
                        dist = 100 * dist / Array.from(items)[Object.keys(items).length - 1].semi_major_axis
                        dist = dist.toString() + "%"

                        return (
                            <div key={index} style={{ width: dist }} className="frise-item">
                                {index == 0 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={mars} />)}
                                {index == 1 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={mars2} />)}
                                {index == 2 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz} />)}
                                {index == 3 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz2} />)}
                                {index == 4 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz3} />)}
                                {index == 5 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz4} />)}
                                {index == 6 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz5} />)}
                                {index == 7 && (<Image width={25 + (item.radius * 25)} height={25 + (item.radius * 25)} src={gaz6} />)}
                            </div>

                        )
                    })
                }
            </div>
            <LegendeSvg items={items} />
        </>
    )
}

export const Table = (props: any) => {
    const sSolaireTEmpty = {} as sSolaireT[]
    const [items, setItems] = useState<sSolaireT[] | null>(null)
    const [itemsPlanete, setItemsPlanete] = useState<dataT[] | null>(null)
    const [starSelected, setStarSelected] = useState<string>("HD 219134");

    const handleClick = (e: any, param: string) => {
        props.setSsolaire(param)
        setStarSelected(param)
    }

    useEffect(() => {
        let isMounted = true;
        chercheData().then((tt) => {
            var gg = Object.values(tt)

            //on filtre les systemes ayant des plannètes sans orbite défini
            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].semi_major_axis === null) {
                    gg.splice(i, 1);
                }
            }

            var counts = {};
            gg.forEach(function (x: any) {
                counts[x.star_name] = (counts[x.star_name] || 0) + 1;
            });

            Object.keys(counts).forEach((key, index) => {
                if (counts[key] < 7 || key == '') {
                    delete counts[key];
                }
            });


            let sSolaire: sSolaireT[] = []
            let nomSsolaire = Object.keys(counts)
            gg.forEach(function (x: any) {
                if (nomSsolaire.includes(x.star_name)) {
                    if (sSolaire.length < Object.keys(counts).length) {
                        let index = nomSsolaire.indexOf(x.star_name);
                        nomSsolaire.splice(index, 1)
                        sSolaire.push({
                            star_name: x.star_name,
                            count_planet: counts[x.star_name],
                            star_distance: x.star_distance,
                            discovered: x.discovered
                        })
                    }
                }

            });

            if (isMounted) setItemsPlanete(gg)
            if (isMounted) setItems(sSolaire)
        });
        return () => { isMounted = false };
    }, [])
    if (items && itemsPlanete) {
        return (
            <table className={"table-concept"} >

                <thead ><tr className={"table-row-head"}><th className={"col col1"} >Nom de l'étoile</th>
                    <th className={"col col2 noselect"}>Nb planète</th>
                    <th className={"col col3 noselect"}>Distance de l'étoile en parsec</th>
                    <th className={"col col4 noselect"}>Année de découverte</th></tr></thead>
                <tbody>

                    {Array.from(items).map((row, i) => {
                        let data = JSON.parse(JSON.stringify(itemsPlanete));
                        for (var i = Object.keys(data).length - 1; i >= 0; i--) {
                            if (data[i].star_name != row.star_name) {
                                data.splice(i, 1);
                            }
                        }
                        return (
                            <TableRow key={shortid.generate()} row={row} selected={row.star_name == starSelected} data={data} handleClick={handleClick} />

                        )
                    })}

                </tbody >
            </table >
        )
    }
    else {
        return null
    }
};

export const TableRow = (props: any) => {
    const row = props.row
    const selected = props.selected
    const handleClick = props.handleClick
    const data: dataT[] = props.data
    return (
        <>
            <tr className={"table-row " + (selected ? "rowSelected" : "")} onClick={(e) => { handleClick(e, row.star_name) }}>

                <td className={"col col1 noselect"}>
                    {row.star_name}
                </td>
                <td className={"col col2 noselect"}>
                    {row.count_planet}
                </td>
                <td className={"col col3 noselect"}>
                    {row.star_distance}
                </td>
                <td className={"col col4 noselect"}>
                    {row.discovered}
                </td>
            </tr>
            {/* {false &&
                Array.from(data).map((row_planet, i) => {
                    return (
                        <tr key={shortid.generate()} className={"table-row-collapse"} >

                            <td className={"col col1 noselect"}>
                                {row_planet.name}
                            </td>
                            <td className={"col col2 noselect"}>
                                {row_planet.count_planet}
                            </td>
                            <td className={"col col3 noselect"}>
                                {row_planet.star_distance}
                            </td>
                            <td className={"col col4 noselect"}>
                                {row_planet.discovered}
                            </td>
                        </tr>)
                })

            } */}
        </>
    );
};


export const CustomizedShape = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <g>
            <Dot cx={cx} cy={cy} r={1} fill={fill} />

        </g>
    );
};

const CustomizedShapeJupiter = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <>
            <g>
                <svg x={cx - 18} y={cy - 18} width="26" height="26" viewBox="0 0 36 36">
                    <circle fill="#FFCC4D" cx="18" cy="18" r="10.694" />
                    <path fill="#F4900C" d="M10.229 22.751c-.985.067-1.689-.308-2.203-.917.214.557.487 1.081.788 1.588.771.289 1.591.41 2.54-.272-.463-.227-.88-.415-1.125-.399zM23.086 8.608c.045.328-.187.5-.75.363-.955-.232-1.793.776-2.274 1.619-.947 1.657-4.854 3.524-4.857 2.087-.001-.679-3.452.843-3.893.161-.417-.644-1.663-.396-1.921-1.168-1.135 1.544-1.869 3.402-2.04 5.422.377.718.864 1.282 1.352 1.526.66.33 3.726 1.528 4.174.763.747-1.276 5.229-.373 5.122-1.044-.205-1.285 2.427-.23 3.373-1.886.482-.843 1.533-1.49 2.489-1.258 1.116.271 2.493-1.643 2.389-3.996-.871-1.057-1.951-1.931-3.164-2.589zm3.181 16.175c-.338.166-.671.293-.975.326-2.248.243-2.734 2.005-4.242 1.703-.777-.156-1.837 1.214-3.05 1.297-.611.042-1.489.141-2.386.308.768.175 1.565.277 2.386.277 3.331 0 6.305-1.523 8.267-3.911z" />
                    <path fill="#E85E00" d="M23.225 8.674c.953.535 1.811 1.213 2.554 2.003 2.491-.157 4.01.429 3.883 1.777-.066.705-.585 1.542-1.431 2.435-2.108 2.221-6.309 4.796-11.07 6.602-3.309 1.255-6.258 1.9-8.366 1.934-2.145.035-3.418-.563-3.302-1.803.076-.815.752-1.806 1.852-2.857-.019-.255-.039-.507-.039-.765 0-.848.109-1.669.296-2.461C3.3 18.522.5 21.807.5 24.369c0 3.487 5.162 4.558 12.275 2.957 1.65-.371 3.405-.886 5.225-1.549 3.9-1.419 7.489-3.3 10.399-5.317 4.301-2.983 7.101-6.268 7.101-8.83 0-3.486-5.162-4.558-12.275-2.956z" />
                    <path fill="#F4900C" d="M6.356 18.051c-.742.711-1.369 1.524-1.88 2.382-.49.852-.907 1.811-.844 2.671.035.856.682 1.366 1.558 1.602.874.227 1.845.287 2.834.229 1.962-.089 3.93-.415 5.841-.965 1.924-.505 3.791-1.225 5.615-2.036 3.648-1.628 7.068-3.789 10.132-6.382.368-.333.771-.649 1.124-.986.333-.337.647-.713.91-1.097.522-.768.826-1.667.335-2.352-.49-.696-1.495-1.075-2.453-1.271-.981-.187-2.01-.23-3.03-.111.992-.265 2.037-.395 3.088-.316 1.03.092 2.172.3 3.008 1.221.41.457.599 1.145.524 1.746-.057.611-.293 1.15-.563 1.635-.278.485-.59.925-.945 1.348-.352.404-.709.777-1.072 1.163-2.932 2.994-6.44 5.414-10.261 7.159-3.816 1.72-7.974 2.911-12.261 2.754-1.056-.04-2.157-.133-3.236-.548-.534-.209-1.082-.517-1.5-1.016-.429-.49-.635-1.171-.589-1.774.098-1.213.704-2.152 1.349-2.976.664-.819 1.447-1.525 2.316-2.08z" />
                </svg>
            </g>
        </>
    );
};

export const CustomizedShapeTerre = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <g>
            <svg x={cx - 18} y={cy - 18} width="26" height="26" viewBox="0 0 36 36" >
                <circle fill="#88C9F9" cx="18" cy="18" r="18" />
                <path fill="#5C913B" d="M25.716 1.756c-1.022.568-1.872 1.528-3.028 1.181-1.875-.562-4.375-1.812-6-.25s-2 3 0 2.938 3.375-2.438 4.375-1.438.749 1.813-1.625 2.125S14.5 7 13.125 7s-1.688.812-.75 1.688-.563.937-2.125 1.812.375 1.25 1.688 2 2.312-.188 2.875-1.438 2.981-2.75 3.99-2.562c1.01.188 1.01.688.822 1.562s.75.625.812-.375 1.188-1.75 2.062-1.812 1.625 1.188.625 1.812-2 1.125-.75 1.438 2.125 1.938.688 2.625-3.937 1.125-5.062.562-3.688-1.375-4.375-.938-1.062.89-1.875 1.195c-.812.305-4.125 1.805-4.188 3.743S7.438 22.438 8.75 22.5s4.5-.812 5.5-1.625 2.375-.625 2.812.312.125 1.5-.312 3 .286 2.25.987 3.562c.701 1.312 1.263 2.062 1.263 3s1 1.875 2.5.312 2.875-4.625 3.5-5.75 1.125-3.625 1.875-4.125 1.938-1.688 1.062-1.5-2.625-.062-3.062-1.312-2.312-3.625-1.438-3.875 1.875 1.39 2.25 2.164c.375.774.875 1.711 1.625 1.961s2.375-1.673 2.875-1.961c.5-.289.125-1.476-.875-1.351s-2.312 0-2.312-.624 1.25-1.438 2.25-1.25 1.75.5 2.375 1.25 1.875 2.125 2.375 3 .875 1 1.125-.562c.166-1.038.387-1.609.59-2.222-1.013-5.829-4.82-10.683-9.999-13.148z" />
            </svg>
        </g>)
}

const CustomizedShapePegasus = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <svg x={cx - 18} y={cy - 18} width="26" height="26" viewBox="0 0 36 36">
            <rect fill="#fff" x={0} y={0} width="36" height="36" />
            <g id="surface1">
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 2.402344 24.113281 L 14.710938 24.113281 C 15.683594 24.113281 16.472656 24.902344 16.472656 25.875 C 16.472656 26.847656 15.683594 27.632812 14.710938 27.632812 L 4.265625 27.632812 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 14.710938 28.664062 L 4.265625 28.664062 C 3.695312 28.664062 3.234375 28.203125 3.234375 27.632812 C 3.234375 27.066406 3.695312 26.601562 4.265625 26.601562 L 14.710938 26.601562 C 15.113281 26.601562 15.441406 26.277344 15.441406 25.875 C 15.441406 25.472656 15.113281 25.144531 14.710938 25.144531 L 2.402344 25.144531 C 1.832031 25.144531 1.371094 24.683594 1.371094 24.113281 C 1.371094 23.542969 1.832031 23.082031 2.402344 23.082031 L 14.710938 23.082031 C 16.253906 23.082031 17.503906 24.332031 17.503906 25.875 C 17.503906 27.414062 16.253906 28.664062 14.710938 28.664062 Z M 14.710938 28.664062 " />
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 1.332031 16.480469 L 8.84375 16.480469 C 9.816406 16.480469 10.605469 17.269531 10.605469 18.242188 C 10.605469 19.214844 9.816406 20.003906 8.84375 20.003906 L 1.382812 20.003906 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 8.84375 21.035156 L 1.382812 21.035156 C 0.8125 21.035156 0.351562 20.574219 0.351562 20.003906 C 0.351562 19.433594 0.8125 18.972656 1.382812 18.972656 L 8.84375 18.972656 C 9.246094 18.972656 9.574219 18.644531 9.574219 18.242188 C 9.574219 17.839844 9.246094 17.511719 8.84375 17.511719 L 1.332031 17.511719 C 0.761719 17.511719 0.300781 17.050781 0.300781 16.480469 C 0.300781 15.914062 0.761719 15.449219 1.332031 15.449219 L 8.84375 15.449219 C 10.382812 15.449219 11.636719 16.703125 11.636719 18.242188 C 11.636719 19.78125 10.382812 21.035156 8.84375 21.035156 Z M 8.84375 21.035156 " />
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 3.941406 8.851562 L 14.710938 8.851562 C 15.683594 8.851562 16.472656 9.640625 16.472656 10.613281 C 16.472656 11.585938 15.683594 12.375 14.710938 12.375 L 2.222656 12.375 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 14.710938 13.40625 L 2.222656 13.40625 C 1.652344 13.40625 1.191406 12.941406 1.191406 12.375 C 1.191406 11.804688 1.652344 11.34375 2.222656 11.34375 L 14.710938 11.34375 C 15.113281 11.34375 15.441406 11.015625 15.441406 10.613281 C 15.441406 10.210938 15.113281 9.882812 14.710938 9.882812 L 3.941406 9.882812 C 3.371094 9.882812 2.910156 9.421875 2.910156 8.851562 C 2.910156 8.28125 3.371094 7.820312 3.941406 7.820312 L 14.710938 7.820312 C 16.253906 7.820312 17.503906 9.074219 17.503906 10.613281 C 17.503906 12.152344 16.253906 13.40625 14.710938 13.40625 Z M 14.710938 13.40625 " />
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 31.722656 27.632812 L 27.15625 27.632812 C 26.183594 27.632812 25.394531 26.847656 25.394531 25.875 C 25.394531 24.902344 26.183594 24.113281 27.15625 24.113281 L 33.597656 24.113281 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 31.722656 28.664062 L 27.15625 28.664062 C 25.617188 28.664062 24.363281 27.414062 24.363281 25.875 C 24.363281 24.332031 25.617188 23.082031 27.15625 23.082031 L 33.597656 23.082031 C 34.167969 23.082031 34.628906 23.542969 34.628906 24.113281 C 34.628906 24.683594 34.167969 25.144531 33.597656 25.144531 L 27.15625 25.144531 C 26.753906 25.144531 26.425781 25.472656 26.425781 25.875 C 26.425781 26.277344 26.753906 26.601562 27.15625 26.601562 L 31.722656 26.601562 C 32.292969 26.601562 32.753906 27.066406 32.753906 27.632812 C 32.753906 28.203125 32.292969 28.664062 31.722656 28.664062 Z M 31.722656 28.664062 " />
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 33.777344 12.375 L 27.15625 12.375 C 26.183594 12.375 25.394531 11.585938 25.394531 10.613281 C 25.394531 9.640625 26.183594 8.851562 27.15625 8.851562 L 32.058594 8.851562 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 33.777344 13.40625 L 27.15625 13.40625 C 25.617188 13.40625 24.363281 12.152344 24.363281 10.613281 C 24.363281 9.074219 25.617188 7.820312 27.15625 7.820312 L 32.058594 7.820312 C 32.628906 7.820312 33.089844 8.28125 33.089844 8.851562 C 33.089844 9.421875 32.628906 9.882812 32.058594 9.882812 L 27.15625 9.882812 C 26.753906 9.882812 26.425781 10.210938 26.425781 10.613281 C 26.425781 11.015625 26.753906 11.34375 27.15625 11.34375 L 33.777344 11.34375 C 34.347656 11.34375 34.808594 11.804688 34.808594 12.375 C 34.808594 12.941406 34.347656 13.40625 33.777344 13.40625 Z M 33.777344 13.40625 " />
                <path fill="rgb(83.137255%,38.823529%,40%)" d="M 34.617188 20.003906 L 21.285156 20.003906 C 20.316406 20.003906 19.527344 19.214844 19.527344 18.242188 C 19.527344 17.269531 20.316406 16.480469 21.285156 16.480469 L 34.667969 16.480469 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 34.617188 21.035156 L 21.285156 21.035156 C 19.746094 21.035156 18.496094 19.78125 18.496094 18.242188 C 18.496094 16.703125 19.746094 15.449219 21.285156 15.449219 L 34.667969 15.449219 C 35.238281 15.449219 35.699219 15.914062 35.699219 16.480469 C 35.699219 17.050781 35.238281 17.511719 34.667969 17.511719 L 21.285156 17.511719 C 20.886719 17.511719 20.558594 17.839844 20.558594 18.242188 C 20.558594 18.644531 20.886719 18.972656 21.285156 18.972656 L 34.617188 18.972656 C 35.1875 18.972656 35.648438 19.433594 35.648438 20.003906 C 35.648438 20.574219 35.1875 21.035156 34.617188 21.035156 Z M 34.617188 21.035156 " />
                <path fill="rgb(29.803922%,10.588235%,15.294118%)" d="M 18 36 C 12.085938 36 6.546875 33.089844 3.183594 28.21875 C 2.378906 27.058594 1.714844 25.800781 1.203125 24.484375 C 0.664062 23.082031 0.300781 21.617188 0.125 20.125 C 0.0429688 19.421875 0 18.710938 0 18 C 0 17.460938 0.0234375 16.917969 0.0703125 16.390625 C 0.203125 14.898438 0.519531 13.433594 1.015625 12.03125 C 1.472656 10.722656 2.085938 9.46875 2.835938 8.296875 C 6.167969 3.101562 11.835938 0 18 0 C 24.164062 0 29.832031 3.101562 33.164062 8.296875 C 33.914062 9.46875 34.527344 10.722656 34.984375 12.03125 C 35.480469 13.433594 35.796875 14.898438 35.929688 16.390625 C 35.976562 16.917969 36 17.460938 36 18 C 36 18.710938 35.957031 19.425781 35.875 20.125 C 35.699219 21.617188 35.335938 23.082031 34.796875 24.484375 C 34.285156 25.800781 33.621094 27.058594 32.816406 28.222656 C 32.492188 28.6875 31.851562 28.804688 31.382812 28.484375 C 30.914062 28.160156 30.796875 27.515625 31.121094 27.046875 C 31.832031 26.019531 32.421875 24.90625 32.871094 23.742188 C 33.351562 22.5 33.671875 21.203125 33.828125 19.882812 C 33.902344 19.261719 33.9375 18.628906 33.9375 18 C 33.9375 17.519531 33.917969 17.039062 33.875 16.574219 C 33.757812 15.253906 33.476562 13.957031 33.039062 12.714844 C 32.632812 11.558594 32.089844 10.445312 31.425781 9.40625 C 28.476562 4.808594 23.457031 2.0625 18 2.0625 C 12.542969 2.0625 7.523438 4.808594 4.574219 9.410156 C 3.910156 10.445312 3.367188 11.558594 2.960938 12.714844 C 2.523438 13.957031 2.242188 15.253906 2.125 16.574219 C 2.082031 17.039062 2.0625 17.519531 2.0625 18 C 2.0625 18.628906 2.097656 19.261719 2.171875 19.882812 C 2.328125 21.203125 2.648438 22.5 3.128906 23.742188 C 3.578125 24.90625 4.167969 26.019531 4.878906 27.046875 C 7.859375 31.363281 12.765625 33.9375 18 33.9375 C 20.007812 33.9375 21.960938 33.570312 23.8125 32.84375 C 24.339844 32.636719 24.941406 32.898438 25.148438 33.429688 C 25.355469 33.960938 25.09375 34.558594 24.5625 34.765625 C 22.472656 35.585938 20.265625 36 18 36 Z M 18 36 " />

            </g>

        </svg>

    );
};





const CustomLabel = (props: any) => {
    if (props.planet != 'Pegasus b 41') {
        return (
            <>
                <text x={props.viewBox.x + props.viewBox.width * 2 - 10} y={props.viewBox.y} >{props.planet}</text>

            </>

        );
    } else {
        return (
            <>
                <text x={props.viewBox.x - props.viewBox.width} y={props.viewBox.y + props.viewBox.height * 2.5 - 10} >{props.planet}</text>
            </>)
    }
};





export function Graph_masse_distance() {
    const dataTEmpty = {} as dataT[]
    const [items, setItems] = useState<dataT[]>(dataTEmpty);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        let isMounted = true;
        chercheData().then((tt) => {

            var gg = Object.values(tt)

            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].mass === null || gg[i].orbital_period === null) {
                    gg.splice(i, 1);
                }
            }
            if (isMounted) setItems(gg)
        });
        return () => { isMounted = false };
    }, [])


    return (
        /* <span className="mx-auto w-50">Masse en Masse jupitérienne et période de révolution en jour</span> */
        <>
            {process.env.NODE_ENV === "test" ?
                <ScatterChart height={500} width={400} id="masse_distance"
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                    <XAxis allowDataOverflow={true} xAxisId="0" dataKey="mass" name="masse" type="number" ticks={[0.01, 0.03, 0.1, 1, 10, 150]} scale="log" domain={[0.001, 100]} unit=" Mjup" />
                    <YAxis allowDataOverflow={true} yAxisId="0" dataKey="orbital_period" ticks={[1, 10, 100, 365, 4380]} name="periode orbitale" type="number" scale="log" domain={[0.01, 1000000]} unit=" jour" />
                    <Scatter name="A school" data={items} shape={<CustomizedShape />} />
                    <ReferenceDot x={0.45} y={4} shape={<CustomizedShapePegasus />} label={<CustomLabel planet="Pegasus b 41" />} />
                    <ReferenceDot x={0.003} y={365} shape={<CustomizedShapeTerre />} label={<CustomLabel planet="Terre" />} />
                    <ReferenceDot x={1} y={4380} shape={<CustomizedShapeJupiter />} label={<CustomLabel planet="Jupiter" />} />
                    <ReferenceLine xAxisId="0" yAxisId="0" label="Segment" stroke="green" strokeDasharray="5 5" segment={[{ x: 1, y: 0 }, { x: 1, y: 4380 }]} />

                </ScatterChart>
                :
                <ResponsiveContainer aspect={4.5}>
                    <ScatterChart id="masse_distance"
                        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                        <XAxis allowDataOverflow={true} xAxisId="0" dataKey="mass" name="masse" type="number" ticks={[0.01, 0.03, 0.1, 1, 10, 100]} scale="log" domain={[0.001, 100]} unit=" Mjup" />
                        <YAxis allowDataOverflow={true} yAxisId="0" dataKey="orbital_period" ticks={[1, 10, 100, 365, 4380]} name="periode orbitale" type="number" scale="log" domain={[0.01, 1000000]} unit=" jour" />
                        <Scatter isAnimationActive={false} name="A school" data={items} shape={<CustomizedShape />} />
                        <ReferenceDot x={0.45} y={4} shape={<CustomizedShapePegasus />} label={<CustomLabel planet="Pegasus b 41" />} />
                        <ReferenceDot x={0.003} y={365} shape={<CustomizedShapeTerre />} label={<CustomLabel planet="Terre" />} />
                        <ReferenceDot x={1} y={4380} shape={<CustomizedShapeJupiter />} label={<CustomLabel planet="Jupiter" />} />
                        <ReferenceLine xAxisId="0" yAxisId="0" label="Segment" stroke="green" strokeDasharray="5 5" segment={[{ x: 1, y: 0 }, { x: 1, y: 4380 }]} />

                    </ScatterChart>
                </ResponsiveContainer >}
        </>)





}


type MyState = {
    items: typePlaneteT[]
    myRef: React.RefObject<HTMLInputElement>
    onRerender: boolean
};

export class Graph_count_type_planete extends React.Component<{}, MyState> {
    isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            myRef: React.createRef(),
            onRerender: false
        };

    };


    // debouncedHandleResize = debounce(() => {
    //     this.setState({ onRerender: true })
    // }, 1000)

    debouncedFunction = debounce(() => this.setState({ onRerender: true }), 1000, { isImmediate: true });

    componentWillUnmount() {
        this.isMounted = false;
        // window.removeEventListener('resize', this.debouncedFunction)
    }

    componentDidUpdate() {
        // if (this.state.onRerender) {
        // setTimeout(() => this.setState({ onRerender: false }), 1000)
        // console.log("update");
        // if (this.state.myRef.current) {
        // var parser = new DOMParser();
        // var content: Document = parser.parseFromString(this.state.myRef.current.innerHTML, "image/svg+xml");
        // var content2: Document = parser.parseFromString(document.body.innerHTML, "text/xml");
        // if (document) {
        //     var graph: Element | null = document.querySelector("#stat_type_planete")
        //     graph = graph ? graph.clientWidth : null
        //     var titre: Element | null = document.querySelector("#titre_count_type_planete")
        //     titre = titre ? titre.clientWidth : null
        //     console.log(graph);
        //     console.log(titre);
        //     if (graph && titre) {
        //         if (graph <= titre && this.state.onRerender) {
        //             this.setState({ onRerender: false })
        //         } else if (graph > titre + 10 && !this.state.onRerender) {
        //             this.setState({ onRerender: true })
        //         }
        //         var today = new Date();
        //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        //         console.log("update", time);
        //     }
        // }
        // }
        // }
    }

    breakpointCHecker() {
        var lg = window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg');
        console.log(lg);
        if (window.matchMedia("(min-width: " + lg + ")").matches) {
            console.log("rr", lg);
        } else {
            console.log("ee", lg);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            // this.setState({ onRerender: true });
            // this.debouncedFunction
            // this.setState({ onRerender: true })
            // this.breakpointCHecker()
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            // console.log("event_begin", time);
        })
        this.isMounted = true;
        chercheData().then((tt) => {
            var gg = Object.values(tt)

            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].radius === null) {
                    gg.splice(i, 1);
                } else {
                    if (gg[i].radius < (1.25 / 11)) {
                        gg[i].sizeType = "terrestre"
                    }
                    else if ((gg[i].radius > (1.25 / 11)) && (gg[i].radius < (2 / 11))) {
                        gg[i].sizeType = "super-terre"
                    }
                    else if ((gg[i].radius > (2 / 11)) && (gg[i].radius < (6 / 11))) {
                        gg[i].sizeType = "neptune"
                    }
                    else if ((gg[i].radius > (6 / 11)) && (gg[i].radius < (15 / 11))) {
                        gg[i].sizeType = "jupiter"
                    }
                    else if ((gg[i].radius > (15 / 11)) && (gg[i].radius < (22 / 11))) {
                        gg[i].sizeType = "super-jupiter"
                    }
                    else {
                        gg[i].sizeType = "autre"
                    }
                }
            }
            var counts = countBy(gg, 'sizeType');

            var arraytypeplanet: typePlaneteT[] = []
            for (const [key, value] of Object.entries(counts)) {
                if (key !== 'autre') {
                    arraytypeplanet.push({ 'type': key, 'value': value })
                }
            }
            if (this.isMounted) this.setState({ items: arraytypeplanet })
        });

    }

    render() {
        // if (!this.state.onRerender) {
        var style_image: CSS.Properties = (!this.state.onRerender) ? { visibility: "visible", display: 'block' } : { visibility: "hidden" }
        var style_image2: CSS.Properties = (this.state.onRerender) ? { visibility: "visible", display: 'block' } : { display: "none" }

        if (!this.state.onRerender) {
            return (
                <>

                    <div ref={this.state.myRef}>
                        {/* <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <div id='rtt' >
                                <Image layout="fixed" width="50px" height="50px" object-position="50% 50%" sizes="(max-height: 500px) 1000px" src={wait} />
                            </div >
                        </div > */}
                        <div style={style_image} >
                            {
                                process.env.NODE_ENV === "test" ?
                                    <>
                                        <BarChart  width={100} height={200} id="stat_type_planete" data={this.state.items} margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="type" angle={80} textAnchor="begin" interval={0} dy={2} />
                                            <YAxis />
                                            <Bar isAnimationActive={false} dataKey="value" fill="#8884d8" />
                                        </BarChart></>
                                    :
                                    <>
                                        {/* <Image width="50px" height="50px" src={wait} /> */}
                                        <ResponsiveContainer aspect={0.5}>
                                            <BarChart id="stat_type_planete" data={this.state.items} margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="type" angle={80} textAnchor="begin" interval={0} dy={2} />
                                                <YAxis />
                                                <Bar isAnimationActive={false} dataKey="value" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer></>
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div ref={this.state.myRef} >
                        <Ratio aspectRatio={0.5}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                            }}>



                                <Image layout="fixed" width="50px" height="50px" object-position="50% 50%" sizes="(max-height: 500px) 1000px" src={wait} />
                            </div >
                            {/* </div > */}
                        </Ratio>
                    </div ></>
            )
        }
    }


}

export function Count_annee() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        let isMounted = true;
        chercheData().then((tt) => {

            const gg = Object.values(tt)

            const sumOfAges = gg.reduce((decount, currentValue) => {
                if (currentValue.discovered !== null) {
                    if (!Object.keys(decount).includes(currentValue.discovered.toString())) {
                        decount[currentValue.discovered] = 1;
                    } else {
                        decount[currentValue.discovered] = decount[currentValue.discovered] + 1;
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in sumOfAges) {
                hh.push({ 'year': property, 'value': sumOfAges[property] })
            }
            if (isMounted) setItems(hh)
        });
        return () => { isMounted = false };
    }, [])



    return (
        <>
            {
                process.env.NODE_ENV === "test" ?
                    // <ResponsiveContainer aspect={3.5}>
                    <BarChart width={730} height={250} data={items}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Bar isAnimationActive={false} dataKey="value" fill="#8884d8" />
                    </BarChart>
                    // </ResponsiveContainer>
                    :
                    <ResponsiveContainer aspect={4.5}>
                        <BarChart width={730} height={250} data={items}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Bar isAnimationActive={false} dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
            }
        </>
    )


}


