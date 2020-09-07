// eslint-disable-next-line no-unused-vars
const strokesImagesData = (images = []) => ({
  skip: isEmpty(images),
  classNames: ['strokeOrderContainer'],
  ownChildren: [{
    classNames: ['strokeOrder'],
    ownChildren: images.map((image) => ({
      elem: 'img',
      attributes: { src: image },
    })),
  }],
});
