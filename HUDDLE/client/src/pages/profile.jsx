import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "../services/api";
function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name);

  const handleSave = async () => {
  try {
    const res = await updateProfile({
      name,
    });

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setIsEditing(false);

    alert("Profile Updated Successfully");
  } catch (err) {
    console.error(err);

    alert("Failed to update profile");
  }
};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">
              Name
            </p>
            {isEditing ? (
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full rounded border px-3 py-2"
  />
) : (
  <p className="font-medium">
    {user.name}
  </p>
)}
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>
            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              User ID
            </p>
            <p className="font-medium">
              {user.id}
            </p>
          </div>
<div className="mt-6 flex gap-2">

  {isEditing ? (
    <button
      onClick={handleSave}
      className="rounded-lg bg-green-600 px-4 py-2 text-white"
    >
      Save Profile
    </button>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
      Edit Profile
    </button>
  )}

  <button
    onClick={() => navigate("/dashboard")}
    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
  >
    Back
  </button>

</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;