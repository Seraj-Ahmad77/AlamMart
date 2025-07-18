// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const { token, backendUrl } = useContext(ShopContext);

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");
//   const [avatarFile, setAvatarFile] = useState(null);

//   // Fetch profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/api/user/profile`, {
//           headers: {
//             token: token || localStorage.getItem("token"),
//           },
//         });

//         const { name, email, phone, address, avatar } = res.data.user || {};
//         setUserData({ name, email, phone, address });
//         if (avatar) {
//           setAvatarPreview(avatar);
//         } else {
//           console.log("No avatar found, using default.");
//         }
//       } catch (err) {
//         console.error("Failed to load profile:", err.message);
//         // Only show toast for real failures
//         if (err.response?.status !== 200) {
//           toast.error("Failed to load profile data.");
//         }
//       }
//     };

//     fetchProfile();
//   }, [token, backendUrl]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatarFile(file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       Object.entries(userData).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       if (avatarFile) {
//         formData.append("avatar", avatarFile);
//       }

//       const res = await axios.put(`${backendUrl}/api/user/profile`, formData, {
//         headers: {
//           token: token || localStorage.getItem("token"),
//         },
//       });
// console.log("UPDATE RESPONSE:", res.data);

//       if (res.data.success) {
//         toast.success("Profile updated successfully");
//         if (res.data.user?.avatar) {
//           setAvatarPreview(res.data.user.avatar);
//         }
//       } else {
//         toast.error("Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Update error:", err.message);
//       toast.error("Something went wrong while updating profile");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 space-y-4 bg-white rounded shadow"
//     >
//       <h2 className="text-xl font-bold text-center">My Profile</h2>

//       {/* Avatar Upload */}
//       <div className="flex justify-center">
//         <label htmlFor="avatar" className="cursor-pointer">
//           <img
//             src={avatarPreview}
//             alt="Avatar"
//             className="w-24 h-24 rounded-full object-cover ring ring-gray-300"
//           />
//         </label>
//         <input
//           type="file"
//           id="avatar"
//           hidden
//           accept="image/*"
//           onChange={handleAvatarChange}
//         />
//       </div>

//       {/* Inputs */}
//       <input
//         type="text"
//         name="name"
//         value={userData.name}
//         onChange={handleChange}
//         placeholder="Name"
//         className="w-full px-4 py-2 border rounded"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         value={userData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="w-full px-4 py-2 border rounded"
//         required
//       />
//       <input
//         type="text"
//         name="phone"
//         value={userData.phone}
//         onChange={handleChange}
//         placeholder="Phone"
//         className="w-full px-4 py-2 border rounded"
//       />
//       <textarea
//         name="address"
//         value={userData.address}
//         onChange={handleChange}
//         placeholder="Address"
//         className="w-full px-4 py-2 border rounded"
//         rows={3}
//       />

//       <button
//         type="submit"
//         className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//       >
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default MyProfile;
import React from 'react'

const MyProfile = () => {
  return (
    <div>
        <h1>Still .....</h1>
    </div>
  )
}

export default MyProfile
