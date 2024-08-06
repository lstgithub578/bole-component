import { App } from 'vue'

import BoForm from '@bole-component/components/form'
import BoTable from '@bole-component/components/table'
import BoDialog from '@bole-component/components/dialog'
import BoFilter from '@bole-component/components/filter'
import BoLayout from '@bole-component/components/layout'
const components = [BoForm, BoTable, BoDialog, BoFilter, BoLayout] as any[]

export const install = (app: App) => {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
