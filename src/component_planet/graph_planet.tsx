// import { boolean } from 'mathjs';
import React, { useEffect, useState } from 'react';
import { countBy } from 'underscore'
import {
    ScatterChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Scatter,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Dot,
    ReferenceDot,
    ReferenceLine,
    RadialBarChart,
    RadialBar

} from 'recharts'
const fetch = require('node-fetch')

import { dataT, radialT } from '../types/interface'

const k='tt'

export const chercheData = async (): Promise<dataT[] | boolean> => {

    const response = await fetch("http://127.0.0.1:8080/api/planets");
    // const response = await fetch("http://68.183.74.150:8080/api/planets");
    
    const responseData = await response.json();
    // console.log(responseData);
    if (response.ok) {
        var data = [];
        var dictOfResponseData: any = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        return dictOfResponseData

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const CustomizedShape = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <g>
            <Dot cx={cx} cy={cy} r={1} fill={fill} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 36 36"> */}
            {/* <title>🪐: ringed planet (U+1FA90) - emojiall.com</title> */}
            {/* <style>svg{stroke:#edf2f6;animation:dashoffset 10s both infinite,fill-opacity 10s both infinite,stroke-opacity 10s both infinite;stroke-dasharray:500%;stroke-dashoffset:500%}@keyframes stroke-opacity{2 %, 25 % { stroke- opacity:.75;stroke-width:2%}100%,75%{stroke - opacity:0;stroke-width:0}}@keyframes fill-opacity{10 %, 25 % { fill- opacity:0}0%,100%,50%{fill - opacity:1}}@keyframes dashoffset{0 %, 2 % { stroke- dashoffset:500%}100%{stroke - dashoffset:0%}}</style> */}
            {/* <a xlink:href="https://www.emojiall.com/en/emoji/%F0%9F%AA%90"> */}
            {/* <circle fill="#FFCC4D" cx="18" cy="18" r="10.694" /> */}
            {/* <path fill="#F4900C" d="M10.229 22.751c-.985.067-1.689-.308-2.203-.917.214.557.487 1.081.788 1.588.771.289 1.591.41 2.54-.272-.463-.227-.88-.415-1.125-.399zM23.086 8.608c.045.328-.187.5-.75.363-.955-.232-1.793.776-2.274 1.619-.947 1.657-4.854 3.524-4.857 2.087-.001-.679-3.452.843-3.893.161-.417-.644-1.663-.396-1.921-1.168-1.135 1.544-1.869 3.402-2.04 5.422.377.718.864 1.282 1.352 1.526.66.33 3.726 1.528 4.174.763.747-1.276 5.229-.373 5.122-1.044-.205-1.285 2.427-.23 3.373-1.886.482-.843 1.533-1.49 2.489-1.258 1.116.271 2.493-1.643 2.389-3.996-.871-1.057-1.951-1.931-3.164-2.589zm3.181 16.175c-.338.166-.671.293-.975.326-2.248.243-2.734 2.005-4.242 1.703-.777-.156-1.837 1.214-3.05 1.297-.611.042-1.489.141-2.386.308.768.175 1.565.277 2.386.277 3.331 0 6.305-1.523 8.267-3.911z" /> */}
            {/* <path fill="#E85E00" d="M23.225 8.674c.953.535 1.811 1.213 2.554 2.003 2.491-.157 4.01.429 3.883 1.777-.066.705-.585 1.542-1.431 2.435-2.108 2.221-6.309 4.796-11.07 6.602-3.309 1.255-6.258 1.9-8.366 1.934-2.145.035-3.418-.563-3.302-1.803.076-.815.752-1.806 1.852-2.857-.019-.255-.039-.507-.039-.765 0-.848.109-1.669.296-2.461C3.3 18.522.5 21.807.5 24.369c0 3.487 5.162 4.558 12.275 2.957 1.65-.371 3.405-.886 5.225-1.549 3.9-1.419 7.489-3.3 10.399-5.317 4.301-2.983 7.101-6.268 7.101-8.83 0-3.486-5.162-4.558-12.275-2.956z" /> */}
            {/* <path fill="#F4900C" d="M6.356 18.051c-.742.711-1.369 1.524-1.88 2.382-.49.852-.907 1.811-.844 2.671.035.856.682 1.366 1.558 1.602.874.227 1.845.287 2.834.229 1.962-.089 3.93-.415 5.841-.965 1.924-.505 3.791-1.225 5.615-2.036 3.648-1.628 7.068-3.789 10.132-6.382.368-.333.771-.649 1.124-.986.333-.337.647-.713.91-1.097.522-.768.826-1.667.335-2.352-.49-.696-1.495-1.075-2.453-1.271-.981-.187-2.01-.23-3.03-.111.992-.265 2.037-.395 3.088-.316 1.03.092 2.172.3 3.008 1.221.41.457.599 1.145.524 1.746-.057.611-.293 1.15-.563 1.635-.278.485-.59.925-.945 1.348-.352.404-.709.777-1.072 1.163-2.932 2.994-6.44 5.414-10.261 7.159-3.816 1.72-7.974 2.911-12.261 2.754-1.056-.04-2.157-.133-3.236-.548-.534-.209-1.082-.517-1.5-1.016-.429-.49-.635-1.171-.589-1.774.098-1.213.704-2.152 1.349-2.976.664-.819 1.447-1.525 2.316-2.08z" /> */}
            {/* </a> */}
            {/* </svg> */}
            {/* <g transform={`translate(${cx},${cy})`}>
                <text x={10} y={0} dy={4} textAnchor="left">{riderName}</text>
            </g> */}
        </g>
    );
};

const CustomizedShape2 = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <g>
            <svg x={cx - 18} y={cy - 18} width="36" height="36" viewBox="0 0 36 36">
                <circle fill="#FFCC4D" cx="18" cy="18" r="10.694" />
                <path fill="#F4900C" d="M10.229 22.751c-.985.067-1.689-.308-2.203-.917.214.557.487 1.081.788 1.588.771.289 1.591.41 2.54-.272-.463-.227-.88-.415-1.125-.399zM23.086 8.608c.045.328-.187.5-.75.363-.955-.232-1.793.776-2.274 1.619-.947 1.657-4.854 3.524-4.857 2.087-.001-.679-3.452.843-3.893.161-.417-.644-1.663-.396-1.921-1.168-1.135 1.544-1.869 3.402-2.04 5.422.377.718.864 1.282 1.352 1.526.66.33 3.726 1.528 4.174.763.747-1.276 5.229-.373 5.122-1.044-.205-1.285 2.427-.23 3.373-1.886.482-.843 1.533-1.49 2.489-1.258 1.116.271 2.493-1.643 2.389-3.996-.871-1.057-1.951-1.931-3.164-2.589zm3.181 16.175c-.338.166-.671.293-.975.326-2.248.243-2.734 2.005-4.242 1.703-.777-.156-1.837 1.214-3.05 1.297-.611.042-1.489.141-2.386.308.768.175 1.565.277 2.386.277 3.331 0 6.305-1.523 8.267-3.911z" />
                <path fill="#E85E00" d="M23.225 8.674c.953.535 1.811 1.213 2.554 2.003 2.491-.157 4.01.429 3.883 1.777-.066.705-.585 1.542-1.431 2.435-2.108 2.221-6.309 4.796-11.07 6.602-3.309 1.255-6.258 1.9-8.366 1.934-2.145.035-3.418-.563-3.302-1.803.076-.815.752-1.806 1.852-2.857-.019-.255-.039-.507-.039-.765 0-.848.109-1.669.296-2.461C3.3 18.522.5 21.807.5 24.369c0 3.487 5.162 4.558 12.275 2.957 1.65-.371 3.405-.886 5.225-1.549 3.9-1.419 7.489-3.3 10.399-5.317 4.301-2.983 7.101-6.268 7.101-8.83 0-3.486-5.162-4.558-12.275-2.956z" />
                <path fill="#F4900C" d="M6.356 18.051c-.742.711-1.369 1.524-1.88 2.382-.49.852-.907 1.811-.844 2.671.035.856.682 1.366 1.558 1.602.874.227 1.845.287 2.834.229 1.962-.089 3.93-.415 5.841-.965 1.924-.505 3.791-1.225 5.615-2.036 3.648-1.628 7.068-3.789 10.132-6.382.368-.333.771-.649 1.124-.986.333-.337.647-.713.91-1.097.522-.768.826-1.667.335-2.352-.49-.696-1.495-1.075-2.453-1.271-.981-.187-2.01-.23-3.03-.111.992-.265 2.037-.395 3.088-.316 1.03.092 2.172.3 3.008 1.221.41.457.599 1.145.524 1.746-.057.611-.293 1.15-.563 1.635-.278.485-.59.925-.945 1.348-.352.404-.709.777-1.072 1.163-2.932 2.994-6.44 5.414-10.261 7.159-3.816 1.72-7.974 2.911-12.261 2.754-1.056-.04-2.157-.133-3.236-.548-.534-.209-1.082-.517-1.5-1.016-.429-.49-.635-1.171-.589-1.774.098-1.213.704-2.152 1.349-2.976.664-.819 1.447-1.525 2.316-2.08z" />
            </svg>
        </g>
    );
};

const CustomizedShape3 = (props: any) => {
    const { cx, cy, fill, planeteName } = props;
    return (
        <g>
            {/* <g transform="scale(0.05)"> */}
            <svg version="1.1" x={cx - 15} y={cy - 18}
                viewBox="0 0 10000 10000" >
                <g>
                    <g transform="translate(0,0)">
                        <circle fill="#D7E6D8" cx="251" cy="251" r="241" />
                        <path fill="#4FC497" d="M329,348l-12.409,20.502c-3.657,6.042-5.59,12.97-5.59,20.032v0.615
			c0,5.994-4.857,10.853-10.851,10.856l0,0c-10.407,0.005-18.846-8.43-18.846-18.836l0,0c0-9.839-3.908-19.275-10.865-26.232
			l-4.591-4.591c-8.773-8.773-13.701-20.672-13.701-33.078v-29.475c0-9.307-7.545-16.851-16.851-16.851H231.8
			c-13.885,0-25.142-11.256-25.142-25.142v-15.343c0-14.572,11.813-26.384,26.384-26.384h84.028l27.028,27.028
			c7.836,7.836,12.238,18.463,12.238,29.544v11.464c0,6.226,5.047,11.273,11.273,11.273l0,0c4.891,0,7.348,5.907,3.9,9.375
			l-11.148,11.214c-8.226,8.274-15.422,17.512-21.433,27.512L329,348z"/>
                        <path fill="#4FC497" d="M283.829,57H320.5c6.904,0,12.5,5.596,12.5,12.5l0,0c0,6.904-5.596,12.5-12.5,12.5h-50.671h-47.043
			c-5.917,0-10.713,4.797-10.713,10.713v2.028c0,4.71-1.871,9.227-5.201,12.558l-5.85,5.85
			c-7.947,7.947-12.412,18.727-12.412,29.966v13.574c0,4.738,3.841,8.579,8.579,8.579h10.081c8.135,0,14.73-6.595,14.73-14.73l0,0
			c0-5.014,1.992-9.823,5.537-13.368l5.17-5.17c3.545-3.545,8.354-5.537,13.368-5.537h19.931c11.693,0,22.907,4.645,31.176,12.913
			l9.952,9.952c11.65,11.65,18.195,27.451,18.195,43.927v18.036h16.397c15.792,0,30.937,6.273,42.104,17.44l7.969,7.969
			c8.395,8.395,22.007,8.395,30.402,0l0,0c8.55-8.55,8.55-22.413,0-30.963l-3.3-3.3c-7.056-7.056-2.059-19.121,7.92-19.121h26.203
			H481c-0.166-0.166-0.286-2.222-0.37-5.63C459.223,110.579,409.227,56.236,344.948,29H283.83c-7.732,0-14,6.268-14,14l0,0
			C269.829,50.732,276.097,57,283.829,57z"/>
                        <path fill="#4FC497" d="M152.512,306.038v-17.886c0-12.81-5.089-25.094-14.146-34.152l-0.193-0.193
			c-5.842-5.842-13.766-9.124-22.028-9.124l0,0c-7.917,0-15.51-3.145-21.108-8.743l-8.781-8.781
			c-9.004-9.004-21.215-14.062-33.948-14.062H15.341l-2.787,2.787C10.881,227.349,10,239.071,10,251
			c0,72.63,32.132,137.752,82.951,181.937V422.75c0-20.407,8.107-39.978,22.537-54.409l19.149-19.15
			C146.082,337.747,152.512,322.224,152.512,306.038z"/>
                    </g>
                    <g>
                        <path fill="#333333" d="M428.484,73.516C381.076,26.108,318.044,0,251,0S120.924,26.108,73.516,73.516S0,183.956,0,251
			s26.108,130.076,73.516,177.484S183.956,502,251,502s130.076-26.108,177.484-73.516S502,318.044,502,251
			S475.892,120.924,428.484,73.516z M468.546,173.317h-41.725c-8.605,0-16.294,5.137-19.587,13.087
			c-3.293,7.951-1.489,17.02,4.595,23.104l3.3,3.3c4.638,4.637,4.638,12.184,0,16.821c-2.171,2.172-5.059,3.368-8.13,3.368
			s-5.958-1.196-8.13-3.368l-7.969-7.969c-13.135-13.135-30.599-20.369-49.175-20.369h-6.397v-8.036
			c0-19.265-7.502-37.376-21.124-50.999l-9.952-9.952c-10.216-10.216-23.799-15.843-38.247-15.843h-19.931
			c-7.721,0-14.98,3.007-20.439,8.466l-5.17,5.169c-5.459,5.459-8.466,12.718-8.466,20.439c0,2.608-2.122,4.73-4.73,4.73h-8.66
			v-12.154c0-8.648,3.368-16.78,9.483-22.895l5.849-5.849c5.244-5.243,8.131-12.214,8.131-19.629V92.71
			c0-0.394,0.32-0.713,0.713-0.713H320.5c12.407,0,22.5-10.093,22.5-22.5S332.907,47,320.5,47h-36.671c-2.206,0-4-1.794-4-4
			s1.794-4,4-4h58.868C401.051,64.338,446.971,113.079,468.546,173.317z M358.722,291.437l-5.452,5.484
			c-8.784,8.835-16.493,18.73-22.913,29.41l-9.918,16.5l-12.403,20.492c-4.603,7.603-7.036,16.32-7.036,25.21v0.615
			c0,0.472-0.384,0.856-0.856,0.856c-0.001,0-0.003,0-0.004,0c-2.359,0-4.578-0.918-6.247-2.586c-1.67-1.669-2.589-3.888-2.589-6.25
			c0-12.58-4.899-24.407-13.794-33.303l-4.591-4.591c-6.947-6.947-10.773-16.183-10.773-26.007v-29.475
			c0-14.806-12.045-26.851-26.852-26.851H231.8c-8.349,0-15.142-6.792-15.142-15.142v-15.343c0-9.034,7.35-16.384,16.384-16.384
			h79.886l24.099,24.1c6.003,6.003,9.309,13.984,9.309,22.473v11.464C346.336,280.669,351.418,288.064,358.722,291.437z M20,251
			c0-9.444,0.583-18.752,1.69-27.902h30.619c10.153,0,19.698,3.954,26.876,11.133l8.781,8.78
			c7.527,7.527,17.534,11.672,28.179,11.672c5.65,0,10.962,2.2,14.957,6.195l0.193,0.193c7.233,7.233,11.217,16.851,11.217,27.081
			v17.886c0,13.63-5.308,26.444-14.945,36.082l-19.15,19.15c-13.442,13.443-21.939,30.512-24.58,49.002
			C44.303,368.799,20,312.684,20,251z M251,482c-56.288,0-107.93-20.247-148.049-53.827v-5.423c0-17.881,6.963-34.693,19.607-47.337
			l19.15-19.15c13.415-13.416,20.803-31.252,20.803-50.224v-17.886c0-15.573-6.064-30.213-17.075-41.224l-0.193-0.192
			c-7.772-7.772-18.106-12.053-29.099-12.053c-5.302,0-10.287-2.065-14.036-5.814l-8.781-8.781
			c-10.957-10.956-25.524-16.99-41.019-16.99h-27.3C47.126,98.635,140.047,20,251,20c7.743,0,15.396,0.39,22.946,1.138
			C265.63,24.912,259.829,33.289,259.829,43c0,13.234,10.766,24,24,24H320.5c1.378,0,2.5,1.122,2.5,2.5s-1.122,2.5-2.5,2.5h-97.713
			c-11.421,0-20.713,9.292-20.713,20.713v2.028c0,2.072-0.807,4.021-2.273,5.486l-5.85,5.85
			c-9.893,9.893-15.341,23.047-15.341,37.037v13.574c0,10.245,8.334,18.58,18.579,18.58h10.081c13.636,0,24.73-11.094,24.73-24.73
			c0-2.379,0.926-4.615,2.608-6.297l5.169-5.169c0.203-0.203,0.414-0.393,0.632-0.574c0.167,0.195,0.334,0.389,0.518,0.574
			l19.932,19.932c-3.833,3.911-3.813,10.186,0.068,14.068c1.953,1.953,4.512,2.929,7.071,2.929s5.119-0.976,7.071-2.929l7-7
			c3.905-3.905,3.905-10.237,0-14.143l-15.45-15.45c8.875,0.156,17.197,3.677,23.489,9.97l9.953,9.952
			c9.844,9.844,15.266,22.934,15.266,36.856v0.817H233.04c-20.062,0-36.384,16.322-36.384,36.384V245.8
			c0,19.377,15.765,35.142,35.142,35.142h3.493c3.778,0,6.852,3.073,6.852,6.851v29.475c0,15.167,5.906,29.425,16.63,40.15
			l4.591,4.591c5.118,5.118,7.937,11.923,7.937,19.161c0,7.705,3.001,14.948,8.451,20.396c5.446,5.443,12.685,8.44,20.384,8.44
			c0.004,0,0.01,0,0.015,0C311.648,410,321,400.644,321,389.149v-0.614c0-5.238,1.434-10.374,4.146-14.854l12.409-20.502
			c0.005-0.009,0.01-0.018,0.016-0.026l9.928-16.517c5.591-9.301,12.305-17.918,19.955-25.613l11.147-11.213
			c4.428-4.455,5.731-11.08,3.319-16.879s-8.029-9.546-14.31-9.546c-0.702,0-1.273-0.571-1.273-1.273v-11.464
			c0-13.832-5.386-26.835-15.167-36.616l-2.215-2.215c10.49,1.524,20.173,6.357,27.804,13.988l7.969,7.969
			c6.141,6.141,14.207,9.211,22.272,9.211s16.132-3.07,22.272-9.211c6.024-6.024,9.341-14.033,9.341-22.553
			c0-8.519-3.317-16.528-9.341-22.553l-3.3-3.3c-0.198-0.198-0.567-0.567-0.26-1.308s0.829-0.741,1.109-0.741h47.888
			C479.468,211.761,482,231.09,482,251C482,378.374,378.374,482,251,482z"/>
                        <path fill="#333333" d="M184,85c5.523,0,10-4.477,10-10V54.494c0-5.523-4.477-10-10-10s-10,4.477-10,10V75
			C174,80.523,178.477,85,184,85z"/>
                        <path fill="#333333" d="M450.39,314.63c-5.176-1.93-10.935,0.702-12.863,5.877C408.652,397.961,333.692,450,251,450
			c-5.523,0-10,4.477-10,10s4.477,10,10,10c45.543,0,89.207-13.849,126.272-40.048c36.24-25.617,63.556-61.046,78.995-102.458
			C458.196,322.319,455.565,316.56,450.39,314.63z"/>
                        <path fill="#333333" d="M202.433,444.034c-9.714-2.436-19.321-5.642-28.554-9.526c-5.092-2.144-10.954,0.249-13.096,5.339
			s0.249,10.954,5.339,13.096c10.167,4.278,20.747,7.808,31.445,10.491c0.817,0.205,1.635,0.303,2.44,0.303
			c4.478,0,8.554-3.03,9.692-7.57C211.043,450.809,207.79,445.377,202.433,444.034z"/>
                    </g>
                </g>

            </svg>
            {/* </g> */}
        </g>
    );
};



export function Graph_masse_distance() {

    const [items, setItems] = useState<dataT[]>();//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            var gg = Object.values(tt)

            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].mass === null || gg[i].orbital_period === null) {
                    gg.splice(i, 1);
                }
            }
            setItems(gg)
        });
    }, [])


    return (
        /* <span className="mx-auto w-50">Masse en Masse jupitérienne et période de révolution en jour</span> */
        <ResponsiveContainer aspect={2.5}>
            <ScatterChart id="masse_distance"
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis allowDataOverflow={true} xAxisId="0" dataKey="mass" name="masse" type="number" ticks={[0.01, 0.03, 0.1, 1, 10, 150]} scale="log" domain={[0.001, 100]} unit=" Mjup" />
                <YAxis allowDataOverflow={true} yAxisId="0" dataKey="orbital_period" ticks={[1, 10, 100, 365, 4380]} name="periode orbitale" type="number" scale="log" domain={[0.01, 1000000]} unit=" jour" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <ReferenceDot x={0.003} y={365} shape={<CustomizedShape3 />} />
                <ReferenceDot x={1} y={4380} shape={<CustomizedShape2 />} />
                <ReferenceLine xAxisId="0" yAxisId="0" label="Segment" stroke="green" strokeDasharray="5 5" segment={[{ x: 1, y: 0 }, { x: 1, y: 4380 }]} />
                {/* <ReferenceLine label="Segment" stroke="green" strokeDasharray="3 3" segment={[{ x: 1, y: 0 }, { x: 1, y:4380 }]} /> */}
                <Scatter name="A school" data={items} shape={<CustomizedShape />} />
            </ScatterChart>
        </ResponsiveContainer >
    )


}

export function Graph_radial() {

    const [items, setItems] = useState<radialT[]>();//l'état initial doit être un array ne contenant pas d'objet
    let hh = "RR"

    useEffect(() => {
        chercheData().then((tt) => {

            var gg = Object.values(tt)

            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].radius === null) {
                    gg.splice(i, 1);
                } else {
                    if (gg[i].radius < (1.25 / 11)) {
                        gg[i].sizetype = "terrestre"
                    }
                    else if ((gg[i].radius > (1.25 / 11)) && (gg[i].radius < (2 / 11))) {
                        gg[i].sizetype = "super-terre"
                    }
                    else if ((gg[i].radius > (2 / 11)) && (gg[i].radius < (6 / 11))) {
                        gg[i].sizetype = "neptune"
                    }
                    else if ((gg[i].radius > (6 / 11)) && (gg[i].radius < (15 / 11))) {
                        gg[i].sizetype = "jupiter"
                    }
                    else if ((gg[i].radius > (15 / 11)) && (gg[i].radius < (22 / 11))) {
                        gg[i].sizetype = "super-jupiter"
                    }
                    else {
                        gg[i].sizetype = "autre"
                    }
                }
            }
            var counts = countBy(gg, 'sizetype');

            var arraytypeplanet: radialT[] = []
            for (const [key, value] of Object.entries(counts)) {
                if (key !== 'autre') {
                    arraytypeplanet.push({ 'name': key, 'uv': value, 'fill': '#8884d8' })
                }
            }
            setItems(arraytypeplanet)
        });
    }, [])

    // const style = {
    //     top: 100,
    //     left: "50%",
    //     lineHeight: '24px',
    // };


    return (
        <ResponsiveContainer aspect={0.5}>
            <RadialBarChart  startAngle={270} endAngle={150} cx={"70%"} cy={"50%"}  barSize={"90%"} innerRadius={"10%"} outerRadius={"100%"}  data={items}>
                <RadialBar label={{ position: 'insideStart', fill: '#fff' }} dataKey="uv" />
                {/* <Legend iconSize={10}  layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
            </RadialBarChart>
        </ResponsiveContainer >
    )


}

export function Count_annee() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet
    let defaultModelID = 23

    useEffect(() => {
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
            setItems(hh)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={2.5}>
            <BarChart width={730} height={250} data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    )


}

export function Taille_planete() {

    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis allowDataOverflow={true} label="distance à l'étoile" dataKey="semi_major_axis" name="distance" type="number" ticks={[0, 0.5, 1]} domain={[0, 1.1]} unit=" UA" />
                <YAxis allowDataOverflow={false} label="rayon" dataKey="radius" name="rayon" type="number" ticks={[0, 1, 2]} domain={[0, 2]} unit=" RJup" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={items} shape="cross" />

            </ScatterChart>
        </ResponsiveContainer>

    )


}

export function Graph_zone_habitable() {

    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <YAxis allowDataOverflow={true} label="température de l'étoile" dataKey="temp" name="masse" type="number" ticks={[0, 3000, 4000, 5000, 6000, 7000]} domain={[0, 8000]} unit="K" />
                <XAxis allowDataOverflow={true} label="distance à l'étoile" dataKey="semi_major_axis" name="periode orbitale" type="number" domain={[200, 700]} unit=" jour" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={items} shape="cross" />

            </ScatterChart>
        </ResponsiveContainer>

    )


}

export function Graph_rayon_moyen() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            const data = gg.reduce((decount, currentValue, index) => {
                if (currentValue.radius !== null && currentValue.discovered !== null) {
                    if (Object.keys(decount).length === 0) {
                        decount["decountVal"] = {};
                        decount["decountNb"] = {};
                    }
                    if (!Object.keys(decount["decountVal"]).includes(currentValue.discovered.toString())) {
                        decount["decountVal"][currentValue.discovered] = currentValue.radius;
                        decount["decountNb"][currentValue.discovered] = 1
                    } else {
                        decount["decountNb"][currentValue.discovered] = decount["decountNb"][currentValue.discovered] + 1;
                        decount["decountVal"][currentValue.discovered] = decount["decountVal"][currentValue.discovered] + currentValue.radius
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in data["decountVal"]) {
                hh.push({ 'year': property, 'value': data["decountVal"][property] / data["decountNb"][property] })
            }
            setItems(hh)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <BarChart data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis ticks={[0, 1, 2, 2.5]} />
                {/* <Tooltip /> */}
                <Legend />
                <Bar name="moyenne des rayons en Rjupiter des planètes découvertes" dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    )


}

export function Moyenne_semi_major_moyen() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            const data = gg.reduce((decount, currentValue, index) => {
                if (currentValue.semi_major_axis !== null && currentValue.discovered !== null) {
                    //!!
                    if (currentValue.method !== 'Imaging') {
                        if (Object.keys(decount).length === 0) {
                            decount["decountVal"] = {};
                            decount["decountNb"] = {};
                        }
                        if (!Object.keys(decount["decountVal"]).includes(currentValue.discovered.toString())) {
                            decount["decountVal"][currentValue.discovered] = currentValue.semi_major_axis;
                            decount["decountNb"][currentValue.discovered] = 1
                        } else {
                            decount["decountNb"][currentValue.discovered] = decount["decountNb"][currentValue.discovered] + 1;
                            decount["decountVal"][currentValue.discovered] = decount["decountVal"][currentValue.discovered] + currentValue.semi_major_axis
                        }
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in data["decountVal"]) {
                hh.push({ 'year': property, 'value': data["decountVal"][property] / data["decountNb"][property] })
            }
            setItems(hh)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={2.5}>
            <BarChart data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis ticks={[0, 1, 2, 3, 4]} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar name="(imaging excleu)moyenne des distances à l'étoile en UA des planètes découvertes" dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    )


}

export function Graph_annee_distance_etoile_depuis_terre() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            var counter = 0
            const sumOfAges = gg.reduce((decount, currentValue) => {
                if (currentValue.star_distance !== null && currentValue.discovered !== null) {
                    counter += 1
                    if (!Object.keys(decount).includes(currentValue.discovered)) {
                        decount[currentValue.discovered] = currentValue.star_distance;
                    } else {
                        // decount[currentValue.discovered] = decount[currentValue.discovered] + currentValue.semi_major_axis;
                        decount[currentValue.discovered] = decount[currentValue.discovered] > currentValue.star_distance ? decount[currentValue.discovered] : currentValue.star_distance
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in sumOfAges) {
                hh.push({ 'year': property, 'value': sumOfAges[property] })
            }
            setItems(hh)
        });
    }, [])


    return (


        <BarChart data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis name="star distance" />
            {/* <Tooltip /> */}
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}
