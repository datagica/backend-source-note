const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const util = require('util');

const pretty = (x) => {
  console.log(util.inspect(x, false, 7, true));
};

const PluginSource = require("../lib/index");

describe('@datagica/backend-source-note', () => {

  it('should work', done => {

    // step 1: init the engine when the backend starts
    const pluginSource = new PluginSource()

    // step 2: everytime the user requires the settings
    const settings = pluginSource.getSettings("note");
    // console.log("SETTINGS: "+JSON.stringify(settings))
    settings.note.value.title.value   = "Test"
    settings.note.value.content.value = "this is a test note"

    console.log("SETTINGS: "+JSON.stringify(settings, null, 2))
    // step 3: here the user is supposed to tweak the settings

    // step 4: when the user finalize the new source setup wizard, we create an
    //         instance with his settings
    const source = pluginSource.getInstance({
      bundleId    : "note",
      templateId  : "note",
      sourceId    : "test",
      sourceName  : "test",
      isActive    : true,
      settings    : settings,
      saveRecord  : record => {

       console.log(JSON.stringify(record, null, 2))

       /*
       {
         "uri": "note://cb1d06df6f773f8387d2e84f4c45d9c33d0548a7",
         "date": {
           "lastChanged": "2017-04-10T10:37:12.513Z",
           "elapsed": 0
         },
         "hash": "cb1d06df6f773f8387d2e84f4c45d9c33d0548a7",
         "bundleId": "note",
         "templateId": "note",
         "sourceId": "test",
         "name": "Test",
         "text": "this is a test note"
       }
       */

        expect(record.uri)        .to.equal("note://cb1d06df6f773f8387d2e84f4c45d9c33d0548a7")
        expect(record.hash)       .to.equal("cb1d06df6f773f8387d2e84f4c45d9c33d0548a7")
        expect(record.bundleId)   .to.equal("note")
        expect(record.templateId) .to.equal("note")
        expect(record.sourceId)   .to.equal("test")
        expect(record.name)       .to.equal("Test")
        expect(record.text)       .to.equal("this is a test note")

        // we need to return the promise first, then finalize the test
        setTimeout(() => { done() }, 0)

        return Promise.resolve(true)
      },
      deleteRecord: record => {
        console.log("delete: nothing to do")
        return Promise.resolve(false)
      }
    })
  })
})
