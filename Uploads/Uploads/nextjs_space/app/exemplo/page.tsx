
import ExampleCouplePage from './example-couple-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exemplo - Ana & Daniel - Timming LoveU',
  description: 'Veja um exemplo de página romântica personalizada criada com Timming LoveU',
}

export default function ExamplePage() {
  return <ExampleCouplePage />
}
