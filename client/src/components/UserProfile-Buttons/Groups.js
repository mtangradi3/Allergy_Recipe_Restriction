// Example for Allergies.js
import React from "react";
import "../../styles/Buttons.css"

function Groups() {
  return (
      <div>
        <section>
          <h2>My Groups</h2>
            <button
                className="buttonStyle"
                //onClick={() => navigate("/user-profile/allergies")}
            >
                Test Group
            </button>
        </section>

        <section>
          <h2>All Groups</h2>
          <p>Content for Section 2 goes here...</p>
        </section>
      </div>
  );
}

export default Groups;
