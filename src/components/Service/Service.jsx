import React from 'react';

const Service = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-white flex flex-col px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-600">Manage Your Service Entries</h1>
        <p className="text-xl sm:text-2xl text-gray-600 mt-2 font-medium">
          Easily add, manage, and keep track of your service passwords.
        </p>
      </div>

      {/* What is UnlokPass? Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-amber-600">What is UnlokPass?</h2>
        <p className="text-lg text-gray-700 mt-4">
          UnlokPass is a secure password manager that allows you to store, manage, and retrieve your passwords for
          various websites and services. We encrypt your data with strong encryption algorithms to ensure your passwords
          are safe and only accessible by you with your master password.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Simply add your credentials (website, username, and password) and let UnlokPass securely store them for you.
          With just a click, you can manage, show, or delete your entries at any time.
        </p>
      </div>
    </div>
  );
};

export default Service;
