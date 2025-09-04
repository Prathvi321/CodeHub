import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { Users, Search, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getStats()
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Courses</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalCourses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Enrollments</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalEnrollments}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Users</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{user.totalEnrollments} courses</span>
                      <Eye size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white rounded-lg shadow p-6">
            {selectedUser ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">{selectedUser.name}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Joined:</span>
                    <p className="text-gray-600">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Courses Enrolled:</span>
                    <p className="text-gray-600">{selectedUser.progress?.coursesEnrolled || 0}</p>
                  </div>
                  <div>
                    <span className="font-medium">Courses Completed:</span>
                    <p className="text-gray-600">{selectedUser.progress?.coursesCompleted || 0}</p>
                  </div>
                  <div>
                    <span className="font-medium">Certificates:</span>
                    <p className="text-gray-600">{selectedUser.progress?.certificates || 0}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Select a user to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;