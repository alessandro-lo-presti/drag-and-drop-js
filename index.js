const containers = document.querySelectorAll(".drag-container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () =>
    draggable.classList.add("dragging")
  );
  draggable.addEventListener("dragend", () =>
    draggable.classList.remove("dragging")
  );
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (!afterElement) container.appendChild(draggable);
    else container.insertBefore(draggable, afterElement);
  });
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging"),
  ];

  return draggableElements.reduce(
    (closest, chield) => {
      const box = chield.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      return offset < 0 && offset > closest.offset
        ? { offset, element: chield }
        : closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
