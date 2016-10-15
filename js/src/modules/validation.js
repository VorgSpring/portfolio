'use strict';

module.exports = (inputNode, classError) => {
    if (inputNode.value === '') {
        inputNode.classList.add(classError);
        return false;
    } else {
        return true;
    }
};
