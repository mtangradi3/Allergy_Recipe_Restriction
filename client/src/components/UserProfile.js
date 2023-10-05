// UserProfile.js
import React from "react";

// Function to open a pop-up window with custom content
export function openPopup(content) {
  const popupWindow = window.open("", "MyPopup", "width=600,height=400");
  popupWindow.document.write("<html><body>");
  popupWindow.document.write(content);
  popupWindow.document.write("</body></html>");
}
