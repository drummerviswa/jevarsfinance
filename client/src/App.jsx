import Export from "./components/Export";

export default function App() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex-col">
          <div className="lg:flex sm:mb-8 sm:flex sm:justify-center">
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Jevars Finance
            </h1>
          </div>
          <p className="text-center text-2xl">
            This is my app for storing my personal finance
          </p>
          <Export />
        </div>
      </div>
    </div>
  );
}
