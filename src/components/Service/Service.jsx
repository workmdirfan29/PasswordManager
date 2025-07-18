import React from 'react';

const Service = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-white flex flex-col px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-600">Manage Your Service Entries</h1>
        <p className="text-xl sm:text-2xl text-gray-600 mt-2 font-medium">
          Easily store, organize, and protect all your service credentials in one place.
        </p>
      </div>

      {/* What is UnlokPass Section */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">What is UnlokPass?</h2>
        <p className="text-lg text-gray-700 mt-4">
          UnlokPass is a secure, user-friendly password manager designed to keep your online accounts safe and organized. 
          With advanced encryption and a clean interface, UnlokPass makes it simple to store your login credentials for websites, 
          applications, and digital services.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Whether you’re managing a few passwords or hundreds, UnlokPass ensures your sensitive data remains encrypted 
          and accessible only to you via your master password. No more forgotten logins or risky password reuse.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="text-center mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">Why Choose UnlokPass?</h2>
        <ul className="mt-6 space-y-4 text-left text-gray-700 px-4 sm:px-0">
          <li>
            <span className="font-semibold text-amber-600">🔒 Secure Storage:</span> All credentials are protected using strong encryption algorithms.
          </li>
          <li>
            <span className="font-semibold text-amber-600">🚀 Easy Access:</span> Quickly find, copy, or update your credentials with an intuitive interface.
          </li>
          <li>
            <span className="font-semibold text-amber-600">🔁 Sync Across Devices:</span> Access your data from any device, anytime (coming soon).
          </li>
          <li>
            <span className="font-semibold text-amber-600">🛠 Full Control:</span> Add, view, update, or delete entries whenever you need.
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">Start Securing Your Digital Life</h2>
        <p className="text-lg text-gray-700 mt-4 mb-6">
          Take the first step in protecting your online identity. Add your service credentials now and enjoy peace of mind.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300">
          Add New Entry
        </button>
      </div>
    </div>
  );
};

export default Service;
