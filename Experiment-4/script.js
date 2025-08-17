function setupCounter(textareaId, counterId) {
  const textarea = document.getElementById(textareaId);
  const counter = document.getElementById(counterId);

  function updateCount() {
    counter.textContent = textarea.value.length;
  }

  textarea.addEventListener('input', updateCount);
  updateCount(); // initialize on page load
}

setupCounter('text1', 'count1');
setupCounter('text2', 'count2');
