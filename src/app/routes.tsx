import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router"
import { Layout } from "./components"
import { AboutPage, ApplicationsPage, EnquiryPage, HomePage, LegalPage, NetworkPage, NotFound, ProductsPage } from "./pages"

const InnovationPage = lazy(() => import("./innovation").then(module => ({ default: module.InnovationPage })))
function InnovationRoute() {
  return <Suspense fallback={<div role="status" aria-label="Loading Innovation" style={{ minHeight: "100svh", display: "grid", placeItems: "center", fontSize: 80, letterSpacing: "-.06em" }}><span aria-hidden="true">LYCA.</span></div>}><InnovationPage /></Suspense>
}

export const router = createBrowserRouter([{ Component: Layout, children: [
  { path: "/", Component: HomePage },
  { path: "/landing", element: <Navigate to="/" replace /> },
  { path: "/home", element: <Navigate to="/" replace /> },
  { path: "/innovation", Component: InnovationRoute },
  { path: "/products", Component: ProductsPage },
  { path: "/applications", Component: ApplicationsPage },
  { path: "/about", Component: AboutPage },
  { path: "/network", Component: NetworkPage },
  { path: "/enquiry", Component: EnquiryPage },
  { path: "/privacy", element: <LegalPage type="privacy" /> },
  { path: "/terms", element: <LegalPage type="terms" /> },
  { path: "*", Component: NotFound },
]}])
