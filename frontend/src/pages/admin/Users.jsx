import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveUser, fetchUsers } from '../../redux/user/userSlice';
import AdminHeader from '../../components/AdminHeader';
import { toast } from 'react-toastify';

const User = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);



const handleApprove = async (userId) => {
  const result = await dispatch(approveUser(userId));
  if (approveUser.fulfilled.match(result)) {
    toast.success("User approved successfully");
    dispatch(fetchUsers());
  } else {
    toast.error(result.payload || "Failed to approve user");
  }
};


  return (
    <div className="flex flex-col">
      <AdminHeader />
      <main className="pt-10 px-6 pb-10 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">All Users</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Approved</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone || '-'}</td>
                    <td className="px-6 py-4">{user.companyName || '-'}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      {user.isApproved ? (
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          disabled
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default User;
