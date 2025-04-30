import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to RunLink</h1>
      <button
        onClick={() => navigate('/find-runner')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Find a Runner
      </button>
    </div>
  );
}

export default HomePage;