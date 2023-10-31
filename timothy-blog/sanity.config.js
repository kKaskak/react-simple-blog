import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'timothy-blog',

  projectId: 'zeqqep1d',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), media(), scheduledPublishing(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
