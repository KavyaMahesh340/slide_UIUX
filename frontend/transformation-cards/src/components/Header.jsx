import { Cloud, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <Cloud size={14} strokeWidth={1.8} />
        <span>Cloud Collection</span>
      </div>
      <span className="header-control" aria-hidden="true">
        <ChevronDown size={16} strokeWidth={2.4} />
      </span>
    </header>
  )
}