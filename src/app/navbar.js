import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex bg-gray-400 text-xl w-full font-semibold">
            <ul className="flex flex-row gap-x-3 items-center">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/cart">My Cart</Link></li>
            </ul>
        </nav>
    )
}