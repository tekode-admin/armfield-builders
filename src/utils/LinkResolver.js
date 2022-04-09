// LinkResolver.js file

exports.linkResolver = (doc) => {
    if (doc.type === 'page') {
      return `/page/${doc.uid}`
    }
    return '/'
  }