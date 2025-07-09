import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrands,
  createBrand,
  deleteBrand,
  updateBrand,
} from '../../redux/brand/brandSlice';
import { toast } from 'react-toastify';

const Brand = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brand);

  const [name, setName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const openModal = (brand = null) => {
    if (brand) {
      setEditId(brand._id);
      setName(brand.name);
      setBrandImage(null);
    } else {
      setEditId(null);
      setName('');
      setBrandImage(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setBrandImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (brandImage) formData.append('brandImage', brandImage);

    try {
      if (editId) {
        const result = await dispatch(updateBrand({ id: editId, formData })).unwrap();
        toast.success(`Brand "${result.name}" updated successfully`);
      } else {
        const result = await dispatch(createBrand(formData)).unwrap();
        toast.success(`Brand "${result.name}" created successfully`);
      }
      closeModal();
    } catch (error) {
      toast.error(error.message || 'Failed to save brand');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this brand?')) {
      try {
        await dispatch(deleteBrand(id)).unwrap();
        toast.success('Brand deleted successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to delete brand');
      }
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => openModal()}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Brand
      </button>

      {loading && <p>Loading...</p>}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b._id}>
              <td className="border px-4 py-2">{b.name}</td>
              <td className="border px-4 py-2">
                {b.brandImage && (
                  <img
                    src={b.brandImage}
                    alt={b.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => openModal(b)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">{editId ? 'Edit Brand' : 'Create Brand'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-4"
                placeholder="Brand Name"
                required
              />
              <input
                type="file"
                onChange={(e) => setBrandImage(e.target.files[0])}
                className="mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;
