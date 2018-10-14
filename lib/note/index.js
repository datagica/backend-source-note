'use strict'

const crypto = require('crypto')

const BasicTemplate = require('@datagica/backend-source').BasicTemplate;

class Template extends BasicTemplate {

  start () {
    if (this.isRunning) {
      return;
    }

    const config = this.config;
    this.debug = true;
    this.isRunning = true;

    const note = {
      title:   config.settings.note.value.title.value,
      content: config.settings.note.value.content.value
    }

    const hash = crypto.createHash('sha1').update(JSON.stringify(note)).digest('hex')

    this.config.saveRecord({
      uri        : `note://${hash}`,
      date       : {
        lastChanged: new Date(),
        elapsed: 0
      },
      hash       : hash,
      bundleId   : config.bundleId,
      templateId : config.templateId,
      sourceId   : config.sourceId,
      name       : note.title,
      text       : note.content
    }).then(_ => {
      console.log(`[note/note] successfully processed ${note.title}`)
    }).catch(err => {
      console.log(`[note/note] failed to process ${note.title}: ${err}`)
    })
  }

  stop () {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
  }
}

Template.templateId = "note";
Template.templateLabel = {
  en: "Note",
  fr: "Note"
}
Template.templateDescription = {
  en: "Note",
  fr: "Note"
}

Template.settings = {
  note: {
    label: {
      en: "Note",
      fr: "Note"
    },
    type: "group",
    value: {
      title: {
        label: {
          en: "Title",
          fr: "Titre"
        },
        type: "string",
        value: "Untitled"
      },
      content: {
        label: {
          en: "Content",
          fr: "Contenu"
        },
        type: "text",
        value: ""
      }
    }
  }
}


Template.meta = {
  templateId:          Template.templateId,
  templateLabel:       Template.templateLabel,
  templateDescription: Template.templateDescription,
  settings:            Template.settings
}

module.exports = Template
