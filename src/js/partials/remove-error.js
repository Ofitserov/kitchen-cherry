export default () => {
  const inputs = document.querySelectorAll('.required');
  const removeError = (element) => {
    element.classList.remove('error');
  };
  for (let i = 0; i <= inputs.length - 1; i++)
  {
    inputs[i].addEventListener('input', () => {
      removeError(inputs[i]);
    });
  };
    document.querySelector('.file').addEventListener('click', () => {
      removeError(document.querySelector('.file'));
    })
};
