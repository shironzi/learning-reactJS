function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-container">
        {/* <img src="profile-pic-url" alt="Profile Picture" className="profile-pic" /> */}
        <div className="profile-details">
          <h2>Name</h2>
          <p>Email</p>
          <p>Bio: A short bio...</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
