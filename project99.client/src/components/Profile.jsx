import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Role from "../common/Role";

const Profile = () => {
    const { state } = useContext(GlobalContext);
    const user = state.profile;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const defaultProfilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=random&color=fff`;


    if (!user) {
        return <div className="container mt-5"><h4 className="text-danger text-center">User not found</h4></div>;
    }

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: "danger", text: "New passwords do not match!" });
            return;
        }

        try {
            setLoading(true);

            // Simulate API call (replace with real API request)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMessage({ type: "success", text: "Password updated successfully!" });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            setMessage({ type: "danger", text: "Error updating password!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card shadow-lg p-4 rounded-lg" style={{ maxWidth: "400px", width: "100%" }}>
                {/* Profile Info */}
                <div className="text-center">
                    <img
                        src={defaultProfilePic}
                        alt="Profile"
                        className="rounded-circle img-thumbnail mb-3"
                    />
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title fw-bold">{user.name}</h4>
                    <p className="card-text text-muted">@{user.userName}</p>
                    <span className="badge bg-primary">{Role[user.role]}</span>
                </div>

                {/* Update Password Form */}
                <form onSubmit={handlePasswordUpdate} className="mt-3">
                    <h5 className="text-center">Update Password</h5>

                    {message && <div className={`alert alert-${message.type} text-center`}>{message.text}</div>}

                    <div className="mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
