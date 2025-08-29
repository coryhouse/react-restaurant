export function ReactBistroLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <div className="absolute -top-1 -left-1 w-4 h-4 border-2 border-blue-400 rounded-full opacity-60"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-2 border-blue-400 rounded-full opacity-60"></div>
        <div className="absolute top-2 -right-2 w-3 h-3 border-2 border-blue-300 rounded-full opacity-40"></div>
      </div>
      <h1 className="text-xl font-bold text-gray-900">React Bistro</h1>
    </div>
  );
}