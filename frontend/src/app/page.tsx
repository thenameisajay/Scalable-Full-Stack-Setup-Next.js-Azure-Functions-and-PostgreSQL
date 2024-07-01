import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full justify-center ">
      <section id="hello-banner">
        <div className="">
          <h1 className="text-8xl font-bold text-center text-gray-900">
            Hello World
          </h1>
        </div>
      </section>
    </main>
  );
}
