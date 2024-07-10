import Image from "next/image"
import { revalidatePath } from "next/cache"
import CreateProduct from "./createproduct"
import { Create } from "@mui/icons-material";
const API_FILES_URL = process.env.API_FILES_URL


async function getProducts() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/products/records', { cache: 'no-store' })
    const data = await res.json()
    return data?.items
}


export default async function ProductsPage() {
    const products = await getProducts()
    return (
        <>
            <div className="flex justify-center flex-col items-center gap-y-20">
                <div className="flex flex-row flex-wrap gap-3 mt-8">
                    {products.map(product => {
                        return <Product product={product} key={product.id} />
                    })}
                </div>
                <CreateProduct />
            </div>


        </>
    )
}


function Product({ product }) {
    const { collectionId, id, thumbnail, productName, productPrice, stockQuantity } = product || {}
    return (
        <div className="w-48 flex justify-center gap-y-1  flex-col items-center rounded-lg shadow-xl border border-gray-500 pb-2">
            <Image className="w-full h-full" src={`${API_FILES_URL}/${collectionId}/${id}/${thumbnail}`} width={1000} height={1000} />
            <h1 className="text-xl font-bold text-center">{productName}</h1>
            <span className="flex flex-row gap-x-3 items-center "><p className="text-xl">${productPrice}</p><button className="hover:bg-black hover:text-white border border-black rounded-md p-1">Add to Cart</button></span>
            <p className="text-sm mt-2">Stock: {stockQuantity}</p>
        </div>

    )
}