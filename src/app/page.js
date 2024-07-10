'use client'


import { useEffect } from "react";
import './page.css'

async function getProducts() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/products/records')
  const data = await res.json()
  return data?.items
}

export default function Home() {

  const products = getProducts()

  useEffect(() => {
    let collapsibles = document.getElementById('collapsible')
    console.log(collapsibles)
    collapsibles.addEventListener("click", () => {
      collapsibles.classList.toggle("active")

      let content = collapsibles.nextElementSibling
      if (content.style.maxHeight) {
        content.style.maxHeight = null
      } else {
        content.style.maxHeight = content.scrollHeight + "px"
        console.log(content.style.maxHeight)
      }
    })
  }, []);

  return (
    <main className="flex flex-col gap-5 items-center md:justify-center  w-screen h-svh">

      <h1 className="text-4xl">Boxes</h1>

      <div className="flex sm:flex-col md:flex-row md:flex-wrap content-center justify-center">
        <div className="animate-pulse  bg-black w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 1</h1>
        </div>
        <div className="animate-bounce bg-red-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 2</h1>
        </div>
        <div className="animate-spin bg-yellow-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 3</h1>
        </div>
        <div className="animate-ping bg-green-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 4</h1>
        </div>
        <div className="animate-bounce bg-blue-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 5</h1>
        </div>
        <div className="bg-purple-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 6</h1>
        </div>
        <div className="bg-pink-500 w-32 h-32 text-white flex justify-center items-center">
          <h1>Box 7</h1>
        </div>
      </div>

      <h1 className="text-4xl">Skeletons</h1>

      <div className="flex">
        <div className="space-x-4 p-4 animate-pulse skeleton-div flex flex-row rounded-md shadow-md border-black border border-gray-400 border-solid w-96 h-32">
          <aside className="display-picture">
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-400"></div>
          </aside>
          <article className="skeleton-article  flex flex-col gap-3 w-full">
            <div className="rounded-full h-4 w-4/5 mb-3 bg-gray-400"></div>
            <div className="rounded-full h-4 w-11/12  bg-gray-400"></div>
            <div className="rounded-full h-4 w-1/4 bg-gray-400"></div>
          </article>
        </div>
      </div>

      <h1 className="text-4xl">Collapsibles</h1>

      <div className="collapsible-wrapper  w-2/5 ">
        <button id="collapsible" className="rounded-t-md p-4 w-full shadow-md font-bold bg-yellow-100	">Open Me!</button>
        <div className="content">
          <p className="p-4">
            Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-4xl">Data Fetching</h1>
        
      </div>

    </main>

  );
}
