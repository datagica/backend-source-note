'use strict'

const TemplateBundle = require('@datagica/backend-source').TemplateBundle;

const Note = require('./note/index')

class Bundle extends TemplateBundle {

  constructor() {
    super({
      name: "note",
      label: {
        en: "Note",
        fr: "Note"
      },
      description: {
        en: "Note",
        fr: "Note"
      },
      templates: [
        Note
      ]
    })
  }
}

module.exports = Bundle
