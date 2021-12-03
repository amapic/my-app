export interface mapPropsT{
    etat:string,
    selectedItems:string[],
    hovered?:string
  }

export interface PopoverwrapLogicT{
    paths:google.maps.LatLng[],
    object:string
}

export interface radialT {
  name: string,
  uv: any,
  fill: string
}

export interface dataT {
  id: number,
  name: string,
  mass: number,
  orbital_period: number,
  discovered: number,
  radius: number,
  semi_major_axis: number,
  star_distance: number,
  temp: number,
  method: string,
  sizeType?: string
}

// type OmitA = Omit<dataT|boolean, boolean>