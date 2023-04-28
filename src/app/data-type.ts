export interface SignUp{
    name: string,
    password: string,
    email: string
}

export interface login{
    email:string,
    password: string
}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imageURL:string,
    id:number,
    quantity:undefined | number
}

export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imageURL:string,
    id:number | undefined,
    quantity:undefined | number,
    userId: number,
    productId:number
}