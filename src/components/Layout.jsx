import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  );
}