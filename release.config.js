import plugins from './plugins.json';
import customTransform from './commit-transform';

export default {
  releaseRules: plugins[0][1].releaseRules,
  parserOpts: {
    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
    mergeCorrespondence: ['id', 'source'],
  },
  writerOps: {
    transform: customTransform,
  },
  plugins,
};
