const colorMixer = (function ColorMixer() {

  const colors = {
    red   : 0,
    green : 0,
    blue  : 0
  };

  // window elements
  const inputRanges = document.querySelectorAll('input[type=range]');
  const inputRangeValueDisplayers = document.querySelectorAll('input[type=text]');
  const visualizer = document.querySelector('.visualizer');

  function init() {
    // initialize all input values
    inputRanges.forEach(input => _updateInputValue(input, 0));
    inputRangeValueDisplayers.forEach(input => _updateInputValue(input, 0));

    // set up rangers listener
    inputRanges.forEach(inputRange => inputRange.addEventListener('change', _onRangeChange));
  };

  function updateVisualizer(red, green, blue) {
    _updateVisualizer({red, green, blue});
  }

  function _onRangeChange(event) {
    const inputRange = event.target;
    const colorRef = inputRange.getAttribute('data-color');
    const valueDisplayer = _getValueDisplayerFrom(inputRange);

    _updateColor(colorRef, inputRange.value);
    _updateInputValue(valueDisplayer, inputRange.value);
    _updateVisualizer();
  };

  function _updateColor(color, value) {
    colors[color] = value;
  }

  function _updateVisualizer({red, green, blue} = colors) {
    visualizer.style.backgroundColor = `rgb(${red},${green},${blue})`;
  }

  function _updateInputValue(input, value) {
    input.value = value;
  }

  function _getValueDisplayerFrom(inputRange) {
    return inputRange.parentElement.querySelector('input[type=text]');
  }

  return { init, updateVisualizer };

})();
