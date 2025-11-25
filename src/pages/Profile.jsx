import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUserProfile, uploadProfileImage } from "../api/userapi";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState(user || {});
  const [file, setFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile(form);
      setUser(res.data.user);
      alert("Profile updated");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadProfileImage(formData);
      setUser(res.data.user);
      alert("Profile image updated");
    } catch (err) {
      alert(err.response?.data?.message || "Error uploading image");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="phone" value={form.phone || ""} onChange={handleChange} />
        <input name="address" value={form.address || ""} onChange={handleChange} />
        <input name="city" value={form.city || ""} onChange={handleChange} />
        <input name="state" value={form.state || ""} onChange={handleChange} />
        <input name="postalCode" value={form.postalCode || ""} onChange={handleChange} />
        <button type="submit">Update Profile</button>
      </form>

      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload Profile Image</button>
      </div>

      {user.profileImage && <img src={user.profileImage} width={100} alt="Profile" />}
    </div>
  );
}
