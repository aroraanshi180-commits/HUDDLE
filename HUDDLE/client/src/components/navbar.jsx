function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          CRM Task Manager
        </h1>

        <div className="space-x-4">
          <button className="hover:text-indigo-200">
            Login
          </button>

          <button className="hover:text-indigo-200">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;