// UserProfile.js
import React from "react";

// Function to open a pop-up window with custom content
export function openPopup(content) {
  const popupWindow = window.open("", "MyPopup", "width=600,height=400");
  popupWindow.document.write("<html><head><style>");
  popupWindow.document.write(`
    /* Add CSS styles for button spacing and alignment */
    button {
      display: block;
      margin: 10px 0;
      width: 100%; /* Makes the buttons longer */
      height: 20%;
    }
  `);
  popupWindow.document.write("</style></head><body>");
  popupWindow.document.write(content);

  // Add buttons with event handlers
  popupWindow.document.write('<button id="button1">Allergies</button>');
  popupWindow.document.write('<button id="button2">Groups</button>');
  popupWindow.document.write('<button id="button3">Favorites</button>');
  popupWindow.document.write('<button id="button4">Meals</button>');

  // Add scripts for button functionality
  popupWindow.document.write(`
    <script>
      document.getElementById('button1').addEventListener('click', function() {
        // Button 1 functionality
        alert('Button 1 clicked!');
      });
      
      document.getElementById('button2').addEventListener('click', function() {
        // Button 2 functionality
        alert('Button 2 clicked!');
      });

      document.getElementById('button3').addEventListener('click', function() {
        // Button 3 functionality
        alert('Button 3 clicked!');
      });

      document.getElementById('button4').addEventListener('click', function() {
        // Button 4 functionality
        alert('Button 4 clicked!');
      });
    </script>
  `);

  popupWindow.document.write("</body></html>");
}
