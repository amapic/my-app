// import { createTheme } from '@material-ui/core/styles';

//global ts => augmlentation de type marche pas avec import dnas fichier
// // import * as createPalette from '@material-ui/core/styles/createPalette';
// // declare module '@material-ui/core/styles/createPalette' {
// //     interface PaletteOptions {    
// //         success?: PaletteColorOptions;
// //         warning?: PaletteColorOptions;
// //     }

//     export interface PaletteColor {
//         light: string;
//         main: string;
//         dark: string;
//         contrastText: string;
//         bar_droite1?:string;
//         bar_droite2?:string;
//         second?:string;
//         third?:string;
//         fourth?:string;
//         fifth?:string;
//         sixth?:string;
//         seventh?:string;
//         heigth?:string;
//         bgPaper?:string;
//       }
// // }

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.gif" {
    const content: any;
    export default content;
}

