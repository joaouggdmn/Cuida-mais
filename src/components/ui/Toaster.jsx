import { Toaster as SonnerToaster } from 'sonner'

const toasterStyle = {
  '--normal-bg': '#ffffff',
  '--normal-text': '#18324a',
  '--normal-border': '#dbe8f5',
}

export function Toaster() {
  return <SonnerToaster theme="light" style={toasterStyle} />
}
