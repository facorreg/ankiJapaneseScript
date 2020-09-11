// eslint-disable-next-line no-unused-vars
const sideBarData = (videoSources, videoFormat, strokeCount, character) => ({
  classNames: ['sideBar'],
  ownChildren: [{
    classNames: ['kanji'],
    content: character,
  }, {
    skip: !strokeCount,
    content: `Strokes: ${strokeCount}`,
    classNames: ['strokes'],
  }, {
    skip: !videoFormat,
    elem: 'video',
    classNames: ['videoStrokes'],
    attributes: {
      controls: 'controls',
      poster: videoSources.poster,
    },
    ownChildren: [{
      elem: 'source',
      attributes: { src: videoSources[videoFormat] },
    }],
  }],
});
