/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import { types as _types } from './types';

const COMMIT_HASH_LENGTH = 7;

export default function (commit, context) {
  if (commit.notes) {
    commit.notes.forEach((note) => {
      note.title = 'Breaking Changes';
    });
  }

  if (_types[commit.type] && (_types[commit.type].changelog || (commit.notes && commit.notes.length > 0))) {
    commit.groupType = `${_types[commit.type].emoji ? `${_types[commit.type].emoji} ` : ''}${
      _types[commit.type].title
    }`;
  } else {
    return null;
  }

  if (commit.scope === '*') {
    commit.scope = '';
  }

  if (typeof commit.hash === 'string') {
    commit.shortHash = commit.hash.slice(0, COMMIT_HASH_LENGTH);
  }

  const references = [];

  if (typeof commit.subject === 'string') {
    let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl;

    if (url) {
      url += '/issues/';
      // Issue URLs.
      commit.subject = commit.subject.replace(/#(\d+)/g, (_, issue) => {
        references.push(issue);
        return `[#${issue}](${url}${issue})`;
      });
    }

    if (context.host) {
      // User URLs.
      commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, `[@$1](${context.host}/$1)`);
    }
  }

  if (commit.references) {
    // Remove references that already appear in the subject
    commit.references = commit.references.filter((reference) => {
      if (!references.includes(reference.issue)) {
        return true;
      }

      return false;
    });
  }

  return commit;
}
