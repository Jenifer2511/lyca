import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Kind = 'categories' | 'products' | 'developments'
export type Entry = {
  id: string
  title: string
  description: string
  image: string
  version: number
}
export type Family = Entry & { label: string; alt: string; note: string }
export type Product = Entry & { category: string; section: string }
export type Catalogue = {
  categories: Family[]
  products: Product[]
  developments: Entry[]
}
export const empty: Catalogue = {
  categories: [],
  products: [],
  developments: [],
}
export async function fetchCatalogue(signal?: AbortSignal): Promise<Catalogue> {
  const res = await fetch('/api/cms?action=catalogue', {
    signal,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Could not load the catalogue.')
  return res.json()
}
type State = { data: Catalogue | null; failed: boolean; refresh: () => void }
const Context = createContext<State>({
  data: null,
  failed: false,
  refresh: () => {},
})
export function CatalogueProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Catalogue | null>(null)
  const [failed, setFailed] = useState(false)
  const [revision, setRevision] = useState(0)
  const refresh = useCallback(() => setRevision((n) => n + 1), [])
  useEffect(() => {
    const controller = new AbortController()
    fetchCatalogue(controller.signal)
      .then((value) => {
        if (!controller.signal.aborted) {
          setData(value)
          setFailed(false)
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return
        setFailed(true)
      })
    return () => controller.abort()
  }, [revision])
  useEffect(() => {
    const refreshVisible = () => { if (document.visibilityState === 'visible') refresh() }
    const timer = window.setInterval(refreshVisible, 30000)
    window.addEventListener('focus', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', refreshVisible)
    return () => {
      window.removeEventListener('focus', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', refreshVisible)
      window.clearInterval(timer)
    }
  }, [refresh])
  return (
    <Context.Provider value={{ data, failed, refresh }}>
      {children}
    </Context.Provider>
  )
}
export const useCatalogue = () => useContext(Context)
export function ContentStatus() {
  const { data, failed, refresh } = useCatalogue()
  if (failed)
    return (
      <p className="content-status" role="status">
        The latest catalogue could not be loaded.{' '}
        <button type="button" onClick={refresh}>
          Try again
        </button>
      </p>
    )
  return data ? null : (
    <p className="content-status" role="status">
      Loading the catalogue…
    </p>
  )
}
