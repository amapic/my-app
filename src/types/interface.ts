export interface mapPropsT{
    etat:string,
    selectedItems:string[],
    hovered?:string
  }

export interface PopoverwrapLogicT{
    paths:google.maps.LatLng[],
    object:string
}

export interface typePlaneteT {
  type: string,
  value: any
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
  star_name:string,
  sizeType?: string,
  count_planet?: number,
}

export interface sSolaireT {
  discovered: number,
  star_distance: number,
  star_name:string,
  count_planet?: number,
}

// type OmitA = Omit<dataT|boolean, boolean>