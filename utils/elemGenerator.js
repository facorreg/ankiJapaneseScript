/* eslint-disable no-unused-vars */

const elemGenerator = (elemParent) => (elemData) => {
  if ((isEmpty(elemData) && !(elemData instanceof Object)) || elemData.skip) return null;
  if (isArray(elemData)) return elemData.map((data) => elemGenerator(elemParent)(data));

  const {
    elem = 'div',
    method = 'innerText',
    id,
    content,
    classNames,
    eventListener,
    ownChildren,
    appendAtIndex,
    callback,
    elemOnly,
    applyDirectly,
  } = elemData;

  let { attributes = {} } = elemData;

  if (applyDirectly) elemParent.appendChild(applyDirectly);

  const newElem = document.createElement(elem);
  if (method && content) newElem[method] = content;
  if (id) attributes = { ...attributes, id };
  if (attributes) {
    Object.keys(attributes)
      .forEach((key) => newElem.setAttribute(key, attributes[key]));
  }
  if (classNames) {
    classNames
      .filter((className) => className)
      .forEach((className) => newElem.classList.add(className));
  }
  if (eventListener) newElem.addEventListener(eventListener.type, eventListener.callback);
  if (ownChildren) ownChildren.forEach(elemGenerator(newElem));
  if (elemOnly);
  else if (typeof appendAtIndex === 'number') {
    insertElemAtIndex(elemParent, newElem, appendAtIndex);
  } else elemParent.appendChild(newElem);

  if (callback) callback(newElem);

  return newElem;
};

const createCardChildren = elemGenerator(document.querySelector('#qa'));
