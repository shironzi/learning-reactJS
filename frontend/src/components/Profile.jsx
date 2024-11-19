function Profile() {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <img
          src="profile-pic-url"
          alt="Profile Picture"
          className="profile-pic"
        />
        <div className="profile-details">
          <h2>John Doe</h2>
          <p>Email: john.doe@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
