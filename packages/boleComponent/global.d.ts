declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BoDialog: (typeof import('bole-component'))['BoDialog']
    BoForm: (typeof import('bole-component'))['BoForm']
    BoTable: (typeof import('bole-component'))['BoTable']
    BoFilter: (typeof import('bole-component'))['BoFilter']
    BoLayout: (typeof import('bole-component'))['BoLayout']
  }
}

export {}
