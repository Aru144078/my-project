const svg = document.getElementById("drawingArea");
let isDrawing = false;
let currentPath = null;

// When mouse button pressed down
svg.addEventListener("mousedown", (e) => {
  isDrawing = true;

  // Create a new path
  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", "blue");
  currentPath.setAttribute("stroke-width", "2");
  currentPath.setAttribute("fill", "none");

  // Start path at mouse position
  currentPath.setAttribute("d", `M${e.offsetX},${e.offsetY}`);
  svg.appendChild(currentPath);
});

// While moving mouse
svg.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  // Add line to new mouse position
  let d = currentPath.getAttribute("d");
  d += ` L${e.offsetX},${e.offsetY}`;
  currentPath.setAttribute("d", d);
});

// When mouse button released
svg.addEventListener("mouseup", () => {
  isDrawing = false;
  currentPath = null;
});

// Prevent drawing outside canvas
svg.addEventListener("mouseleave", () => {
  isDrawing = false;
  currentPath = null;
});
