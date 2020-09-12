// eslint-disable-next-line no-unused-vars
const strokesImagesData = (images = []) => ({
  skip: isEmpty(images),
  classNames: ['strokeOrderContainer'],
  ownChildren: [{
    classNames: ['strokeOverflow'],
    ownChildren: [{
      classNames: ['strokeOrder'],
      ownChildren: [
        ...images.map((image) => ({
          classNames: ['imgContainer'],
          ownChildren: [{
            elem: 'img',
            attributes: { src: image },
          },
          ...[...Array(2)].map(() => ({ classNames: ['drawGrid'] })),
          ],
        })),
      ],
    }],
  }],
});
