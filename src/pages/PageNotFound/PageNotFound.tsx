
import { PATH } from '@/constant/constant';
import { ArrowLeftOutlined, HomeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-blue-500">404</h1>

        {/* Error Message */}
        <h2 className="mt-8 text-3xl font-semibold text-gray-900">
          Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the
          URL or return home.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftOutlined className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate(PATH.HOME)}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <HomeFilled className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
